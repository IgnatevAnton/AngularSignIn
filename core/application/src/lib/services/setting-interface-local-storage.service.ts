import { inject, Inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ISender } from '@cqrs';
import { DomainDecoators } from '#domain';
import { ISettingInterfaceService } from './interface/ISettingInterfaceService';
import { BarNames } from '../constant/BarNames';
import { ISettingBar } from '../interface';
import { DefaultSettingBarsToken, SenderToken } from '../tokens';
import { SettingSaveDataCommand, UpdateSettingFromLoadDataCommand } from '../requests/setting';


@Injectable()
export class SettingInterfaceLocalStorageService implements ISettingInterfaceService {
  private _sender: ISender = inject(SenderToken);
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

  constructor(
    @Inject(DefaultSettingBarsToken) defaultSettings: Map<BarNames, ISettingBar>
  ) {
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
    const command = new UpdateSettingFromLoadDataCommand(`${this._key}_settingInterface`, this.settings());
    const updateSetting: Map<BarNames, ISettingBar> | null = this._sender.send(command) ?? null;
    if (updateSetting !== null) { this._settings.set(updateSetting); }
    this.saveSetting();
    this._isLoadSetting.set(true);
  }

  @DomainDecoators.DebugMethod()
  private saveSetting(): boolean {
    return this._sender.send(new SettingSaveDataCommand(`${this._key}_settingInterface`, this.settings())) ?? false;
  }

}
