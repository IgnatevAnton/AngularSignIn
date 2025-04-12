/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentInjector, inject, isDevMode, runInInjectionContext } from '@angular/core';
import { StoreAction } from '../storeAction';
import { StoreHandler } from '../storeHandler';
import { IStoreDispatcher } from './interfaces/IStoreDispatcher';

export class StoreDispatcher implements IStoreDispatcher {

  private environmentInjector = inject(EnvironmentInjector);

  send<TReq extends StoreAction, TResp>(request: TReq, callback?: (data: TResp) => void): void {
    const token = Object.getPrototypeOf(request).constructor;
    runInInjectionContext(this.environmentInjector, () => {
      const handler: StoreHandler<TReq, TResp> | null = inject(token, { optional: true });
      if (handler === null) {
        if (isDevMode()) {
          console.warn(` [${token.name}] `, `Handler not found`);
        }
        return;
      }
      handler.handler(request, this, callback);
    });
  }

}
