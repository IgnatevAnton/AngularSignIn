import { Observable } from 'rxjs';
import { ApplicationRequest } from '#application';
import { DomainDecoators, DomainInterface } from '#domain';
import { UserHandler } from './User.handler';

export class UserRegistrationHandler extends UserHandler<ApplicationRequest.user.UserRegistrationCommand, Observable<DomainInterface.IUserRegistrationStatus | null>> {
  @DomainDecoators.DebugMethod()
  handler(request: ApplicationRequest.user.UserRegistrationCommand): Observable<DomainInterface.IUserRegistrationStatus | null> {
    return this._client.post<DomainInterface.IUserRegistrationStatus>(
      this._url + 'api/user/login',
      { login: request.login, email: request.email, password: request.password },
      { responseType: 'json', withCredentials: true }
    );
  }
}
