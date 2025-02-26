import { ICommand } from './ICommand';
import { IQuery } from './IQuery';

export interface ISender {
  send<TReq extends IQuery<TResp> | ICommand<TResp>, TResp>(request: TReq): TResp | undefined;
}
