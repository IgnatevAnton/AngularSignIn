import { BarNames } from "../constant/BarNames";
import { BarTypes } from "../constant/BarTypes";

export interface ISettingBar {
  readonly name: BarNames;
  readonly type: BarTypes;
  readonly title: string;
  readonly position: { x: number, y: number };
  readonly size: { width: number, height: number };
  readonly isClosed: boolean;
  readonly isResizable: boolean;
  readonly isDraggable: boolean;
  isVisible: boolean;

}
