/* eslint-disable @typescript-eslint/no-explicit-any */
import { effect, Signal, signal, WritableSignal } from '@angular/core';

import { IStoreFieldArray, IStoreFieldArrayConfiguration, IStoreFieldArrayRequest, IStoreFieldArraySource } from '.';
import { defaultConfig, StoreFieldTransferType as TrasnferType } from './constant';

import { IStoreFieldStatus } from '../storeFieldStatus/interfaces/IStoreFieldStatus';
import { StoreFieldStatus } from '../storeFieldStatus/StoreFieldStatus';

import { IStoreStack, StoreStack } from '../storeStack';
import { IStoreChunkMessage, IStoreChunks, StoreChunkMessageActions, StoreChunks } from '../storeChunks';
import { IStoreLoader, IStoreLoaderSort, StoreLoader } from '../storeLoader';

export class StoreFieldArray<T> implements IStoreFieldArray<T> {

  private _time = performance.now();

  private readonly _config = defaultConfig;

  private readonly _value: WritableSignal<T[]> = signal([]);
  private readonly _status: IStoreFieldStatus = new StoreFieldStatus(this._config.timeoutMillisecondCleanError);

  private readonly _stack: IStoreStack = new StoreStack(this._status.isPending);
  private readonly _loader: IStoreLoader<T> = new StoreLoader<T>(this._config);
  private readonly _chuncks: IStoreChunks = new StoreChunks();

  private readonly _filterIndeces: Map<number, { max: number, buffer: Uint32Array; }> = new Map<number, { max: number, buffer: Uint32Array; }>();

  private readonly initialChunkFromURL = effect(() => {
    const urls = this._loader.urls();
    if (urls === null) { return; }
    this._chuncks.setDataFromURL(urls);
  });

  private readonly initialChunkFromBuffer = effect(() => {
    const buffers = this._loader.buffers();
    if (buffers === null) { return; }
    this._chuncks.setDataFromBuffer(buffers);
  });

  private readonly sortProccess = effect(() => {
    const sort = this._loader.sortArray();
    if (sort === null) { return; }
    this._chuncks.proccess.set([]);
  });

  private readonly endProccess = effect(async () => {
    const chunks = this._chuncks.proccess();
    if (chunks === null || chunks.length !== 0) { return; }
    this._chuncks.proccess.set(null);
    setTimeout(() => {
      const sort = this._loader.sortArray();
      let result = this.filterValues();
      if (sort !== null) {
        result = this.sortValues(result, sort);
      }
      this._value.set(result);
      console.log(`%c chunck response ${performance.now() - this._time}`, 'color:white; background-color:#9bb894; ');
      this._status.set(false, false);
      this._stack.next();
    }, 1);
  });


  private filterValues() {
    const result: T[] = [];
    for (let i = 0; i < this._filterIndeces.size; i++) {
      const item = this._filterIndeces.get(i);
      if (item === undefined) { continue; }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < item.buffer.length; ++j) {
        const index = item.buffer[j] + i * item.max;
        const value = this._loader.data[index];
        if (value === undefined) { continue; }
        result.push(value);
      }
    }
    return result;
  }

  private sortValues(data: T[], sortIndeces: Uint32Array) {
    const result: T[] = [];
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < sortIndeces.length; i++) {
      const value = data[sortIndeces[i]];
      if (value === undefined) { continue; }
      result.push(value);
      count++;
      if (count === data.length) { break; }
    }
    return result;
  }

  constructor(configuration?: IStoreFieldArrayConfiguration) {
    if (configuration !== undefined) {
      this._config = configuration;
    }
    this._chuncks.initial(this._config.countChunks, this.success, this.error);

    this._setURL = this._setURL.bind(this);
    this._setBuffer = this._setBuffer.bind(this);
    this._fetchBuffer = this._fetchBuffer.bind(this);
    this._fetchURL = this._fetchURL.bind(this);
    this._filter = this._filter.bind(this);
    this._search = this._search.bind(this);
    this._sort = this._sort.bind(this);
  }

  get value(): Signal<T[]> { return this._value.asReadonly(); }
  get status(): IStoreFieldStatus { return this._status; }

  set = (source: IStoreFieldArraySource<T>) => {
    const { data, sorts, transferType } = source;
    switch (transferType) {
      case TrasnferType.BUFFER:
        this._stack.add(this._setBuffer, [data, sorts]).next(); break;
      case TrasnferType.URL:
        this._stack.add(this._setURL, [data, sorts]).next(); break;
      default:
        this._stack.add(this._setBuffer, [data, sorts]).next(); break;
    }
    return this;
  };

  fetch = (source: IStoreFieldArrayRequest<T>) => {
    switch (source.transferType) {
      case TrasnferType.BUFFER:
        this._stack.add(this._fetchBuffer, [source]).next(); break;
      case TrasnferType.URL:
        this._stack.add(this._fetchURL, [source]).next(); break;
      default:
        this._stack.add(this._fetchBuffer, [source]).next(); break;
    }
    return this;
  };

  filter = (fields: Map<keyof T, any>) => {
    this._stack.add(this._filter, [fields]).next();
    return this;
  };

  search = (fields: (keyof T)[], search: any) => {
    this._stack.add(this._search, [fields, search]).next();
    return this;
  };

  sort = (sorts: IStoreLoaderSort<T>) => {
    this._stack.add(this._sort, [sorts]).next();
    return this;
  };

  private _setURL(data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) {
    this.intialLoading();
    if (!(data instanceof ArrayBuffer)) {
      this.setData(data as T[]);
    }
    this._loader.setURL(data, sorts);
  }

  private _setBuffer(data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) {
    this.intialLoading();
    if (!(data instanceof ArrayBuffer)) {
      this.setData(data as T[]);
    }
    this._loader.setBuffer(data, sorts);
  }

  private _fetchURL(source: IStoreFieldArrayRequest<T>) {
    this.intialLoading();
    this._loader.fetchURL(source.data, source.sorts);
  }

  private _fetchBuffer(source: IStoreFieldArrayRequest<T>) {
    this.intialLoading();
    this._loader.fetchBuffer(source.data, source.sorts);
  }

  private _filter(fields: Map<keyof T, any>) {
    this.intialLoading();
    this._chuncks.send({ action: StoreChunkMessageActions.filter, data: { fields } });
  }
  private _search(fields: (keyof T)[], search: any) {
    this.intialLoading();
    this._chuncks.send({ action: StoreChunkMessageActions.find, data: { fields, search } });
  }

  private _sort(sorts: IStoreLoaderSort<T>) {
    this._time = performance.now();
    this._status.set(true, false);
    this._loader.sort(sorts);
  }

  private setData(data: T[]) {
    this._loader.setData(data);
    this._value.set(data);
  }

  private intialLoading() {
    this._time = performance.now();
    this._filterIndeces.clear();
    this._status.set(true, false);
  }

  private success = (message: MessageEvent<IStoreChunkMessage>) => {
    if (message.data.number === undefined) { return; }
    this._filterIndeces.set((message.data.number ?? 0), { buffer: message.data.data.indeces, max: message.data.data.count });
  };
  private error = (e: ErrorEvent) => console.warn(e);

}
