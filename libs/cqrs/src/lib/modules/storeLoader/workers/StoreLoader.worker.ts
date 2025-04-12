/// <reference lib="webworker" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fieldsSorter } from '../../../common/fieldsSorter';
import { getParameterArray } from '../../../common/getParameterArray';
import { StoreLoaderMessageActions as ACTION } from '../constant/StoreLoaderMessageActions';
import { StoreTypeSort } from '../constant/StoreTypeSort';
import { IStoreLoaderConfiguration } from '../interfaces/IStoreLoaderConfiguration';
import { IStoreLoaderMessage } from '../interfaces/IStoreLoaderMessage';

export const storeLoaderDataWorker = async (sorts: Map<string, Uint32Array>, message: MessageEvent<IStoreLoaderMessage>) => {
  let data: any[] = [];
  switch (message.data.action) {
    case ACTION.buffer: data = await _buffers(message.data); break;
    case ACTION.url: data = await _urls(message.data); break;
    case ACTION.fetchURL: data = await _fetchURL(message.data); break;
    case ACTION.fetchBuffer: data = await _fetchBuffer(message.data); break;
    case ACTION.getSort: _getSort(message.data, sorts); break;
    case ACTION.addSort: sorts = _addSort(message.data, sorts); break;
    default: break;
  }
  const intialAction = [ACTION.buffer, ACTION.url, ACTION.fetchURL, ACTION.fetchBuffer];
  return (intialAction.includes(message.data.action)) ? _dataSorterIndexing(data, sorts, message.data.sorts) : sorts;
};

const _buffers = async (message: IStoreLoaderMessage) => {
  const [source, config] = _getSource(message);
  const buffers = await _setBuffer(source, config);
  const data = (message.buffer !== undefined) ? await _getDataBuffers(source) : undefined;
  postMessage({ data, buffers }, [ ...buffers.values(), ...(data?.values() ?? [])]);
  return source;
};

const _urls = async (message: IStoreLoaderMessage) => {
  const [source, config] = _getSource(message);
  const urls = await _writeFiles(source, config);
  const data = (message.buffer !== undefined) ? await _getDataBuffers(source) : undefined;
  postMessage({ data, urls }, [...(data?.values() ?? [])]);
  return source;
};

const _getSource = (message: IStoreLoaderMessage): [any[], IStoreLoaderConfiguration] => {
  const data = (message.buffer !== undefined)
    ? JSON.parse(new TextDecoder().decode(message.buffer ?? new ArrayBuffer()))
    : message.data ?? [];
  const config = getParameterArray(data.length, message.config);
  return [data, config];
}

const _fetchURL = async (message: IStoreLoaderMessage) => {
  const [source, config] = await _getFetchSource(message);
  const urls = await _writeFiles(source, config);
  const data = await _getDataBuffers(source);
  postMessage({ data, urls }, [...data.values()]);
  return source;
};

const _fetchBuffer = async (message: IStoreLoaderMessage) => {
  const [source, config] = await _getFetchSource(message);
  const buffers = await _setBuffer(source, config);
  const data = await _getDataBuffers(source);
  postMessage({ data, buffers }, [...data.values(), ...buffers.values()]);
  return source;
};

const _getFetchSource = async (message: IStoreLoaderMessage) : Promise<[any[], IStoreLoaderConfiguration]> => {
  let data: any[] = [];
  if (message.request !== undefined) {
    const { url, method, body } = message.request;
    data = await fetch(url, { headers: { "Content-Type": "application/json" }, method, body })
      .then((resp) => resp.ok ? resp.json() : []);
  }
  const config = getParameterArray(data.length, message.config);
  return [data, config];
}

const _getDataBuffers = async (source: any[]) => {
  const config = getParameterArray(source.length, { countChunks: 100, sizeChunk: 10000 });
  const data = await _setBuffer(source, config);
  return data;
}

const _getSort = (message: IStoreLoaderMessage, sorts: Map<string, Uint32Array>) => {
  if (message.sorts !== undefined && message.sorts.length > 0) {
    const fields = message.sorts[0];
    const sortFields: string[] = _convertFieldsIndexing(fields);
    const sort = sorts.get(sortFields.join("~")) ?? null;
    postMessage({ sort: [fields, sort] });
  }
};

const _addSort = (message: IStoreLoaderMessage, sorts: Map<string, Uint32Array>) => {
  if (message.data !== undefined && message.sorts !== undefined && message.sorts.length > 0) {
    const fields = message.sorts[0];
    const sortFields: string[] = _convertFieldsIndexing(fields);
    const indeces = Array.from(message.data.keys()).sort(fieldsSorter(sortFields, message.data));
    const buffer = new Uint32Array(indeces);
    sorts.set(sortFields.join("~"), buffer);
    postMessage({ sort: [fields, buffer] });
  }
  return sorts;
}

const _writeFiles = async (data: any[], config: IStoreLoaderConfiguration) => {
  const urls = new Map<number, string>();
  for (let i = 0; i < config.countChunks; i++) {
    const chunk = data.slice(i * config.sizeChunk, (i + 1) * config.sizeChunk);
    const buffer = new TextEncoder().encode(JSON.stringify(chunk)).buffer;
    const blob: Blob = new Blob([buffer], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    urls.set(i, url);
  }
  return urls;
};

const _setBuffer = async (data: any[], config: IStoreLoaderConfiguration) => {
  const result = new Map<number, ArrayBuffer>();
  for (let i = 0; i < config.countChunks; i++) {
    const chunk = data.slice(i * config.sizeChunk, (i + 1) * config.sizeChunk);
    const buffer = new TextEncoder().encode(JSON.stringify(chunk));
    result.set(i, buffer.buffer);
  }
  return result;
};

const _dataSorterIndexing = (data: any[], sorts: Map<string, Uint32Array>, fieldsArray?: Map<string, StoreTypeSort>[]) => {
  if (fieldsArray === undefined) { return new Map(); }
  for (const fields of fieldsArray) {
    const sortFields: string[] = _convertFieldsIndexing(fields);
    const indeces = Array.from(data.keys()).sort(fieldsSorter(sortFields, data));
    const buffer = new Uint32Array(indeces);
    sorts.set(sortFields.join("~"), buffer);
  }
  return sorts;
};

const _convertFieldsIndexing = (data: Map<string, StoreTypeSort>): string[] => {
  const result: string[] = [];
  for (const [key, value] of data) {
    const field = ((value === StoreTypeSort.DESC) ? "-" : "") + key;
    result.push(field);
  }
  return result;
}


