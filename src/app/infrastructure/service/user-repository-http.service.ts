import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainDecoators, DomainInterface, DomainTokens } from '@domain';
import { ApplicationTokens, IUserRepository } from '@application';
import { InfrastructureContainerForDecorator, InfrastructureDecorators, InfrastructureTokens, IPipelineBehevior } from '@infrastructure';


@Injectable()
export class UserRepositoryHttpService implements IUserRepository {

  private _url: string = inject(ApplicationTokens.URL_REST_API);
  private _client: HttpClient = inject(HttpClient);

  constructor(
    @Inject(InfrastructureTokens.PipelineUserTokens) userPipline: IPipelineBehevior[],
    @Inject(DomainTokens.FactoryUserToken) factoryUser: DomainInterface.IUser
  ) {
    const conatianer = [];

    for (const behevior of userPipline) { conatianer.push(behevior); }
    InfrastructureContainerForDecorator.set(InfrastructureTokens.PipelineUserTokens, conatianer);
    InfrastructureContainerForDecorator.set(DomainTokens.FactoryUserToken, factoryUser);

  }


  @DomainDecoators.DebugMethod()
  @InfrastructureDecorators.PiplineObservible(InfrastructureTokens.PipelineUserTokens)
  check(): Observable<DomainInterface.IUser | null> {
    return this._client.get<DomainInterface.IUser>(
      this._url + "api/user/check",
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  @InfrastructureDecorators.PiplineObservible(InfrastructureTokens.PipelineUserTokens)
  login(username: string, password: string): Observable<DomainInterface.IUser> {
    return this._client.post<DomainInterface.IUser>(
      this._url + "api/user/login",
      { login: username, password: password },
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  logout(user: DomainInterface.IUser): void {
    throw new Error('Method not implemented.');
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): Observable<DomainInterface.IUserRegistrationStatus> {
    return this._client.post<DomainInterface.IUserRegistrationStatus>(
      this._url + "api/user/registration",
      data,
      { responseType: 'json', withCredentials: true }
    );
  }

}
