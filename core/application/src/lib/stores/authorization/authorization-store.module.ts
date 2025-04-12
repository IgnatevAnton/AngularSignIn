import { NgModule } from '@angular/core';
import { configurationStore, registrationHandlers } from '@cqrs';
import { IAuthorizationStore } from './interfaces/IAuthorizationStore';
import { AUTHORIZATION_STORE } from '../../tokens';
import { authorizationStoreDefault } from './authorization.store.default';
import {
  UserCheckAction,
  UserLoginAction,
  UserLogoutAction,
  UserMappingAction,
  UserRegistrationAction,
  UserValidateAction,
  UserVerificationAction,
  UserVerificationSendCodeAction,
} from './actions';
import {
  UserCheckHandler,
  UserLoginHandler,
  UserLogoutHandler,
  UserMappingHandler,
  UserRegistrationHandler,
  UserValidateHandler,
  UserVerificationHandler
} from './handlers';
import { UserVerificationSendCodeHandler } from './handlers/UserVerificationSendCode.hander';


@NgModule({
  providers: [
    configurationStore<IAuthorizationStore>(
      AUTHORIZATION_STORE,
      authorizationStoreDefault
    ),
    registrationHandlers(
      [UserCheckAction, UserCheckHandler],
      [UserLoginAction, UserLoginHandler],
      [UserLogoutAction, UserLogoutHandler],
      [UserValidateAction, UserValidateHandler],
      [UserMappingAction, UserMappingHandler],
      [UserRegistrationAction, UserRegistrationHandler],
      [UserVerificationAction, UserVerificationHandler],
      [UserVerificationSendCodeAction, UserVerificationSendCodeHandler]
    )
  ]
})
export class AuthorizationStoreModule { }
