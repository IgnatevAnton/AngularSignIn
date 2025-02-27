import { Inject, Injectable, Optional } from '@angular/core';
import { IRequestHandlerToken, IQuery, Sender } from '@cqrs';
import { HandlersToken } from '../tokens';

@Injectable()
export class SenderService extends Sender {
  constructor(@Optional() @Inject(HandlersToken) handlers: Map<IQuery, IRequestHandlerToken>) {
    super(handlers);
  }
}
