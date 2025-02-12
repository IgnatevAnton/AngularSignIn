import { InjectionToken } from "@angular/core";
import { IAuthorizeService, IUserRepository } from "@application";

export const URL_REST_API = new InjectionToken<string>("URL_REST_API");
export const AuthorizationServiceToken = new InjectionToken<IAuthorizeService>('AuthorizationServiceToken');
export const UserRepositoryToken = new InjectionToken<IUserRepository>("UserRepositoryToken")
