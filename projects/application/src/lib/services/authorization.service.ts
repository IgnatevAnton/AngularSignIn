import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { interval, take } from 'rxjs';
import { DomainDecoators, DomainTokens, DomainInterface, DomainServices, RegistrationStatusErrors } from '#domain';
import { IAuthorizeService } from './interface/IAuthorizeService';
import { IUserRepository } from './interface/IUserRepository';
import { UserRepositoryToken } from '../tokens';

@Injectable()
export class AuthorizationService implements IAuthorizeService {
  private _title = '_AuthorizationService';
  private _timeoutMillisecondCleanError = 2000;
  private _timeoutSecondRepeatCode = 60;

  private _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, {
    optional: true,
  });
  private _repository: IUserRepository = inject(UserRepositoryToken);

  private _user$: WritableSignal<DomainInterface.IUser | null> = signal<DomainInterface.IUser | null>(null);
  private _isCheck$: WritableSignal<boolean> = signal<boolean>(false);
  private _isLoadingLogin$: WritableSignal<boolean> = signal<boolean>(false);
  private _isErrorLogin$: WritableSignal<boolean> = signal<boolean>(false);

  private _isLoadingRegistration$: WritableSignal<boolean> = signal<boolean>(false);
  private _isErrorRegistration$: WritableSignal<RegistrationStatusErrors[]> = signal<RegistrationStatusErrors[]>([]);

  private _isLoadingVerificationUser$: WritableSignal<boolean> = signal(false);
  private _isErrorVerificationUser$: WritableSignal<boolean> = signal(false);
  private _isTimeoutRepeatSendCode$: WritableSignal<number> = signal(0);

  get user$(): Signal<DomainInterface.IUser | null> {
    return this._user$.asReadonly();
  }

  get isCheck$(): Signal<boolean> {
    return this._isCheck$.asReadonly();
  }

  get isLoadingLogin$(): Signal<boolean> {
    return this._isLoadingLogin$.asReadonly();
  }
  get isErrorLogin$(): Signal<boolean> {
    return this._isErrorLogin$.asReadonly();
  }

  get isLoadingRegistration$(): Signal<boolean> {
    return this._isLoadingRegistration$.asReadonly();
  }
  get isErrorRegistration$(): Signal<RegistrationStatusErrors[]> {
    return this._isErrorRegistration$.asReadonly();
  }

  get isLoadingVerificationUser$(): Signal<boolean> {
    return this._isLoadingVerificationUser$.asReadonly();
  }
  get isErrorVerificationUser$(): Signal<boolean> {
    return this._isErrorVerificationUser$.asReadonly();
  }

  get isTimeoutRepeatSendCode$(): Signal<number> {
    return this._isTimeoutRepeatSendCode$.asReadonly();
  }

  @DomainDecoators.DebugMethod()
  check(): void {
    this._repository
      .check()
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this._logger?.info(this._title, 'check() ', 'next =>', user);
          this._user$.set(user);
          this._isCheck$.set(true);
        },
        error: (error) => {
          this._logger?.warning(this._title, error);
          this._user$.set(null);
          this._isCheck$.set(true);
        },
      });
  }

  @DomainDecoators.DebugMethod()
  login(username: string, password: string): void {
    this._isLoadingLogin$.set(true);
    this._repository
      .login(username, password)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this._logger?.info(this._title, 'login() ', 'next =>', user);
          this._user$.set(user);
          this._isLoadingLogin$.set(false);
          this._isErrorLogin$.set(false);
        },
        error: (error) => {
          this._logger?.warning(this._title, error);
          this._user$.set(null);
          this._isLoadingLogin$.set(false);
          this._isErrorLogin$.set(true);
          setTimeout(() => {
            this._isErrorLogin$.set(false);
          }, this._timeoutMillisecondCleanError);
        },
      });
  }

  @DomainDecoators.DebugMethod()
  logout(): void {
    this._user$.set(null);
    this._repository.logout();
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): void {
    this._isLoadingRegistration$.set(true);
    this._repository
      .registration(data)
      .pipe(take(1))
      .subscribe({
        next: (status: DomainInterface.IUserRegistrationStatus) => {
          this._logger?.info(this._title, 'registration() ', 'next =>', status);
          this._isLoadingRegistration$.set(false);
          if (status.status) {
            this._isErrorRegistration$.set([]);
            this.login(data.login, data.password);
          } else {
            this._isErrorRegistration$.set(status.errorNameFields);
            setTimeout(() => {
              this._isErrorRegistration$.set([]);
            }, this._timeoutMillisecondCleanError);
          }
        },
        error: (error) => {
          this._isLoadingRegistration$.set(false);
          this._isErrorRegistration$.set([
            RegistrationStatusErrors.EMAIL,
            RegistrationStatusErrors.PASSWORD,
            RegistrationStatusErrors.USER_NAME,
          ]);
          setTimeout(() => {
            this._isErrorRegistration$.set([]);
          }, this._timeoutMillisecondCleanError);
          this._logger?.warning(this._title, error);
        },
      });
  }

  @DomainDecoators.DebugMethod()
  confirm(code: string): void {
    this._isLoadingVerificationUser$.set(true);
    this._repository
      .confirm(code)
      .pipe(take(1))
      .subscribe({
        next: (status: boolean) => {
          this._logger?.info(this._title, 'confirm() ', 'next =>', status);
          this._isLoadingVerificationUser$.set(false);
          if (status) {
            this._isErrorVerificationUser$.set(false);
            this.check();
          } else {
            this._isErrorVerificationUser$.set(true);
            setTimeout(() => {
              this._isErrorVerificationUser$.set(false);
            }, this._timeoutMillisecondCleanError);
          }
        },
        error: (error) => {
          this._logger?.warning(this._title, error);
          this._isLoadingVerificationUser$.set(false);
          this._isErrorVerificationUser$.set(true);
          setTimeout(() => {
            this._isErrorVerificationUser$.set(false);
          }, this._timeoutMillisecondCleanError);
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
