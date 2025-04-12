/// <reference lib="webworker" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { decompressionArrayBuffer } from '../../../common/decompressionArrayBuffer';
import { filterIndeces } from '../../../common/filterIndeces';
import { findIndeces } from '../../../common/findIndeces';
import { StoreChunkMessageActions } from '../constant/StoreChunkMessageActions';
import { IStoreChunkMessage } from '../interfaces/IStoreChunkMessage';

export const storeChunkWorker = async (data: any[], message: MessageEvent<IStoreChunkMessage>) => {
  switch (message.data.action) {
    case StoreChunkMessageActions.buffer: data = await _buffer(message.data, data); break;
    case StoreChunkMessageActions.url: data = await _url(message.data, data); break;
    case StoreChunkMessageActions.filter: data = _filter(message.data, data); break;
    case StoreChunkMessageActions.find: data = _find(message.data, data); break;
    default: break;
  }
  return data;
};

const _buffer = async (message: IStoreChunkMessage, data: any[]) => {
  const buffer = message.data?.buffer;
  //const unzip = await decompressionArrayBuffer(message.data?.buffer as ArrayBuffer);
  data = (buffer !== undefined) ? JSON.parse(new TextDecoder().decode(buffer)) : [];
  _post(Array.from(data.keys()), StoreChunkMessageActions.buffer, message.number ?? 0);
  return data;
};

const _url = async (message: IStoreChunkMessage, data: any[]) => {
  const url: URL = new URL(message.data.url);
  data = await fetch(url).then((response) => response.ok ? response.json() : []);
  _post(Array.from(data.keys()), StoreChunkMessageActions.url, message.number ?? 0);
  return data;
};

const _filter = (message: IStoreChunkMessage, data: any[]) => {
  const fields: Map<string, any> = message.data?.fields ?? new Map<string, any>();
  const indeces: number[] = filterIndeces(fields, data);
  _post(indeces, StoreChunkMessageActions.filter, message.number ?? 0);
  return data;
};

const _find = (message: IStoreChunkMessage, data: any[]) => {
  const fields: string[] = message.data?.fields ?? [];
  const search: string = message.data?.search;
  const indeces: number[] = findIndeces(fields, search, data);
  _post(indeces, StoreChunkMessageActions.find, message.number ?? 0);
  return data;
};

const _post = (data: any[], action: StoreChunkMessageActions, number: number) => {
  const zip = new Uint32Array(data);
  const msg: IStoreChunkMessage = { action: action, data: { indeces: zip, count: data.length }, number: number };
  postMessage(msg, [zip.buffer]);
};
