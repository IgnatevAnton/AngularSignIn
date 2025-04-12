import { Signal, signal, WritableSignal } from '@angular/core';
import { StoreFieldStatus } from '../storeFieldStatus/StoreFieldStatus';
import { IStoreField } from './intefaces/IStoreField';
import { IStoreSetData } from '../store/interfaces/IStoreSetData';

export class StoreField<T> implements IStoreField<T> {

  private readonly _value: WritableSignal<T>;
  private readonly _timeoutMillisecondCleanError: number = 2000;
  private readonly _status = new StoreFieldStatus(this._timeoutMillisecondCleanError);

  constructor(value: T, timeoutMillisecondCleanError?: number) {
    this._value = signal(value);
    if (timeoutMillisecondCleanError) {
      this._timeoutMillisecondCleanError = timeoutMillisecondCleanError;
    }
  }
  get value(): Signal<T> { return this._value.asReadonly(); }
  get status(): StoreFieldStatus { return this._status; }

  set(data: IStoreSetData<T>) {
    const type = typeof data;
    switch (type) {
      case 'object':
        if (data === null) {
          this._value.set(data as T);
          return;
        }
        if (Array.isArray(data)) {
          this._value.set(data as T);
          return;
        }
        this._value.set({ ...this._value(), ...data });
        return;
      case 'function':
        return;
      default:
        this._value.set(data as T);
    }
  };

}


