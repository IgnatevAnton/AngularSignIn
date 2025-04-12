/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectStore, IStoreDispatcher, StoreHandler } from '@cqrs';
import { DomainDecoators, DomainInterface, DomainServices, DomainTokens } from '#domain';
import { inject } from '@angular/core';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';
import { UserLoginAction, UserValidateAction } from '../actions';

export class UserLoginHandler extends StoreHandler<UserLoginAction, DomainInterface.IUser | null> {

  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler(action: UserLoginAction, dispatcher: IStoreDispatcher) {
    this._store.user.set(null);
    this._store.user.status.set(true, false);
    this._api.login(action.username, action.password).subscribe({
      next: (data) => dispatcher.send(new UserValidateAction(data), this.success),
      error: (error) => this.error(error)
    });
  }

  success = (data: DomainInterface.IUser | null) => {
    this._logger?.info("UserLoginHandler", `UserLoginHandler() `, 'next =>', data);
    if (data === null) { this.error(`error in implemented UserLoginHandler`); return; }
    this._store.user.set(data);
    this._store.user.status.set(false, false);
  };

  error = (error: any) => {
    this._logger?.warning("UserLoginHandler", error);
    this._store.user.set(null);
    this._store.user.status.set(false, true);
  };


}
