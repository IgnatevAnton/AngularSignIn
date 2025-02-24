import { RegistrationStatusErrors } from "../constant/RegistrationStatusErrors";

export interface IUserRegistrationStatus {
  status: boolean;
  errorNameFields: RegistrationStatusErrors[];
}
