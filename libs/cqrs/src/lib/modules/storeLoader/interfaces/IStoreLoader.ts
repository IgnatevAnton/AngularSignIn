/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signal } from '@angular/core';
import { IStoreLoaderMessageFetchData, IStoreLoaderSort } from '..';

export interface IStoreLoader<T> {

  readonly data: T[];
  readonly urls: Signal<Map<number, string> | null>;
  readonly buffers: Signal<Map<number, ArrayBufferLike> | null>
  readonly sortArray: Signal<Uint32Array | null>;
  readonly isError: boolean;

  initial: () => void;
  setData: (data: T[]) => void;
  setURL: (data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) => void;
  setBuffer: (data: ArrayBufferLike | T[], sorts?: IStoreLoaderSort<T>[]) => void;
  fetchURL: (request: IStoreLoaderMessageFetchData, sorts?: IStoreLoaderSort<T>[]) => void;
  fetchBuffer: (request: IStoreLoaderMessageFetchData, sorts?: IStoreLoaderSort<T>[]) => void;
  sort: (sort: IStoreLoaderSort<T>) => void;
  clear: () => void;

}
