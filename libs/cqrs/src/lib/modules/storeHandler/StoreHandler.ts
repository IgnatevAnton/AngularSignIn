import { StoreAction } from '../storeAction';
import { IStoreDispatcher } from '../storeDispatcher/interfaces/IStoreDispatcher';
import { IStoreHandler } from './interfaces/IStoreHandler';

export abstract class StoreHandler<TReq extends StoreAction, TResp> implements IStoreHandler<TReq> {
  abstract handler(action: TReq, dispatcher: IStoreDispatcher, callback?: (data: TResp) => void): void;
}
