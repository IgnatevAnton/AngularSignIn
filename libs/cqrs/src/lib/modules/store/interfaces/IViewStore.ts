import { Signal } from '@angular/core';
import { IStoreFieldStatusReadonly } from '../../storeFieldStatus';

export type IViewStore<T> = {
    [Property in keyof T]: { value: Signal<T[Property]>; status: IStoreFieldStatusReadonly; };
};
