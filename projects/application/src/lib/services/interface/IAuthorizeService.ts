import { Signal } from '@angular/core';
import { DomainInstruction, DomainInterface, RegistrationStatusErrors } from '#domain';

export interface IAuthorizeService
  extends DomainInstruction.ICheckUser,
    DomainInstruction.ILogin,
    DomainInstruction.ILogout,
    DomainInstruction.IRegistrationUser,
    DomainInstruction.IConfirmAccount,
    DomainInstruction.IRepeatSendCode {
  readonly user$: Signal<DomainInterface.IUser | null>;
  readonly isCheck$: Signal<boolean>;
  readonly isLoadingLogin$: Signal<boolean>;
  readonly isErrorLogin$: Signal<boolean>;
  readonly isErrorRegistration$: Signal<RegistrationStatusErrors[]>;
  readonly isLoadingRegistration$: Signal<boolean>;
  readonly isLoadingVerificationUser$: Signal<boolean>;
  readonly isErrorVerificationUser$: Signal<boolean>;
  readonly isTimeoutRepeatSendCode$: Signal<number>;
}
