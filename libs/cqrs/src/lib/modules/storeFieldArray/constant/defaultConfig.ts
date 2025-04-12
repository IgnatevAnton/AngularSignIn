import { IStoreFieldArrayConfiguration } from '../interfaces/IStoreFieldArrayConfiguration';

export const defaultConfig: IStoreFieldArrayConfiguration = {
    sizeChunk: 100000,
    countChunks: 10,
    timeoutMillisecondCleanError: 2000
};
