import { IStoreLoaderConfiguration } from '../modules/storeLoader';

export const getParameterArray = (length: number, configuration: IStoreLoaderConfiguration): IStoreLoaderConfiguration => {
  let count = Math.ceil(length / configuration.sizeChunk);
  count = (count > configuration.countChunks) ? configuration.countChunks : count;
  const size = Math.ceil(length / count);
  return { sizeChunk: size, countChunks: count };
};
