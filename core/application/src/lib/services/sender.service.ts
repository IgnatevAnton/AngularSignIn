import { Inject, Injectable, Optional } from '@angular/core';
import { IQueryHandlerToken, IQueryToken, Sender } from '@cqrs';
import { HandlersToken } from '../tokens';

@Injectable()
export class SenderService extends Sender {
  constructor(@Optional() @Inject(HandlersToken) handlers: Map<IQueryToken, IQueryHandlerToken>) {
    super(handlers);
  }
}
