import { StoreTypeSort } from '..';

export type IStoreLoaderSort<T> = Map<keyof T, StoreTypeSort>;
