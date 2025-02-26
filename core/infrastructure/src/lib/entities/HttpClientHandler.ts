import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IRequestHandler } from '@cqrs';
import { URL_REST_API } from '../tokens';

export abstract class HttpClientHandler<TReq, TResp> implements IRequestHandler<TReq, TResp> {
  protected _url: string = inject(URL_REST_API);
  protected _client: HttpClient = inject(HttpClient);

  abstract handler(request: TReq): TResp;
}
