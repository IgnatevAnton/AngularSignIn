import { DomainDecoators, DomainInterface, DomainServices, DomainTokens } from '#domain';
import { injectStore, IStoreDispatcher, StoreHandler } from '@cqrs';
import { inject } from '@angular/core';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';
import { UserCheckAction, UserValidateAction } from '../actions';


export class UserCheckHandler extends StoreHandler<UserCheckAction, DomainInterface.IUser | null> {

  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler( action: UserCheckAction, dispatcher: IStoreDispatcher): void {
    this._store.isCheckUser.status.set(true, false);
    this._api.check().subscribe({
      next: (data) => dispatcher.send(new UserValidateAction(data), this.success),
      error: (error) => this.error(error)
    });
  }

  private success = (data: DomainInterface.IUser | null) => {
    this._logger?.info("UserCheckHandler", `UserCheckHandler() `, 'next =>', data);

    this._store.user.set(data);
    this._store.isCheckUser.set(true);
    this._store.isCheckUser.status.set(false, false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private error = (error: any) => {
    this._logger?.warning("UserCheckHandler", error);
    this._store.user.set(null);
    this._store.isCheckUser.set(true);
    this._store.isCheckUser.status.set(false, false);
  };

}
