import { InjectionToken } from '@angular/core';
import { ILoggerService } from './services/interface/ILoggerService';
import { IUserRegistration } from './interface/IUserRegistration';
import { IUser } from './interface/IUser';

export const LoggerServiceInfoToken = new InjectionToken<ILoggerService>('LoggerServiceInfoToken');
export const LoggerServiceDebugToken = new InjectionToken<ILoggerService>('LoggerServiceDebugToken');
export const LoggerTimeThreshold = new InjectionToken<number>('LoggerTimeThreshold');
export const FactoryUserRegistrationToken = new InjectionToken<() => IUserRegistration>('UserRegistrationToken');
export const FactoryUserToken = new InjectionToken<() => IUser>('FactoryUserToken');
