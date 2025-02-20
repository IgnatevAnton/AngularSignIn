import { Signal } from "@angular/core";
import { ApplicationInterfaces, BarNames } from "@application";

export interface ISettingInterfaceService {
  readonly settings: Signal<Map<BarNames, ApplicationInterfaces.ISettingBar>>;
  isLoadSetting: Signal<boolean>;
  setSettingBar(name: BarNames, settingBar: ApplicationInterfaces.ISettingBar): void;
  loadSetting(key: string): void
}
