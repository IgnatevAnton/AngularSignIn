import { IUser } from "@domain/interface/IUser";

export interface ILogin {
  login(username: string, password: string): void
}
