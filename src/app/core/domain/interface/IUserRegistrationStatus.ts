import { RegistrationStatusErrors } from "@domain";

export interface IUserRegistrationStatus {
  status: boolean;
  errorNameFields: RegistrationStatusErrors[];
}
