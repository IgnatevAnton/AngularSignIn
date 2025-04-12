import { NgModule } from '@angular/core';
import { WORKER_LOADER_CHUNK, WORKER_STORE_CHUNK } from '@cqrs';

const factoryWorkerStoreChunk = (): Worker | null => {
  if (typeof Worker === 'undefined') { return null; }
  return new Worker(new URL('./store-chunk.worker', import.meta.url), { type: 'module' });
}

const factoryWorkerLoaderChunk = (): Worker | null => {
  if (typeof Worker === 'undefined') { return null; }
  return new Worker(new URL('./store-loader-data-split-chunk.worker', import.meta.url), { type: 'module' });
}

@NgModule({
  providers: [
    { provide: WORKER_STORE_CHUNK, useValue: factoryWorkerStoreChunk },
    { provide: WORKER_LOADER_CHUNK, useValue: factoryWorkerLoaderChunk }
  ]
})
export class WebWorkerRegistrationModule { }
