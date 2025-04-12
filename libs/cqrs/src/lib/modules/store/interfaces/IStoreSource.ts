
export type IStoreSource<T> = {
    [Property in keyof T]: T[Property];
};
