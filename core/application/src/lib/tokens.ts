import { InjectionToken } from '@angular/core';
import { ISettingBar } from './interface';
import { IAuthorizeService, IFollowersService, ISettingInterfaceService } from './services';

export const URL_REST_API = new InjectionToken<string>('URL_REST_API');

export const DefaultSettingBarsToken = new InjectionToken<ISettingBar>('SettingsBarToken');
export const AuthorizationServiceToken = new InjectionToken<IAuthorizeService>('AuthorizationServiceToken');
export const FollowersServiceToken = new InjectionToken<IFollowersService>('FollowersServiceToken');
export const SettingInterfaceServiceToken = new InjectionToken<ISettingInterfaceService>(
  'SettingInterfaceServiceToken'
);
