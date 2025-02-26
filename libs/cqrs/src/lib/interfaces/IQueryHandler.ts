import { IQueryHandlerToken } from './IQueryHandlerToken';

export interface IQueryHandler<IReq, IResp> extends IQueryHandlerToken {
  handler(request: IReq): IResp;
}
