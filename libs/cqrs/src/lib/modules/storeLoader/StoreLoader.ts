import { WritableSignal, signal, inject } from '@angular/core';
import {
  IStoreLoader,
  IStoreLoaderConfiguration,
  IStoreLoaderMessage,
  StoreLoaderMessageActions as ACTION,
  IStoreLoaderMessageFetchData,
  ISotreLoaderMessageResponse,
  StoreTypeSort,
  IStoreLoaderSort,
  IStoreLoaderSortString,
} from '.';
import { WORKER_LOADER_CHUNK } from '../../tokens';

export class StoreLoader<T> implements IStoreLoader<T> {

  private readonly _factory = inject(WORKER_LOADER_CHUNK, { optional: true });

  private readonly _urls: WritableSignal<Map<number, string> | null> = signal(null);
  private readonly _buffers: WritableSignal<Map<number, ArrayBufferLike> | null> = signal(null);
  private readonly _sortArray: WritableSignal<Uint32Array | null> = signal(null);

  private _data: T[] = [];
  private _worker: Worker | null = null;
  private _isError = false;
  constructor( private readonly _config: IStoreLoaderConfiguration ) { this.initial(); }

  get data() { return this._data; }
  get urls() { return this._urls.asReadonly(); }
  get buffers() { return this._buffers.asReadonly(); }
  get isError() { return this._isError; }
  get sortArray() { return this._sortArray.asReadonly(); }


  initial() {
    this.clear();
    const worker = this.createWorker();
    if (worker === null) { this._isError = true; return; }
  }

  setData(data: T[]) {
    this._data = data;
  }

  setURL = (data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) =>
    this.setPostMessage(ACTION.url, data, sorts);

  setBuffer = (data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) =>
    this.setPostMessage(ACTION.buffer, data, sorts);

  fetchURL = (request: IStoreLoaderMessageFetchData, sorts?: IStoreLoaderSort<T>[]) =>
    this.fetchPostMessage(ACTION.fetchURL, request, sorts);

  fetchBuffer = (request: IStoreLoaderMessageFetchData, sorts?: IStoreLoaderSort<T>[]) =>
    this.fetchPostMessage(ACTION.fetchBuffer, request, sorts);

  sort(sort: IStoreLoaderSort<T>) {
    const msg: IStoreLoaderMessage = { action: ACTION.getSort, sorts: [sort as IStoreLoaderSortString], config: this._config };
    this._worker?.postMessage(msg);
  }

  clear() {
    this._data = [];
    this._urls.set(null);
    this._buffers.set(null);
    this._sortArray.set(null);
    this._isError = false;
    if (this._worker === null) { return; }
    this._worker.terminate();
    this._worker = null;
  }

  private setPostMessage(
    action: ACTION.buffer | ACTION.url,
    source: ArrayBufferLike | T[],
    sorts?: IStoreLoaderSort<T>[]
  ) {
    const isArrayBuffer = source instanceof ArrayBuffer;
    const message: IStoreLoaderMessage = (isArrayBuffer)
      ? { action, buffer: source, config: this._config, sorts: sorts as IStoreLoaderSortString[] }
      : { action, data: source as T[], config: this._config, sorts: sorts as IStoreLoaderSortString[] };
    this._worker?.postMessage(message, (isArrayBuffer) ? [source] : []);
  }

  private fetchPostMessage(
    action: ACTION.fetchURL | ACTION.fetchBuffer,
    request?: IStoreLoaderMessageFetchData,
    sorts?: IStoreLoaderSort<T>[]
  ) {
    const msg: IStoreLoaderMessage = { action, request, config: this._config, sorts: sorts as IStoreLoaderSortString[] };
    this._worker?.postMessage(msg);
  }

  private success = async (msg: MessageEvent<ISotreLoaderMessageResponse>) => {
    this._setSort(msg.data.sort);
    this._setDataFromBuffers(msg.data.data);
    this._setBuffers(msg.data.buffers);
    this._setUrls(msg.data.urls);
  };

  private error = (e: ErrorEvent) => { console.warn(e); };

  private _setSort(sort?: [Map<string, StoreTypeSort>, Uint32Array | null]) {
    if (sort === undefined) { return; }
    const [field, array] = sort;
    if (array === null) {
      this.addSort(field);
    } else {
      this._sortArray.set(array);
    }
  }

  private addSort(field: Map<string, StoreTypeSort>) {
    const msg: IStoreLoaderMessage = { action: ACTION.addSort, data: this._data, sorts: [field], config: this._config };
    this._worker?.postMessage(msg);
  }

  private _setDataFromBuffers(data?: Map<number, ArrayBufferLike>) {
    if (data === undefined) { return; }
    this._data = [];
    for (let i = 0; i < data.size; i++) {
      setTimeout(() => {
        const buffer = data.get(i);
        if (buffer === undefined) { return; }
        const parser: T[] = JSON.parse(new TextDecoder().decode(buffer));
        for (const item of parser) { this._data.push(item); }
      }, 1);
    }
  }

  private _setBuffers(buffers?: Map<number, ArrayBufferLike>) {
    if (buffers === undefined) { return; }
    this._buffers.set(buffers);
  }

  private _setUrls(urls?: Map<number, string>) {
    if (urls === undefined) { return; }
    this._urls.set(urls);
  }

  private createWorker(): Worker | null {
    if (this._factory === null) { return null; }
    const worker = this._factory();
    if (worker === null) { return null; }
    worker.onmessage = this.success;
    worker.onerror = this.error;
    this._worker = worker;
    return worker;
  }

}
