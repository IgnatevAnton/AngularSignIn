import { Signal } from '@angular/core';

export interface IStoreFieldStatusReadonly {
    isPending: Signal<boolean>;
    isError: Signal<boolean>;
}
