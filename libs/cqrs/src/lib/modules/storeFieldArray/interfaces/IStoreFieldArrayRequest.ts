import { IStoreLoaderMessageFetchData, IStoreLoaderSort } from '../../storeLoader';
import { StoreFieldTransferType } from '../constant';

export interface IStoreFieldArrayRequest<T> {
    data: IStoreLoaderMessageFetchData;
    sorts?: IStoreLoaderSort<T>[];
    transferType?: StoreFieldTransferType;
}
