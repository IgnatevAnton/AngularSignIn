/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signal } from '@angular/core';
import { IStoreStack } from './interfaces/IStoreStack';
import { IStoreStackElement } from './interfaces/IStoreStackElement';

export class StoreStack implements IStoreStack {

  private readonly _stack: IStoreStackElement[] = [];
  private _isInProgress: Signal<boolean>;

  constructor(isInProgress: Signal<boolean>) {
    this._isInProgress = isInProgress;
  }

  add = (fn: (...arg: any[]) => void, arg: any[]) => {
    this._stack.push({ function: fn, arg });
    return this;
  };
  clear = () => {
    this._stack.length = 0;
    return this;
  };
  next = () => {
    if (this._isInProgress() === true || this._stack.length === 0) { return this; }
    setTimeout(() => {
      this._stack[0].function(...this._stack[0].arg);
      this._stack.splice(0, 1);
    }, 1);
    return this;
  };

}
