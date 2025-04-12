import { inject, Inject, Injectable, Optional } from '@angular/core';
import { IRequestHandlerToken, IQuery, Sender, Command, Query, IRequestHandler } from '@cqrs';
import { HandlersToken } from '../tokens';
import { DomainServices, DomainTokens } from '#domain';

@Injectable()
export class SenderService extends Sender {

  protected _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });

  constructor(
    @Optional() @Inject(HandlersToken) handlers: Map<IQuery, IRequestHandlerToken>
  ) {
    super(handlers);
  }


  override send<TReq extends Query<TResp> | Command<TResp>, TResp>(request: TReq, callback?: (data: TResp) => void): TResp | undefined {
    const cnstr = Object.getPrototypeOf(request).constructor;
    const handler: IRequestHandler<TReq, TResp> | undefined = this._container.get(cnstr) as IRequestHandler<TReq, TResp>;
    if (handler === undefined) {
      this._logger?.warning("_SenderService", `not implemented handler for ${cnstr.name}`);
      return;
    }
    return super.send(request, callback);
  }

}
