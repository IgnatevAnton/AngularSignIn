/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStoreAction } from './interfaces/IStoreAction';

export abstract class StoreAction implements IStoreAction {
  private readonly _isStoreAction: boolean = true;
}
