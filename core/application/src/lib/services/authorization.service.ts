import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { interval, take } from 'rxjs';
import { DomainDecoators, DomainInterface, RegistrationStatusErrors } from '#domain';
import { IAuthorizeService } from './interface/IAuthorizeService';
import { UserCheckQuery, UserLoginCommand, UserLogoutCommand, UserRegistrationCommand, UserVerificationCommand } from '../requests/user';
import { BaseService, StatusRequest } from '../entities';

@Injectable()
export class AuthorizationService extends BaseService implements IAuthorizeService {
  private _timeoutSecondRepeatCode = 60;
  private _user: WritableSignal<DomainInterface.IUser | null> = signal<DomainInterface.IUser | null>(null);
  private _isTimeoutRepeatSendCode: WritableSignal<number> = signal(0);
  private _userCheckStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _userLoginStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _userRegistrationStatus = new StatusRequest<RegistrationStatusErrors[] | null>(this._timeoutMillisecondCleanError);
  private _userVerificationStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  get user(): Signal<DomainInterface.IUser | null> {
    return this._user.asReadonly();
  }

  get isTimeoutRepeatSendCode(): Signal<number> {
    return this._isTimeoutRepeatSendCode.asReadonly();
  }

  public isCheck = this._userCheckStatus.isLoading;
  public isLoadingLogin = this._userLoginStatus.isLoading;
  public isErrorLogin = this._userLoginStatus.isError;
  public isLoadingRegistration = this._userRegistrationStatus.isLoading;
  public isErrorRegistration = this._userRegistrationStatus.isErrorMessage;
  public isLoadingVerificationUser = this._userVerificationStatus.isLoading;
  public isErrorVerificationUser = this._userVerificationStatus.isError;

  constructor() {
    super('_AuthorizationService');
  }

  @DomainDecoators.DebugMethod()
  check(): void {
    const request = new UserCheckQuery();
    const callbackSuccess = (value: DomainInterface.IUser) => {
      this._user.set(value);
      this._userCheckStatus.set(true, false, null);
    };
    const callbackError = () => {
      this._user.set(null);
      this._userCheckStatus.set(true, false, null);
    };
    this.handlerResponseObservable('check', request, undefined, undefined, callbackSuccess, callbackError);
  }

  @DomainDecoators.DebugMethod()
  login(username: string, password: string): void {
    const request = new UserLoginCommand(username, password);
    const callbackSuccess = (value: DomainInterface.IUser) => this._user.set(value);
    const callbackError = () => this._user.set(null);
    this.handlerResponseObservable('login', request, this._userLoginStatus, undefined, callbackSuccess, callbackError);
  }

  @DomainDecoators.DebugMethod()
  logout(): void {
    this._user.set(null);
    this.handlerResponseObservable('logout', new UserLogoutCommand());
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): void {
    const allErrors = [RegistrationStatusErrors.EMAIL, RegistrationStatusErrors.PASSWORD, RegistrationStatusErrors.USER_NAME];
    const request = new UserRegistrationCommand(data.login, data.email, data.password);
    const callbackSuccess = (value: DomainInterface.IUserRegistrationStatus) => {
      if (!value.status) {
        this._userRegistrationStatus.set(false, true, value.errorNameFields);
        return;
      }
      this._userRegistrationStatus.set(false, false, null);
      this.login(data.login, data.password);
    };
    this.handlerResponseObservable('registration', request, this._userRegistrationStatus, null, callbackSuccess, undefined, allErrors);
  }

  @DomainDecoators.DebugMethod()
  confirm(code: string): void {
    const request = new UserVerificationCommand(code);
    const callbackSuccess = () => this.check();
    this.handlerResponseObservable('confirm', request, this._userVerificationStatus, false, callbackSuccess);
  }

  @DomainDecoators.DebugMethod()
  sendCode(): void {
    this._isTimeoutRepeatSendCode.set(this._timeoutSecondRepeatCode);
    interval(1000)
      .pipe(take(this._timeoutSecondRepeatCode + 1))
      .subscribe((time) => {
        this._isTimeoutRepeatSendCode.set(this._timeoutSecondRepeatCode - time);
      });
  }
}
