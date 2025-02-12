import { IUser } from "@domain";
import { Observable } from "rxjs";

export interface IUserRepository {
  check(): Observable<IUser | null>,
  login(username: string, password: string): Observable<IUser | null>,
  logout(user:IUser): void
}
