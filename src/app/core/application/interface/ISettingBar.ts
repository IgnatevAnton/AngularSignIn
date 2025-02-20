import { BarNames } from "../constant/BarNames";

export interface ISettingBar {
  readonly name: BarNames;
  readonly title: string;
  readonly position: { x: number, y: number };
  readonly size: { width: number, height: number };
  readonly isClosed: boolean;
  isVisible: boolean;

}
