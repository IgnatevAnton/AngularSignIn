import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser, UserRoles, DomainDecoators } from '@domain';
import { ApplicationTokens, IUserRepository } from '@application';
import { InfrastructureContainerForDecorator, InfrastructureDecorators, InfrastructureTokens, IUserResponse, IPipelineBehevior } from '@infrastructure';


export class User implements IUser {
  id: number = 0;
  uid: string = "";
  name: string = "";
  email: string = "";
  role: UserRoles = UserRoles.USER;
}

export class UserResponse implements IUserResponse {
  email: string = "";
  uid: string = "";
  name: string = "";
}

@Injectable()
export class UserRepositoryHttpService implements IUserRepository {

  private _url: string = inject(ApplicationTokens.URL_REST_API);
  private _client: HttpClient = inject(HttpClient);

  constructor(
    @Inject(InfrastructureTokens.PiplineUserTokens) userPipline: IPipelineBehevior[]
  ) {
    const conatianer = [];
    for (const behevior of userPipline) { conatianer.push(behevior); }
    InfrastructureContainerForDecorator.set(InfrastructureTokens.PiplineUserTokens, conatianer);
  }

  @DomainDecoators.DebugMethod()
  @InfrastructureDecorators.PiplineObservible()
  check(): Observable<IUser | null> {
    return this._client.get<IUser>(
      this._url + "api/user/check",
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  @InfrastructureDecorators.PiplineObservible()
  login(username: string, password: string): Observable<IUser> {
    return this._client.post<IUser>(
      this._url + "api/user/login",
      { login: username, password: password },
      { responseType: 'json', withCredentials: true }
    );
  }

  logout(user: IUser): void {
    throw new Error('Method not implemented.');
  }
}
