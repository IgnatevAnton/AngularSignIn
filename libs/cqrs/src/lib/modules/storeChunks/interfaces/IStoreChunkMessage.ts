/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreChunkMessageActions } from '../constant/StoreChunkMessageActions';
export interface IStoreChunkMessage {
  number?: number;
  action: StoreChunkMessageActions;
  data: any;
}
