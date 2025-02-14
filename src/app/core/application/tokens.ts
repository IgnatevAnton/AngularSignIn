import { InjectionToken } from "@angular/core";
import { ApplicationInterfaces, ApplicationServices } from "@application";

export const URL_REST_API = new InjectionToken<string>("URL_REST_API");
export const AuthorizationServiceToken = new InjectionToken<ApplicationServices.IAuthorizeService>('AuthorizationServiceToken');
export const UserRepositoryToken = new InjectionToken<ApplicationInterfaces.IUserRepository>("UserRepositoryToken")
