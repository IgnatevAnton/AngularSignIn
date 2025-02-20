import { BarNames, BarTypes } from '@application';


export interface ISettingBar {
  readonly name: BarNames;
  readonly type: BarTypes;
  readonly title: string;
  readonly position: { x: number, y: number };
  readonly size: { width: number, height: number };
  readonly isClosed: boolean;
  isVisible: boolean;

}
