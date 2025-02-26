import { InjectionToken } from '@angular/core';
import { IPipelineBehevior, IUserResponse } from './interface';
import { ICommandToken, IQueryHandlerToken, IQueryToken, ISender } from '@cqrs';

export const PipelineUserTokens = new InjectionToken<IPipelineBehevior[]>('PiplineUserTokens');
export const FactoryUserResponseToken = new InjectionToken<() => IUserResponse>('FactoryUserResponseToken');
export const SenderToken = new InjectionToken<ISender>('SenderToken');
export const HandlersToken = new InjectionToken<Map<IQueryToken | ICommandToken, IQueryHandlerToken>>(
  'SenderMappingToken'
);
