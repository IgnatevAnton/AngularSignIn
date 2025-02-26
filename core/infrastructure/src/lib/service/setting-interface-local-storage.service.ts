import { Inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { DomainDecoators } from '#domain';
import { ApplicationInterfaces, ApplicationServices, ApplicationTokens, BarNames } from '#application';

@Injectable()
export class SettingInterfaceLocalStorageService implements ApplicationServices.ISettingInterfaceService {
  private _defaultSetting = new Map<BarNames, ApplicationInterfaces.ISettingBar>();
  private _settings: WritableSignal<Map<BarNames, ApplicationInterfaces.ISettingBar>> = signal(new Map());
  private _isLoadSetting: WritableSignal<boolean> = signal(false);
  private _key = '';
  get settings(): Signal<Map<BarNames, ApplicationInterfaces.ISettingBar>> {
    return this._settings.asReadonly();
  }
  get isLoadSetting(): Signal<boolean> {
    return this._isLoadSetting.asReadonly();
  }

  constructor(
    @Inject(ApplicationTokens.DefaultSettingBarsToken) defaultSettings: Map<BarNames, ApplicationInterfaces.ISettingBar>
  ) {
    this._defaultSetting = defaultSettings;
    this._settings.set(new Map(this._defaultSetting));
  }

  @DomainDecoators.DebugMethod()
  public setSettingBar(name: BarNames, settingBar: ApplicationInterfaces.ISettingBar): void {
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
      let loadSettings = new Map<BarNames, ApplicationInterfaces.ISettingBar>();
      try {
        loadSettings = new Map(
          Object.entries<ApplicationInterfaces.ISettingBar>(JSON.parse(setting)) as [
            BarNames,
            ApplicationInterfaces.ISettingBar,
          ][]
        );
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
