import { StoreTypeSort } from '../constant/StoreTypeSort';
import { IStoreLoaderConfiguration } from './IStoreLoaderConfiguration';

export interface ISotreLoaderMessageResponse {
    data?: Map<number, ArrayBufferLike>;
    buffers?: Map<number, ArrayBufferLike>;
    urls?: Map<number, string>;
    config?: IStoreLoaderConfiguration;
    sort?: [Map<string, StoreTypeSort>, Uint32Array | null];
}
