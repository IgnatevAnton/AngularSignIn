import { NgModule } from '@angular/core';
import { ICommandToken, IQueryHandlerToken, IQueryToken } from '@cqrs';
import { ApplicationTokens } from '#application';
import { UserResponse } from './entities/UserResponse';
import {
  MappingUser,
  UserCheckHandler,
  UserCheckQuery,
  UserGroupFollowersHandler,
  UserGroupFollowersQuery,
  UserLoginCommand,
  UserLoginHandler,
  UserLogoutCommand,
  UserLogoutHandler,
  UserRegistrationCommand,
  UserRegistrationHandler,
  UserVerificationCommand,
  UserVerifivationHandler,
  ValidateUser,
} from './repository';
import { AuthorizationService, FollowersService, SenderService, SettingInterfaceLocalStorageService } from './service';
import { FactoryUserResponseToken, HandlersToken, PipelineUserTokens, SenderToken } from './tokens';

@NgModule({
  providers: [
    { provide: FactoryUserResponseToken, useValue: () => new UserResponse() },

    { provide: ApplicationTokens.AuthorizationServiceToken, useClass: AuthorizationService },
    { provide: ApplicationTokens.SettingInterfaceServiceToken, useClass: SettingInterfaceLocalStorageService },
    { provide: ApplicationTokens.FollowersServiceToken, useClass: FollowersService },
    { provide: SenderToken, useClass: SenderService },
    {
      provide: HandlersToken,
      useFactory: () =>
        new Map<IQueryToken | ICommandToken, IQueryHandlerToken>([
          [UserCheckQuery, new UserCheckHandler()],
          [UserLoginCommand, new UserLoginHandler()],
          [UserLogoutCommand, new UserLogoutHandler()],
          [UserRegistrationCommand, new UserRegistrationHandler()],
          [UserVerificationCommand, new UserVerifivationHandler()],
          [UserGroupFollowersQuery, new UserGroupFollowersHandler()],
        ]),
    },
    { provide: PipelineUserTokens, useClass: ValidateUser, multi: true },
    { provide: PipelineUserTokens, useClass: MappingUser, multi: true },
  ],
})
export class InfrastructureModule {}
