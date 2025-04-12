/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference lib="webworker" />
import { storeLoaderDataWorker } from '@cqrs';

let sorts = new Map<string, Uint32Array>();
addEventListener('message', async (message) => storeLoaderDataWorker(sorts, message).then(result => sorts = result));
