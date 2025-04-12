/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStoreStackElement {
    function: (...arg: any[]) => void;
    arg: any[];
}
