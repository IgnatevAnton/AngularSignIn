import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { interval, Observable, of, take } from 'rxjs';
import { ISender } from '@cqrs';
import { DomainDecoators, DomainTokens, DomainInterface, DomainServices, RegistrationStatusErrors } from '#domain';

import { StatusRequest } from '../entities/StatusRequest';
import { SenderToken } from '../tokens';
import { IAuthorizeService } from './interface/IAuthorizeService';
import { UserCheckQuery, UserLoginCommand, UserLogoutCommand, UserRegistrationCommand, UserVerificationCommand } from '../requests/user';

@Injectable()
export class AuthorizationService implements IAuthorizeService {
  private _title = '_AuthorizationService';
  private _timeoutMillisecondCleanError = 2000;
  private _timeoutSecondRepeatCode = 60;

  private _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private _sender: ISender = inject(SenderToken);

  private _user$: WritableSignal<DomainInterface.IUser | null> = signal<DomainInterface.IUser | null>(null);
  private _isTimeoutRepeatSendCode$: WritableSignal<number> = signal(0);
  private _userCheckStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _userLoginStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _userRegistrationStatus = new StatusRequest<RegistrationStatusErrors[] | null>(this._timeoutMillisecondCleanError);
  private _userVerificationStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  get user$(): Signal<DomainInterface.IUser | null> {
    return this._user$.asReadonly();
  }

  get isTimeoutRepeatSendCode$(): Signal<number> {
    return this._isTimeoutRepeatSendCode$.asReadonly();
  }

  public isCheck$ = this._userCheckStatus.isLoading;
  public isLoadingLogin$ = this._userLoginStatus.isLoading;
  public isErrorLogin$ = this._userLoginStatus.isError;
  public isLoadingRegistration$ = this._userRegistrationStatus.isLoading;
  public isErrorRegistration$ = this._userRegistrationStatus.isErrorMessage;
  public isLoadingVerificationUser$ = this._userVerificationStatus.isLoading;
  public isErrorVerificationUser$ = this._userVerificationStatus.isError;

  @DomainDecoators.DebugMethod()
  check(): void {
    const response: Observable<DomainInterface.IUser | null> = this._sender.send(new UserCheckQuery()) ?? of(null);
    response.pipe(take(1)).subscribe({
      next: (user) => {
        this._logger?.info(this._title, 'check() ', 'next =>', user);
        this._user$.set(user);
        this._userCheckStatus.set(true, false, null);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._user$.set(null);
        this._userCheckStatus.set(true, false, null);
      },
    });
  }

  @DomainDecoators.DebugMethod()
  login(username: string, password: string): void {
    this._userLoginStatus.set(true, false, null);
    const response: Observable<DomainInterface.IUser | null> = this._sender.send(new UserLoginCommand(username, password)) ?? of(null);
    response.pipe(take(1)).subscribe({
      next: (user) => {
        this._logger?.info(this._title, 'login() ', 'next =>', user);
        this._user$.set(user);
        this._userLoginStatus.set(false, false, null);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._user$.set(null);
        this._userLoginStatus.set(false, true, null);
      },
    });
  }

  @DomainDecoators.DebugMethod()
  logout(): void {
    this._user$.set(null);
    this._sender.send(new UserLogoutCommand());
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): void {
    this._userRegistrationStatus.set(true, false, null);
    const allErrors = [RegistrationStatusErrors.EMAIL, RegistrationStatusErrors.PASSWORD, RegistrationStatusErrors.USER_NAME];
    const response: Observable<DomainInterface.IUserRegistrationStatus | null> = this._sender.send(new UserRegistrationCommand(data.login, data.email, data.password)) ?? of(null);
    response.pipe(take(1)).subscribe({
      next: (status: DomainInterface.IUserRegistrationStatus | null) => {
        this._logger?.info(this._title, 'registration() ', 'next =>', status);
        if (status === null) {
          this._userRegistrationStatus.set(false, true, allErrors);
          return;
        }
        if (status.status) {
          this._userRegistrationStatus.set(false, false, null);
          this.login(data.login, data.password);
        } else {
          this._userRegistrationStatus.set(false, true, status.errorNameFields);
        }
      },
      error: (error) => {
        this._userRegistrationStatus.set(false, true, allErrors);
        this._logger?.warning(this._title, error);
      },
    });
  }

  @DomainDecoators.DebugMethod()
  confirm(code: string): void {
    this._userVerificationStatus.set(true, false, null);
    const response: Observable<boolean | null> = this._sender.send(new UserVerificationCommand(code)) ?? of(null);
    response.pipe(take(1)).subscribe({
      next: (status: boolean | null) => {
        this._logger?.info(this._title, 'confirm() ', 'next =>', status);
        if (status === null) {
          this._userRegistrationStatus.set(false, true, null);
          return;
        }
        if (status) {
          this._userVerificationStatus.set(false, false, null);
          this.check();
        } else {
          this._userVerificationStatus.set(false, true, null);
        }
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._userVerificationStatus.set(false, true, null);
      },
    });
  }

  @DomainDecoators.DebugMethod()
  sendCode(): void {
    this._isTimeoutRepeatSendCode$.set(this._timeoutSecondRepeatCode);
    interval(1000)
      .pipe(take(this._timeoutSecondRepeatCode + 1))
      .subscribe((time) => {
        this._isTimeoutRepeatSendCode$.set(this._timeoutSecondRepeatCode - time);
      });
  }
}
