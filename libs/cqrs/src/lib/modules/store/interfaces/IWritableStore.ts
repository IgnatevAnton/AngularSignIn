/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStoreField } from '../../storeField';
import { IStoreFieldArray } from '../../storeFieldArray';

export type IWritableStore<T> = {
    [Property in keyof T]: T[Property] extends any[] ? IStoreFieldArray<T[Property]> : IStoreField<T[Property]>;
};
