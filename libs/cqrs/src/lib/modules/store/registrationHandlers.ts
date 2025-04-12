import { Provider } from '@angular/core';
import { IRegistrationHandlersSource } from './interfaces/IRegistrationHandlersSource';
import { StoreAction } from '../storeAction';

export function registrationHandlers(...source: IRegistrationHandlersSource<StoreAction>[]): Provider[] {
  const result: Provider[] = [];
  for (const [ action, handler ] of source) {
    result.push({ provide: action, useClass: handler });
  }
  return result;
}
