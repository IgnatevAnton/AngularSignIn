import { DomainInterface } from '#domain';

export interface IAuthorizationStore {
  user: DomainInterface.IUser | null;
  isCheckUser: boolean;
  registrationStatus: DomainInterface.IUserRegistrationStatus | null;
  timeoutRepeatSendCode: number;
}
