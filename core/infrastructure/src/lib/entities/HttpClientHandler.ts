import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IRequestHandler, ISender } from '@cqrs';
import { URL_REST_API } from '../tokens';
import { DomainServices, DomainTokens } from '#domain';

export abstract class HttpClientHandler<TReq, TResp> implements IRequestHandler<TReq, TResp> {
  protected _url: string = inject(URL_REST_API);
  protected _client: HttpClient = inject(HttpClient);
  protected _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });

  abstract handler(request: TReq, sender: ISender, callback?: (data: TResp) => void): TResp;

}
