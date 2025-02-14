import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainDecoators, DomainInterface, DomainTokens } from '@domain';
import { ApplicationTokens, ApplicationInterfaces } from '@application';
import { InfrastructureContainerForDecorator, InfrastructureDecorators, InfrastructureTokens, InfrsatructureInterface } from '@infrastructure';


@Injectable()
export class UserRepositoryHttpService implements ApplicationInterfaces.IUserRepository {

  private _url: string = inject(ApplicationTokens.URL_REST_API);
  private _client: HttpClient = inject(HttpClient);

  constructor(
    @Inject(InfrastructureTokens.PipelineUserTokens) userPipline: InfrsatructureInterface.IPipelineBehevior[],
    @Inject(DomainTokens.FactoryUserToken) factoryUser: DomainInterface.IUser,
    @Inject(InfrastructureTokens.FactoryUserResponseToken) factoryUserResponse: InfrsatructureInterface.IUserResponse,
  ) {
    const conatianer = [];

    for (const behevior of userPipline) { conatianer.push(behevior); }
    InfrastructureContainerForDecorator.set(InfrastructureTokens.PipelineUserTokens, conatianer);
    InfrastructureContainerForDecorator.set(DomainTokens.FactoryUserToken, factoryUser);
    InfrastructureContainerForDecorator.set(InfrastructureTokens.FactoryUserResponseToken, factoryUserResponse);
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
