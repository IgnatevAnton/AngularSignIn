/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IStoreStack {
  add: (fn: (...arg: any[]) => void, arg: any[]) => this;
  clear: () => this;
  next: () => this;
}
