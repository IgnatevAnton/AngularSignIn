import { DomainInterface, RegistrationStatusErrors } from '#domain';
import { WritableSignal } from '@angular/core';
import { StatusRequest } from '../../entities';

export interface IAuthorizeServiceStore {
  user: WritableSignal<DomainInterface.IUser | null>;
  userCheckStatus: StatusRequest<null>;
  userLoginStatus: StatusRequest<null>;
  userRegistrationStatus:StatusRequest<RegistrationStatusErrors[] | null>;
  userVerificationStatus: StatusRequest<null>;
  numberTimeoutRepeatSendCode: WritableSignal<number>;
}
