import { Command } from '../entities/Command';
import { Query } from '../entities/Query';

export interface ISender {
  send<TReq extends Query<TResp> | Command<TResp>, TResp>(request: TReq): TResp | undefined;
}
