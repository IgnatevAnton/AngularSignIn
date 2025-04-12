import { InjectionToken } from '@angular/core';
import { IStoreDispatcher } from './modules/storeDispatcher';

export const WORKER_STORE_CHUNK = new InjectionToken<() => Worker | null>('WORKER_STORE_CHUNK');
export const WORKER_LOADER_CHUNK = new InjectionToken<() => Worker | null>('WORKER_LOADER_CHUNK');
export const STORE_DISPATCHER_TOKEN = new InjectionToken<IStoreDispatcher>('STORE_DISPATCHER_TOKEN');
