import { InjectionToken } from '@angular/core';
import { ICommandToken, IQueryHandlerToken, IQueryToken, ISender } from '@cqrs';
import { ISettingBar } from './interface';
import { IAuthorizeService, IFollowersService, ISettingInterfaceService } from './services';

export const DefaultSettingBarsToken = new InjectionToken<ISettingBar>('SettingsBarToken');
export const AuthorizationServiceToken = new InjectionToken<IAuthorizeService>('AuthorizationServiceToken');
export const FollowersServiceToken = new InjectionToken<IFollowersService>('FollowersServiceToken');
export const SettingInterfaceServiceToken = new InjectionToken<ISettingInterfaceService>('SettingInterfaceServiceToken');
export const SenderToken = new InjectionToken<ISender>('SenderToken');
export const HandlersToken = new InjectionToken<Map<IQueryToken | ICommandToken, IQueryHandlerToken>>('HandlersToken');
