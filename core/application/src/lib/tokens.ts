import { InjectionToken } from '@angular/core';
import { ICommand, IQuery, IRequestHandlerToken, ISender } from '@cqrs';
import { ISettingBar, IUserRepository } from './interface';
import { IAuthorizeService, IAuthorizeServiceStore, IFollowersService, ISettingInterfaceService } from './services';
import { IAuthorizationStore } from './stores/authorization/interfaces/IAuthorizationStore';

export const DefaultSettingBarsToken = new InjectionToken<ISettingBar>('SettingsBarToken');
export const AuthorizationServiceToken = new InjectionToken<IAuthorizeService>('AuthorizationServiceToken');
export const FollowersServiceToken = new InjectionToken<IFollowersService>('FollowersServiceToken');
export const SettingInterfaceServiceToken = new InjectionToken<ISettingInterfaceService>('SettingInterfaceServiceToken');

export const SenderToken = new InjectionToken<ISender>('SenderToken');
export const HandlersToken = new InjectionToken<Map<IQuery | ICommand, IRequestHandlerToken>>('HandlersToken');

export const AUTHORIZATION_SERVICE_STORE_TOKEN = new InjectionToken<IAuthorizeServiceStore>('AuthorizeServiceStore');

export const USER_REPOSITORY_TOKEN = new InjectionToken<IUserRepository>("USER_REPOSITORY_TOKEN");


export const AUTHORIZATION_STORE = new InjectionToken<IAuthorizationStore>("AUTHORIZATION_STORE");


