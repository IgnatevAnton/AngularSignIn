/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQueryToken } from './IQueryToken';

export abstract class IQuery<TResp> implements IQueryToken {
  private readonly _isQuery: boolean = true;
}
