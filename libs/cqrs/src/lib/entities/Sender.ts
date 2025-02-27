import { Command } from '../entities/Command';
import { Query } from '../entities/Query';
import { IRequestHandler } from '../interfaces/IRequestHandler';
import { IRequestHandlerToken } from '../interfaces/IRequestHandlerToken';
import { IQuery } from '../interfaces/IQuery';
import { ISender } from '../interfaces/ISender';

export abstract class Sender implements ISender {
  private _container: Map<IQuery, IRequestHandlerToken>;
  constructor(container: Map<IQuery, IRequestHandlerToken>) {
    this._container = container;
  }

  send<TReq extends Query<TResp> | Command<TResp>, TResp>(request: TReq): TResp | undefined {
    const cnstr = Object.getPrototypeOf(request).constructor;
    const handler: IRequestHandler<TReq, TResp> | undefined = this._container.get(cnstr) as IRequestHandler<TReq, TResp>;
    if (handler === undefined) {
      return;
    }
    return handler.handler(request);
  }
}
