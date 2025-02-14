import { InjectionToken } from "@angular/core";
import { DomainInterface, DomainServices } from "@domain";

export const LoggerServiceInfoToken = new InjectionToken<DomainServices.ILoggerService>("LoggerServiceInfoToken");
export const LoggerServiceDebugToken = new InjectionToken<DomainServices.ILoggerService>("LoggerServiceDebugToken");
export const LoggerTimeThreshold = new InjectionToken<number>("LoggerTimeThreshold");
export const FactoryUserRegistrationToken = new InjectionToken<() => DomainInterface.IUserRegistration>("UserRegistrationToken");
export const FactoryUserToken = new InjectionToken<() => DomainInterface.IUser>("FactoryUserToken");
