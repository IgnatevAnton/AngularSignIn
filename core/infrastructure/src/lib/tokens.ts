import { InjectionToken } from '@angular/core';
import { IPipelineBehevior, IUserResponse } from './interface';

export const URL_REST_API = new InjectionToken<string>('URL_REST_API');
export const PipelineUserTokens = new InjectionToken<IPipelineBehevior[]>('PiplineUserTokens');
export const FactoryUserResponseToken = new InjectionToken<() => IUserResponse>('FactoryUserResponseToken');
