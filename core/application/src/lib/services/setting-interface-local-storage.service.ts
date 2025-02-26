import { Inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { DomainDecoators } from '#domain';
import { ISettingInterfaceService } from './interface/ISettingInterfaceService';
import { BarNames } from '../constant/BarNames';
import { ISettingBar } from '../interface';
import { DefaultSettingBarsToken } from '../tokens';

@Injectable()
export class SettingInterfaceLocalStorageService implements ISettingInterfaceService {
  private _defaultSetting = new Map<BarNames, ISettingBar>();
  private _settings: WritableSignal<Map<BarNames, ISettingBar>> = signal(new Map());
  private _isLoadSetting: WritableSignal<boolean> = signal(false);
  private _key = '';
  get settings(): Signal<Map<BarNames, ISettingBar>> {
    return this._settings.asReadonly();
  }
  get isLoadSetting(): Signal<boolean> {
    return this._isLoadSetting.asReadonly();
  }

  constructor(@Inject(DefaultSettingBarsToken) defaultSettings: Map<BarNames, ISettingBar>) {
    this._defaultSetting = defaultSettings;
    this._settings.set(new Map(this._defaultSetting));
  }

  @DomainDecoators.DebugMethod()
  public setSettingBar(name: BarNames, settingBar: ISettingBar): void {
    const map = new Map(this.settings());
    map.set(name, settingBar);
    this._settings.set(map);
    this.saveSetting();
  }

  @DomainDecoators.DebugMethod()
  private initial(key: string) {
    this._key = key;
    this._settings.set(new Map(this._defaultSetting));
  }

  @DomainDecoators.DebugMethod()
  public loadSetting(key: string): void {
    this.initial(key);

    const setting = localStorage.getItem(`${this._key}_settingInterface`);
    if (setting) {
      let loadSettings = new Map<BarNames, ISettingBar>();
      try {
        loadSettings = new Map(Object.entries<ISettingBar>(JSON.parse(setting)) as [BarNames, ISettingBar][]);
      } catch {}
      const newSetting = new Map(this.settings());
      for (const [key] of newSetting) {
        const loadSetting = loadSettings.get(key);
        if (loadSetting === undefined) {
          continue;
        }
        newSetting.set(key, loadSetting);
      }
      this._settings.set(newSetting);
    }
    this.saveSetting();
    this._isLoadSetting.set(true);
  }

  @DomainDecoators.DebugMethod()
  private saveSetting(): void {
    localStorage.setItem(`${this._key}_settingInterface`, JSON.stringify(Object.fromEntries(this.settings())));
  }
}
