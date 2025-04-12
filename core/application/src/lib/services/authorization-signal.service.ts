import { inject, Injectable, Signal } from '@angular/core';
import { IAuthorizeService } from './interface/IAuthorizeService';
import { RegistrationStatusErrors } from '#domain';
import { IUser } from 'dist/domain/lib/interface';
import { IAuthorizeServiceStore } from './interface/IAuthorizeServiceStore';
import { AUTHORIZATION_SERVICE_STORE_TOKEN } from '../tokens';

@Injectable()
export class AuthorizationSignalService implements IAuthorizeService {

  private readonly _authorizeServiceStore: IAuthorizeServiceStore = inject(AUTHORIZATION_SERVICE_STORE_TOKEN);

  user: Signal<IUser | null>;
  isCheck: Signal<boolean>;
  isLoadingLogin: Signal<boolean>;
  isErrorLogin: Signal<boolean>;
  isErrorRegistration: Signal<RegistrationStatusErrors[] | null>;
  isLoadingRegistration: Signal<boolean>;
  isLoadingVerificationUser: Signal<boolean>;
  isErrorVerificationUser: Signal<boolean>;
  isTimeoutRepeatSendCode: Signal<number>;

  constructor() {
    this.user = this._authorizeServiceStore.user.asReadonly();
    this.isCheck = this._authorizeServiceStore.userCheckStatus.isLoading;
    this.isLoadingLogin = this._authorizeServiceStore.userLoginStatus.isLoading;
    this.isErrorLogin = this._authorizeServiceStore.userLoginStatus.isError;

    this.isLoadingRegistration = this._authorizeServiceStore.userRegistrationStatus.isLoading;
    this.isErrorRegistration = this._authorizeServiceStore.userRegistrationStatus.isErrorMessage;
    this.isLoadingVerificationUser = this._authorizeServiceStore.userVerificationStatus.isLoading;
    this.isErrorVerificationUser = this._authorizeServiceStore.userVerificationStatus.isError;
    this.isTimeoutRepeatSendCode = this._authorizeServiceStore.numberTimeoutRepeatSendCode.asReadonly();
  }
}
