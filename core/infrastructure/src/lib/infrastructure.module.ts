import { Inject, NgModule } from '@angular/core';
import { ICommandToken, IQueryHandlerToken, IQueryToken } from '@cqrs';
import { DomainInterface, DomainTokens } from '#domain';
import { ApplicationTokens, ApplicationRequest } from '#application';

import { UserResponse } from './entities/UserResponse';
import { MappingUser, UserCheckHandler, UserLoginHandler, UserLogoutHandler, UserRegistrationHandler, UserVerifivationHandler, ValidateUser } from './repository/user';
import { UserGroupFollowersHandler } from './repository/followers';

import { FactoryUserResponseToken, PipelineUserTokens, URL_REST_API } from './tokens';

import { IPipelineBehevior, IUserResponse } from './interface';
import { InfrastructureContainerForDecorator } from './entities/ContainerForDecorator';

@NgModule({
  providers: [
    { provide: URL_REST_API, useValue: 'https://localhost:7069/' },
    { provide: FactoryUserResponseToken, useValue: () => new UserResponse() },
    {
      provide: ApplicationTokens.HandlersToken,
      useFactory: () =>
        new Map<IQueryToken | ICommandToken, IQueryHandlerToken>([
          [ApplicationRequest.user.UserCheckQuery, new UserCheckHandler()],
          [ApplicationRequest.user.UserLoginCommand, new UserLoginHandler()],
          [ApplicationRequest.user.UserLogoutCommand, new UserLogoutHandler()],
          [ApplicationRequest.user.UserRegistrationCommand, new UserRegistrationHandler()],
          [ApplicationRequest.user.UserVerificationCommand, new UserVerifivationHandler()],
          [ApplicationRequest.followers.UserGroupFollowersQuery, new UserGroupFollowersHandler()],
        ]),
    },
    { provide: PipelineUserTokens, useClass: ValidateUser, multi: true },
    { provide: PipelineUserTokens, useClass: MappingUser, multi: true },
  ],
})
export class InfrastructureModule {
  constructor(
    @Inject(PipelineUserTokens) userPipline: IPipelineBehevior[],
    @Inject(DomainTokens.FactoryUserToken) factoryUser: () => DomainInterface.IUser,
    @Inject(FactoryUserResponseToken) factoryUserResponse: () => IUserResponse
  ) {
    console.log('intital InfrastructureContainerForDecorator');
    InfrastructureContainerForDecorator.set(DomainTokens.FactoryUserToken, factoryUser);
    InfrastructureContainerForDecorator.set(FactoryUserResponseToken, factoryUserResponse);
    const conatianer = [];
    for (const behevior of userPipline) {
      conatianer.push(behevior);
    }
    InfrastructureContainerForDecorator.set(PipelineUserTokens, conatianer);
  }
}
