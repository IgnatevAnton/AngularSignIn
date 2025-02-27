import { DomainDecoators } from '#domain';
import { ApplicationRequest, BarNames } from '#application';
import { ISettingBar } from 'dist/application/lib/interface';
import { LocalStorageClientHandler } from '../../../entities/LocalStorageClientHandler';

export class UpdateSettingFromLoadDataHandler extends LocalStorageClientHandler<ApplicationRequest.setting.UpdateSettingFromLoadDataCommand, Map<BarNames, ISettingBar> | null> {
  @DomainDecoators.DebugMethod()
  override handler(request: ApplicationRequest.setting.UpdateSettingFromLoadDataCommand): Map<BarNames, ISettingBar> | null {
    try {
      const settingString = localStorage.getItem(request.name);
      if (settingString === null) {
        return null;
      }
      const loadSettings = new Map(Object.entries<ISettingBar>(JSON.parse(settingString)) as [BarNames, ISettingBar][]);
      return this.updateCurrentSetting(request.currentSetting, loadSettings);
    } catch {
      return null;
    }
  }

  private updateCurrentSetting(current: Map<BarNames, ISettingBar>, load: Map<BarNames, ISettingBar>): Map<BarNames, ISettingBar> {
    const result = new Map(current);
    for (const [key] of result) {
      const loadSetting = load.get(key);
      if (loadSetting === undefined) {
        continue;
      }
      result.set(key, loadSetting);
    }
    return result;
  }
}
