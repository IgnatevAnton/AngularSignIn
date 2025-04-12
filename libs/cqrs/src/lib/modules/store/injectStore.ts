import { InjectionToken, inject } from '@angular/core';
import { IInjectStoreOut } from './interfaces/IInjectStoreOut';
import { IViewStore } from './interfaces/IViewStore';
import { IWritableStore } from './interfaces/IWritableStore';

export function injectStore<T, K extends true | false | undefined = undefined>(token: InjectionToken<T>, isWritable?: K) {
  const storeToken = inject(token) as InjectionToken<[IWritableStore<T>, IViewStore<T>]>;
  return ((isWritable === true) ? inject(storeToken)[0] : inject(storeToken)[1]) as K extends true | false ? IInjectStoreOut<T, K> : IViewStore<T>;
}
