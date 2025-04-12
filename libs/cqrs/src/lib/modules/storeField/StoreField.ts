import { Signal, signal, WritableSignal } from '@angular/core';
import { StoreFieldStatus } from '../storeFieldStatus/StoreFieldStatus';
import { IStoreField } from './intefaces/IStoreField';
import { IStoreSource } from '../store/interfaces/IStoreSource';
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
    this._value.set({ ...this._value(), ...data });
  };

}


