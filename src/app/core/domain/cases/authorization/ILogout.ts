import { IUser } from "@domain/interface/IUser";

export interface ILogout {
  logout(user:IUser): void
}
