import { DomainInterface } from "@domain";

export interface IRegistrationUser {
  registration(data: DomainInterface.IUserRegistration): void;
}
