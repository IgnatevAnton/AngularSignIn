import { Signal } from "@angular/core";
import { ISettingBar } from "../../interface";
import { BarNames } from "../../constant/BarNames";

interface ISetSettingBar {
  setSettingBar(name: BarNames, settingBar: ISettingBar): void;
}

interface ILoadSetting {
  loadSetting(key: string): void
}

export interface ISettingInterfaceService extends
  ISetSettingBar,
  ILoadSetting
{
  readonly settings: Signal<Map<BarNames, ISettingBar>>;
  readonly isLoadSetting: Signal<boolean>;
}
