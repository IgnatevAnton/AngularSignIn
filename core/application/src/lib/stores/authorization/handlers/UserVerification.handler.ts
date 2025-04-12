import { inject } from '@angular/core';
import { injectStore, IStoreDispatcher, StoreHandler } from '@cqrs';
import { DomainDecoators, DomainServices, DomainTokens } from '#domain';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';
import { UserCheckAction, UserVerificationAction } from '../actions';

export class UserVerificationHandler extends StoreHandler<UserVerificationAction, void> {

  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler(action: UserVerificationAction, dispatcher: IStoreDispatcher): void {
    this._store.timeoutRepeatSendCode.status.set(true, false);
    this._api.verification(action.code).subscribe({ next: () => this.success(dispatcher), error: this.error });
  }

  success = (dispatcher: IStoreDispatcher) => {
    this._logger?.info("UserVerificationHandler", `UserVerificationHandler() `, 'next => ok', true);
    this._store.timeoutRepeatSendCode.status.set(false, false);
    dispatcher.send(new UserCheckAction());
  };

  error = (error: any) => {
    this._logger?.warning("UserRegistrationHandler2", error);
    this._store.timeoutRepeatSendCode.status.set(false, true);
  };

}
