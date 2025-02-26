import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IQueryHandler } from '@cqrs';
import { URL_REST_API } from '../../../tokens';

export abstract class UserHandler<TReq, TResp> implements IQueryHandler<TReq, TResp> {
  protected _url: string = inject(URL_REST_API);
  protected _client: HttpClient = inject(HttpClient);

  abstract handler(request: TReq): TResp;
}
