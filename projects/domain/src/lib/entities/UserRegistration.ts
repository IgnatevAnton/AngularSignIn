import { IUserRegistration } from "../interface/IUserRegistration";

export class UserRegistration implements IUserRegistration {
  login: string = "";
  email: string = "";
  password: string = "";
}
