import { Observable } from 'rxjs';
import { ApplicationRequest } from '#application';
import { DomainDecoators, DomainInterface } from '#domain';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';

export class UserRegistrationHandler extends HttpClientHandler<ApplicationRequest.user.UserRegistrationCommand, Observable<DomainInterface.IUserRegistrationStatus | null>> {
  @DomainDecoators.DebugMethod()
  override handler(request: ApplicationRequest.user.UserRegistrationCommand): Observable<DomainInterface.IUserRegistrationStatus | null> {
    return this._client.post<DomainInterface.IUserRegistrationStatus>(
      this._url + 'api/user/registration',
      { login: request.login, email: request.email, password: request.password },
      { responseType: 'json', withCredentials: true }
    );
  }
}
