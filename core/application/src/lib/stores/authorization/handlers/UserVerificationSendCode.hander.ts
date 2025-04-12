import { inject } from '@angular/core';
import { interval, take } from 'rxjs';
import { injectStore, StoreHandler } from '@cqrs';
import { UserVerificationSendCodeAction } from '../actions';
import { DomainDecoators, DomainServices, DomainTokens } from '#domain';
import { AUTHORIZATION_STORE, USER_REPOSITORY_TOKEN } from '../../../tokens';

export class UserVerificationSendCodeHandler extends StoreHandler<UserVerificationSendCodeAction, boolean> {

  private readonly _timeoutSecondRepeatCode = 60;
  private readonly _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private readonly _api = inject(USER_REPOSITORY_TOKEN);

  private readonly _store = injectStore(AUTHORIZATION_STORE, true);

  @DomainDecoators.DebugMethod()
  override handler() {
    this._logger?.info("UserVerificationSendCodeHandler", `UserVerificationSendCodeHandler() `, 'next =>', this._timeoutSecondRepeatCode);
    this._store.timeoutRepeatSendCode.set(this._timeoutSecondRepeatCode);
    interval(1000)
      .pipe(take(this._timeoutSecondRepeatCode + 1))
      .subscribe((time) => {
        this._store.timeoutRepeatSendCode.set(this._timeoutSecondRepeatCode - time);
      });
  }

}
