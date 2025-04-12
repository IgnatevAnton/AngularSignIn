/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signal } from '@angular/core';
import { IStoreFieldArrayRequest, IStoreFieldArraySource } from '..';
import { IStoreLoaderSort } from '../../storeLoader';
import { IStoreFieldStatus } from '../../storeFieldStatus/interfaces/IStoreFieldStatus';

export interface IStoreFieldArray<T> {

  value: Signal<T[]>;
  status: IStoreFieldStatus;

  set: (source: IStoreFieldArraySource<T>) => this;
  fetch: (source: IStoreFieldArrayRequest<T>) => this;

  filter: (fields: Map<keyof T, any>) => this;
  search: (fields: (keyof T)[], search: any) => this;
  sort: (sorts: IStoreLoaderSort<T>) => this;

}
