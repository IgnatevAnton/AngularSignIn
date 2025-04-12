export type IStoreSetData<T> = {
    [Property in keyof T]?: T[Property];
};
