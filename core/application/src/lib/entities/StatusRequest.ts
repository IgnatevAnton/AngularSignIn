import { WritableSignal, signal, Signal } from '@angular/core';

export class StatusRequest<T> {
  private _timeoutMillisecondCleanError: number;
  private _isLoading: WritableSignal<boolean> = signal(false);
  private _isError: WritableSignal<boolean> = signal(false);
  private _isErrorMessage: WritableSignal<T | null> = signal(null);

  get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }
  get isError(): Signal<boolean> {
    return this._isError.asReadonly();
  }

  get isErrorMessage(): Signal<T | null> {
    return this._isErrorMessage.asReadonly();
  }

  constructor(timeoutMillisecondCleanError: number) {
    this._timeoutMillisecondCleanError = timeoutMillisecondCleanError;
  }

  set(isLoading: boolean, isError: boolean, isErrorMessage: T): void {
    this._isLoading.set(isLoading);
    this._isError.set(isError);
    this._isErrorMessage.set(isErrorMessage);
    if (isError === false) {
      return;
    }
    setTimeout(() => {
      this._isError.set(false);
      this._isErrorMessage.set(null);
    }, this._timeoutMillisecondCleanError);
  }
}
