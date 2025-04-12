import { IViewStore } from './IViewStore';
import { IWritableStore } from './IWritableStore';

export type IInjectStoreOut<T, K extends true | false> = K extends true ? IWritableStore<T> : IViewStore<T>;
