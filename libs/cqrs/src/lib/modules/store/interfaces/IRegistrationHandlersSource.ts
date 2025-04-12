/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreAction } from '../../storeAction';
import { IStoreHandler } from '../../storeHandler';

type ConstructorAction<T extends StoreAction> = new (...args: any[]) => T;
type ConstructorHandler<T extends StoreAction> = new (...args: any[]) => IStoreHandler<T>;

export type IRegistrationHandlersSource<T extends StoreAction> = [ConstructorAction<T>, ConstructorHandler<T>];

