/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQuery } from '../interfaces/IQuery';

export abstract class Query<TResp> implements IQuery {
  private readonly _isQuery: boolean = true;
}
