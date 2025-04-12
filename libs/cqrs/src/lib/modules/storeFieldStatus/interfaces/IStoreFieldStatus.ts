import { IStoreFieldStatusReadonly } from './IStoreFieldStatusReadonly';

export interface IStoreFieldStatus extends IStoreFieldStatusReadonly {
    set(isLoading: boolean, isError: boolean): void;
}
