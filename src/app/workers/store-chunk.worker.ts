/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference lib="webworker" />
import { storeChunkWorker } from '@cqrs';
let data: any[] = [];
addEventListener('message', (message) => storeChunkWorker(data, message).then(result => data = result));


