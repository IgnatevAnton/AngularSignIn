import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationInterfaces } from '#application';
import { Observable, take } from 'rxjs';
import { DomainInterface } from '#domain';
import { URL_REST_API } from '../tokens';

export class UserRepository implements ApplicationInterfaces.IUserRepository {

  private readonly _url: string = inject(URL_REST_API);
  private readonly _client: HttpClient = inject(HttpClient);

  check = () => this._client.get<ApplicationInterfaces.IUserResponse>(
    this._url + 'api/user/check',
    { responseType: 'json', withCredentials: true }
  ).pipe(take(1));

  login = (login: string, password: string) => this._client.post<ApplicationInterfaces.IUserResponse>(
    this._url + 'api/user/login',
    { login: login, password: password },
    { responseType: 'json', withCredentials: true }
  ).pipe(take(1));

  logout = () => this._client.get<void>(
    this._url + 'api/user/logout',
    { responseType: 'json', withCredentials: true }
  ).pipe(take(1));

  registration = (login: string, email: string, password: string) => this._client.post<DomainInterface.IUserRegistrationStatus>(
    this._url + 'api/user/registration',
    { login, email, password },
    { responseType: 'json', withCredentials: true }
  ).pipe(take(1));

  verification = (code: string): Observable<boolean> => this._client.post<boolean>(
    this._url + 'api/user/confirm',
    { code },
    { responseType: 'json', withCredentials: true }
  ).pipe(take(1));

}
