export interface IPipelineBehevior {
  readonly data: any | null;
  set(data: any): IPipelineBehevior;
}
