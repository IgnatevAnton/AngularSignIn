import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { DomainDecoators, DomainTokens, DomainInterface, DomainServices, RegistrationStatusErrors } from '@domain';
import { ApplicationTokens, IAuthorizeService, IUserRepository } from '@application';


@Injectable()
export class AuthorizationServiceHttpClient implements IAuthorizeService {

  private _title: string = "_AuthorizationServiceHttpClient";
  private _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private _repository: IUserRepository = inject(ApplicationTokens.UserRepositoryToken);

  private _user$: WritableSignal<DomainInterface.IUser | null> = signal<DomainInterface.IUser | null>(null);
  private _isCheck$: WritableSignal<boolean> = signal<boolean>(false);
  private _isLoadingLogin$: WritableSignal<boolean> = signal<boolean>(false);
  private _isErrorLogin$: WritableSignal<boolean> = signal<boolean>(false);

  private _isLoadingRegistration$: WritableSignal<boolean> = signal<boolean>(false);
  private _isErrorRegistration$: WritableSignal<RegistrationStatusErrors[]> = signal<RegistrationStatusErrors[]>([]);

  get user$(): Signal<DomainInterface.IUser | null> { return this._user$.asReadonly(); }

  get isCheck$(): Signal<boolean> { return this._isCheck$.asReadonly(); }

  get isLoadingLogin$(): Signal<boolean> { return this._isLoadingLogin$.asReadonly(); }
  get isErrorLogin$(): Signal<boolean> { return this._isErrorLogin$.asReadonly(); }

  get isLoadingRegistration$(): Signal<boolean> { return this._isLoadingRegistration$.asReadonly(); }
  get isErrorRegistration$(): Signal<RegistrationStatusErrors[]> { return this._isErrorRegistration$.asReadonly(); }


  @DomainDecoators.DebugMethod()
  check(): void {
    this._repository.check().subscribe({
      next: (user) => {
        this._logger?.info(this._title, "check() ", "next =>", user);
        this._user$.set(user);
        this._isCheck$.set(true);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._user$.set(null);
        this._isCheck$.set(true);
      }
    });
  }

  @DomainDecoators.DebugMethod()
  login(username: string, password: string): void {
    this._isLoadingLogin$.set(true);
    this._repository.login(username, password).subscribe({
      next: (user) => {
        this._logger?.info(this._title, "login() ", "next =>", user);
        this._user$.set(user);
        this._isLoadingLogin$.set(false);
        this._isCheck$.set(true);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._user$.set(null);
        this._isLoadingLogin$.set(false);
        this._isErrorLogin$.set(true);
        setTimeout(() => { this._isErrorLogin$.set(false); }, 2000);
      }
    })
  }

  @DomainDecoators.DebugMethod()
  logout(user: DomainInterface.IUser): void {
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): void {
    this._isLoadingRegistration$.set(true);
    this._repository.registration(data).subscribe({
      next: (status: DomainInterface.IUserRegistrationStatus) => {
        this._logger?.info(this._title, "registration() ", "next =>", status);
        if (status.status) {
          this.login(data.name, data.password);
        } else {
          this._isLoadingRegistration$.set(false);
          this._isErrorRegistration$.set(status.errorNameFields);
          setTimeout(() => { this._isErrorRegistration$.set([]); }, 2000);
        }
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._isLoadingRegistration$.set(false);
      }
    });
  }

  @DomainDecoators.DebugMethod()
  confirmEmail(code: number): void {
    throw new Error('Method not implemented.');
  }

}


