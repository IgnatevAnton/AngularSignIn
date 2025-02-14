import { DomainInterface } from "@domain";
import { Observable } from "rxjs";

export interface IUserRepository {
  check(): Observable<DomainInterface.IUser | null>,
  login(username: string, password: string): Observable<DomainInterface.IUser | null>,
  logout(user: DomainInterface.IUser): void,
  registration(data: DomainInterface.IUserRegistration): Observable<any>,
}
