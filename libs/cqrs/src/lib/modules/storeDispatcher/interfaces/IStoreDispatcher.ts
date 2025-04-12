import { StoreAction } from '../../storeAction';

export interface IStoreDispatcher {
  send<TReq extends StoreAction, TResp>(request: TReq, callback?: (data: TResp) => void): void;
}
