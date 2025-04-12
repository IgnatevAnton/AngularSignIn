import { Observable } from 'rxjs';
import { DomainInterface } from '#domain';
import { IUserResponse } from './';


export interface IUserRepository {
  check(): Observable<IUserResponse>;
  login(username: string, password: string): Observable<IUserResponse>;
  logout(): Observable<void>;
  registration(login: string, email: string, password: string): Observable<DomainInterface.IUserRegistrationStatus>;
  verification(code: string): Observable<boolean>;
}
