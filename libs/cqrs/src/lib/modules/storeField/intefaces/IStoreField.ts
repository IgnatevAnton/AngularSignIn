import { Signal } from '@angular/core';
import { IStoreFieldStatus } from '../../storeFieldStatus';
import { IStoreSetData } from '../../store/interfaces/IStoreSetData';

export interface IStoreField<T> {

  value: Signal<T>;
  status: IStoreFieldStatus;

  set: (data: IStoreSetData<T>) => void

}
