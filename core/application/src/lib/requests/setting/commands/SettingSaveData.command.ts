import { Command } from '@cqrs';
import { ISettingBar } from '../../../interface';
import { BarNames } from '../../../constant/BarNames';

export class SettingSaveDataCommand extends Command<boolean> {
  get name() {
    return this._name;
  }
  get setting() {
    return this._setting;
  }

  constructor(
    private _name: string,
    private _setting: Map<BarNames, ISettingBar>
  ) {
    super();
  }
}
