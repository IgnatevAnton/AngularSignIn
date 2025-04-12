import { InjectionToken, Provider, Signal } from '@angular/core';
import { StoreField } from '../storeField';
import { StoreFieldArray } from '../storeFieldArray';
import { IStoreFieldStatusReadonly } from '../storeFieldStatus';
import { IStoreSource } from './interfaces/IStoreSource';
import { IWritableStore } from './interfaces/IWritableStore';
import { IViewStore } from './interfaces/IViewStore';

export function configurationStore<T>(TOKEN: InjectionToken<T>, defaultValue: IStoreSource<T>) : Provider[] {
  const STORE_TOKEN = new InjectionToken<[IWritableStore<T>, IViewStore<T>]>(`${TOKEN.toString()} stores`);
  return [
    { provide: TOKEN, useValue: STORE_TOKEN },
    { provide: STORE_TOKEN, useFactory: () => constructorStore<T>(defaultValue) }
  ];
}

function constructorStore<T>(data: IStoreSource<T>) {
  const writableStoreMap = new Map();
  const viewStoreMap = new Map();
  const entries = Object.entries(data);
  for (const [key, entry] of entries) {
    if (Array.isArray(entry)) {
      const field = new StoreFieldArray<typeof entry>();
      const signals: { value: Signal<T>, status: IStoreFieldStatusReadonly } = {
        value: field.value as Signal<T>,
        status: {
          isPending: field.status.isPending,
          isError: field.status.isError
        }
      }
      writableStoreMap.set(key as keyof T, field);
      viewStoreMap.set(key as keyof T, signals);
    } else {
      const field = new StoreField<typeof entry>(entry);
      const signals: { value: Signal<T>, status: IStoreFieldStatusReadonly; } = {
        value: field.value as Signal<T>,
        status: {
          isPending: field.status.isPending,
          isError: field.status.isError
        }
      }
      writableStoreMap.set(key as keyof T, field);
      viewStoreMap.set(key as keyof T, signals);
    }
  }
  return [Object.fromEntries(writableStoreMap), Object.fromEntries(viewStoreMap)]
}

