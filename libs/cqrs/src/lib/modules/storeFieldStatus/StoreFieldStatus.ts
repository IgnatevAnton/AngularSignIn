import { WritableSignal, signal, Signal } from '@angular/core';
import { IStoreFieldStatus } from './interfaces/IStoreFieldStatus';

export class StoreFieldStatus implements IStoreFieldStatus {

  private readonly _timeoutMillisecondCleanError: number = 2000;
  private readonly _isPending: WritableSignal<boolean> = signal(false);
  private readonly _isError: WritableSignal<boolean> = signal(false);

  get isPending(): Signal<boolean> {
    return this._isPending.asReadonly();
  }
  get isError(): Signal<boolean> {
    return this._isError.asReadonly();
  }

  constructor(timeoutMillisecondCleanError?: number) {
    if (timeoutMillisecondCleanError) {
      this._timeoutMillisecondCleanError = timeoutMillisecondCleanError;
    }
  }

  set(isLoading: boolean, isError: boolean): void {
    this._isPending.set(isLoading);
    this._isError.set(isError);
    if (isError === false) { return; }
    setTimeout(() => this._isError.set(false), this._timeoutMillisecondCleanError);
  }

}
