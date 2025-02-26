import { ICommand } from '../interfaces/ICommand';
import { IQuery } from '../interfaces/IQuery';
import { IQueryHandler } from '../interfaces/IQueryHandler';
import { IQueryHandlerToken } from '../interfaces/IQueryHandlerToken';
import { IQueryToken } from '../interfaces/IQueryToken';
import { ISender } from '../interfaces/ISender';

export abstract class Sender implements ISender {
  private _container: Map<IQueryToken, IQueryHandlerToken>;
  constructor(container: Map<IQueryToken, IQueryHandlerToken>) {
    this._container = container;
  }

  send<TReq extends IQuery<TResp> | ICommand<TResp>, TResp>(request: TReq): TResp | undefined {
    const cnstr = Object.getPrototypeOf(request).constructor;
    const handler: IQueryHandler<TReq, TResp> | undefined = this._container.get(cnstr) as IQueryHandler<TReq, TResp>;
    if (handler === undefined) {
      return;
    }
    return handler.handler(request);
  }
}
