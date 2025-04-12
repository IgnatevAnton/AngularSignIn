import { StoreFieldTransferType } from '../constant';
import { IStoreLoaderSort } from '../../storeLoader/interfaces/IStoreLoaderSort';
import { IStoreLoaderMessageFetchData } from '../../storeLoader';

export interface IStoreFieldArraySource<T> {
    data: ArrayBufferLike | T[] | IStoreLoaderMessageFetchData;
    sorts?: IStoreLoaderSort<T>[];
    transferType?: StoreFieldTransferType;
}
