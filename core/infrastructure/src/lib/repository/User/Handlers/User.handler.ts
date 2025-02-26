import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IQueryHandler } from '@cqrs';
import { ApplicationTokens } from '#application';

export abstract class UserHandler<TReq, TResp> implements IQueryHandler<TReq, TResp> {
  protected _url: string = inject(ApplicationTokens.URL_REST_API);
  protected _client: HttpClient = inject(HttpClient);

  abstract handler(request: TReq): TResp;
}
