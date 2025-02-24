import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DomainDecoators, DomainInterface, DomainTokens } from '#domain';
import { ApplicationTokens, ApplicationServices } from '#application';
import { FactoryUserResponseToken, PipelineUserTokens } from '../tokens';
import { IPipelineBehevior, IUserResponse } from '../interface';
import { PipelineObservible } from '../common/decorators';
import { InfrastructureContainerForDecorator } from '../containerForDecorator';


@Injectable()
export class UserRepositoryHttpService implements ApplicationServices.IUserRepository {

  private _url: string = inject(ApplicationTokens.URL_REST_API);
  private _client: HttpClient = inject(HttpClient);

  constructor(
    @Inject(PipelineUserTokens) userPipline: IPipelineBehevior[],
    @Inject(DomainTokens.FactoryUserToken) factoryUser: () => DomainInterface.IUser,
    @Inject(FactoryUserResponseToken) factoryUserResponse: () => IUserResponse,
  ) {
    
    InfrastructureContainerForDecorator.set(DomainTokens.FactoryUserToken, factoryUser);
    InfrastructureContainerForDecorator.set(FactoryUserResponseToken, factoryUserResponse);

    const conatianer = [];
    for (const behevior of userPipline) { conatianer.push(behevior); }
    InfrastructureContainerForDecorator.set(PipelineUserTokens, conatianer);

  }


  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  check(): Observable<DomainInterface.IUser | null> {
    return this._client.get<DomainInterface.IUser>(
      this._url + "api/user/check",
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  login(username: string, password: string): Observable<DomainInterface.IUser> {
    return this._client.post<DomainInterface.IUser>(
      this._url + "api/user/login",
      { login: username, password: password },
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  logout(): void {
    this._client.get(this._url + "api/user/logout", { responseType: 'json', withCredentials: true }).pipe(take(1)).subscribe();
  }

  @DomainDecoators.DebugMethod()
  registration(data: DomainInterface.IUserRegistration): Observable<DomainInterface.IUserRegistrationStatus> {
    return this._client.post<DomainInterface.IUserRegistrationStatus>(
      this._url + "api/user/registration",
      data,
      { responseType: 'json', withCredentials: true }
    );
  }

  @DomainDecoators.DebugMethod()
  confirm(code: string): Observable<boolean> {
    return this._client.post<boolean>(
      this._url + "api/user/confirm",
      { code: code },
      { responseType: 'json', withCredentials: true }
    );
  }

}
