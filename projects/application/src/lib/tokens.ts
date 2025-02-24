import { InjectionToken } from "@angular/core";
import { ISettingBar } from "./interface";
import { IAuthorizeService, IFollowersRepository, IFollowersService, ISettingInterfaceService, IUserRepository } from "./services";

export const URL_REST_API = new InjectionToken<string>("URL_REST_API");

export const DefaultSettingBarsToken = new InjectionToken<ISettingBar>("SettingsBarToken");
export const AuthorizationServiceToken = new InjectionToken<IAuthorizeService>('AuthorizationServiceToken');
export const FollowersServiceToken = new InjectionToken<IFollowersService>("FollowersServiceToken");
export const FollowersRepositoryToken = new InjectionToken<IFollowersRepository>("FollowersRepositoryToken");
export const UserRepositoryToken = new InjectionToken<IUserRepository>("UserRepositoryToken");
export const SettingInterfaceServiceToken = new InjectionToken<ISettingInterfaceService>("SettingInterfaceServiceToken");

