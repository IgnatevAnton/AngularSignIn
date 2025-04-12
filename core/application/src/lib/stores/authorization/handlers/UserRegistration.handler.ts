import { inject } from '@angular/core';
import { injectStore, IStoreDispatcher, StoreHandler } from '@cqrs';
import { DomainDecoators, DomainInterface, DomainServices, DomainTokens, RegistrationStatusErrors } from '#domain';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';
import { UserCheckAction, UserRegistrationAction } from '../actions';

export class UserRegistrationHandler extends StoreHandler<UserRegistrationAction, DomainInterface.IUserRegistrationStatus> {

  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler(action: UserRegistrationAction, dispatcher: IStoreDispatcher) {
    this._store.registrationStatus.set(null);
    this._store.registrationStatus.status.set(true, false);
    this._api.registration(action.login, action.email, action.password).subscribe({
      next: (data: DomainInterface.IUserRegistrationStatus) => {
        if (!data.status) {
          this.errorData(data);
        } else {
          this.success(data);
          dispatcher.send(new UserCheckAction());
        }
      },
      error: this.errorNetwork
    });
  }

  success = (data: DomainInterface.IUserRegistrationStatus) => {
    this._logger?.info("UserRegistrationHandler", `UserRegistrationHandler() `, 'next =>', data);
    if (data.status) {
      this._store.registrationStatus.set(null);
      this._store.registrationStatus.status.set(false, false);
    }
  };

  errorData = (data: DomainInterface.IUserRegistrationStatus) => {
    this._logger?.info("UserRegistrationHandler", `UserRegistrationHandler() `, 'next =>', data);
    if (!data.status) {
      this._store.registrationStatus.set(data);
      this._store.registrationStatus.status.set(false, true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorNetwork = (error: any) => {
    this._logger?.warning("UserRegistrationHandler2", error);
    const allErrors = [RegistrationStatusErrors.EMAIL, RegistrationStatusErrors.PASSWORD, RegistrationStatusErrors.USER_NAME];
    this._store.registrationStatus.set({ status: false, errorNameFields: allErrors });
    this._store.registrationStatus.status.set(false, true);
  };


}
