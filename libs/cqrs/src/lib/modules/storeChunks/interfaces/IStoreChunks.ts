/* eslint-disable @typescript-eslint/no-explicit-any */
import { WritableSignal } from '@angular/core';
import { IStoreChunkMessage } from './IStoreChunkMessage';

export interface IStoreChunks {
  readonly proccess: WritableSignal<number[] | null>;
  readonly isError: boolean;
  initial: (
    count: number,
    success: (...arg: any[]) => void,
    error: (...arg: any[]) => void
  ) => void;
  setDataFromURL: (data: Map<number, string>) => void;
  setDataFromBuffer: (data: Map<number, ArrayBuffer>) => void;
  send: (message: IStoreChunkMessage) => void;
  clear: () => void;
}
