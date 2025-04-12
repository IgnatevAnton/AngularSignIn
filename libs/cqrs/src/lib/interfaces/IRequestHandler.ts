import { IRequestHandlerToken } from './IRequestHandlerToken';
import { ISender } from './ISender';

export interface IRequestHandler<IReq, IResp> extends IRequestHandlerToken {
  handler(request: IReq, sender: ISender, callback?: (data: IResp) => void): IResp;
}
