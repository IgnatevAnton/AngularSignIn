/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, WritableSignal, signal } from '@angular/core';
import { StoreChunkMessageActions } from './constant/StoreChunkMessageActions';
import { WORKER_STORE_CHUNK } from '../../tokens';
import { IStoreChunks } from './interfaces/IStoreChunks';
import { IStoreChunkMessage } from './interfaces/IStoreChunkMessage';

export class StoreChunks implements IStoreChunks {

  private readonly _factory = inject(WORKER_STORE_CHUNK, { optional: true });
  private readonly _proccess: WritableSignal<number[] | null> = signal(null);
  private readonly _workers: Worker[] = [];
  private _ids: number[] = [];
  private _isError = false;

  get proccess() { return this._proccess; }
  get isError() { return this._isError; }

  initial(count: number, success: (...arg: any[]) => void, error: (...arg: any[]) => void) {
    this.clear();
    this._ids = Array.from({ length: count }, (v, i) => i);
    for (const id of this._ids) {
      const worker = this.addChunk(id, success, error);
      if (worker === null) { this._isError = true; return; }
      this._workers.push(worker);
    }
  }

  setDataFromURL(data: Map<number, string>) {
    this.resizeWorkers(Array.from(data.keys()));
    this._proccess.set([...this._ids]);
    for (let i = 0; i < this._workers.length; i++) {
      const url = data.get(i);
      const worker = this._workers[i];
      if (url === undefined) { continue; }
      const message: IStoreChunkMessage = { action: StoreChunkMessageActions.url, data: { url: url, time: Date.now() }, number: i };
      worker.postMessage(message);
    }
  }

  setDataFromBuffer(data: Map<number, ArrayBufferLike>) {
    this.resizeWorkers(Array.from(data.keys()));
    this._proccess.set([...this._ids]);
    for (let i = 0; i < this._workers.length; i++) {
      const buffer = data.get(i);
      const worker = this._workers[i];
      if (buffer === undefined) { continue; }
      const message: IStoreChunkMessage = { action: StoreChunkMessageActions.buffer, data: { buffer: buffer, time: Date.now() }, number: i };
      worker.postMessage(message, [buffer]);
    }
  }

  send(message: IStoreChunkMessage) {
    this._proccess.set([...this._ids]);
    for (let i = 0; i < this._workers.length; i++) {
      const worker = this._workers[i];
      message.number = i;
      worker.postMessage(message);
    }
  }

  clear() {
    this._ids = [];
    this._proccess.set(null);
    for (const worker of this._workers) { worker.terminate(); }
    this._workers.length = 0;
    this._isError = false;
  }

  private resizeWorkers(ids: number[]) {
    this._ids = ids;
    const count = ids.length;
    if (count === this._workers.length) { return; }
    if (count < this._workers.length) {
      for (let i = count; i < this._workers.length; i++) {
        const worker = this._workers[i];
        worker.terminate();
      }
      this._workers.splice(count);
    }
  }

  private addChunk(id: number, success: (...arg: any[]) => void, error: (...arg: any[]) => void): Worker | null {
    if (this._factory === null) { return null; }
    const worker = this._factory();
    if (worker === null) { return null; }
    worker.onmessage = (message: MessageEvent<IStoreChunkMessage>) => {
      success(message);
      this.removeFromProccess(id);
    };
    worker.onerror = (e: ErrorEvent) => error(e);
    return worker;
  }

  private removeFromProccess(id: number) {
    this._proccess.update(prev => prev?.filter(e => e !== id) ?? null);
  }

}
