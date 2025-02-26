import { IRequestHandlerToken } from './IRequestHandlerToken';

export interface IRequestHandler<IReq, IResp> extends IRequestHandlerToken {
  handler(request: IReq): IResp;
}
