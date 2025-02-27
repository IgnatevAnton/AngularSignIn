import { Command } from '@cqrs';
import { BarNames } from '../../../constant/BarNames';
import { ISettingBar } from '../../../interface';

export class UpdateSettingFromLoadDataCommand extends Command<Map<BarNames, ISettingBar> | null> {
  get name() {
    return this._name;
  }
  get currentSetting() {
    return this._currentSetting;
  }

  constructor(
    private _name: string,
    private _currentSetting: Map<BarNames, ISettingBar>
  ) {
    super();
  }
}
