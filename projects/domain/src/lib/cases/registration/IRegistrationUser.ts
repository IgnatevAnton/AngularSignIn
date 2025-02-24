import { IUserRegistration } from '../../interface/IUserRegistration';

export interface IRegistrationUser {
  registration(data: IUserRegistration): void;
}
