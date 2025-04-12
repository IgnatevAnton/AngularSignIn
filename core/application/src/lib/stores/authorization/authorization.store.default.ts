import { IAuthorizationStore } from './interfaces/IAuthorizationStore';

export const authorizationStoreDefault: IAuthorizationStore = {
  user: null,
  isCheckUser: false,
  registrationStatus: null,
  timeoutRepeatSendCode: 0
};
