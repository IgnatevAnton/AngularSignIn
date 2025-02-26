import { ICommand } from '../interfaces/ICommand';
import { IQuery } from '../interfaces/IQuery';
import { IRequestHandler } from '../interfaces/IRequestHandler';
import { IRequestHandlerToken } from '../interfaces/IRequestHandlerToken';
import { IQueryToken } from '../interfaces/IQueryToken';
import { ISender } from '../interfaces/ISender';

export abstract class Sender implements ISender {
  private _container: Map<IQueryToken, IRequestHandlerToken>;
  constructor(container: Map<IQueryToken, IRequestHandlerToken>) {
    this._container = container;
  }

  send<TReq extends IQuery<TResp> | ICommand<TResp>, TResp>(request: TReq): TResp | undefined {
    const cnstr = Object.getPrototypeOf(request).constructor;
    const handler: IRequestHandler<TReq, TResp> | undefined = this._container.get(cnstr) as IRequestHandler<TReq, TResp>;
    if (handler === undefined) {
      return;
    }
    return handler.handler(request);
  }
}
