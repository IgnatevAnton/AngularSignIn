/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreLoaderMessageActions } from '../constant/StoreLoaderMessageActions';
import { StoreTypeSort } from '../constant/StoreTypeSort';
import { IStoreLoaderConfiguration } from './IStoreLoaderConfiguration';
import { IStoreLoaderMessageFetchData } from './IStoreLoaderMessageFetchData';

export interface IStoreLoaderMessage {
  action: StoreLoaderMessageActions;
  config: IStoreLoaderConfiguration;
  data?: any[];
  buffer?: ArrayBuffer;
  request?: IStoreLoaderMessageFetchData;
  sorts?: Map<string, StoreTypeSort>[];
  time?: number;
}
