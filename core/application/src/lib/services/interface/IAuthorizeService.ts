import { Signal } from '@angular/core';
import { DomainInterface, RegistrationStatusErrors } from '#domain';

export interface IAuthorizeService {
  readonly user: Signal<DomainInterface.IUser | null>;
  readonly isCheck: Signal<boolean>;
  readonly isLoadingLogin: Signal<boolean>;
  readonly isErrorLogin: Signal<boolean>;
  readonly isErrorRegistration: Signal<RegistrationStatusErrors[] | null>;
  readonly isLoadingRegistration: Signal<boolean>;
  readonly isLoadingVerificationUser: Signal<boolean>;
  readonly isErrorVerificationUser: Signal<boolean>;
  readonly isTimeoutRepeatSendCode: Signal<number>;
}
