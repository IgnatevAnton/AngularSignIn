/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreFetchMethods } from '../constant/StoreFetchMethods';

export interface IStoreLoaderMessageFetchData {
    url: string;
    method: StoreFetchMethods;
    body?: any;
}
