import { DomainDecoators, DomainServices, DomainTokens } from '#domain';
import { injectStore, StoreHandler } from '@cqrs';
import { inject } from '@angular/core';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';
import { UserLogoutAction } from '../actions';

export class UserLogoutHandler extends StoreHandler<UserLogoutAction, void> {

  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler(): void {
    this._store.user.status.set(true, false);
    this._api.logout().subscribe({ next: this.success, error: this.error });
  }

  success = () => {
    this._logger?.info("UserLogoutHandler", `UserLogoutHandler() `, 'next => Ok');
    this._store.user.set(null);
    this._store.user.status.set(false, false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error = (error: any) => {
    this._logger?.warning("UserLogoutHandler", error);
    this._store.user.set(null);
    this._store.user.status.set(false, false);
  };

}
