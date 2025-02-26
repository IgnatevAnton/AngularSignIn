import { Observable } from 'rxjs';
import { UserRegistrationCommand } from '../Commands/UserRegistration.command';
import { UserHandler } from './User.handler';
import { DomainDecoators, DomainInterface } from '#domain';

export class UserRegistrationHandler extends UserHandler<
  UserRegistrationCommand,
  Observable<DomainInterface.IUserRegistrationStatus | null>
> {
  @DomainDecoators.DebugMethod()
  handler(request: UserRegistrationCommand): Observable<DomainInterface.IUserRegistrationStatus | null> {
    return this._client.post<DomainInterface.IUserRegistrationStatus>(
      this._url + 'api/user/login',
      { login: request.login, email: request.email, password: request.password },
      { responseType: 'json', withCredentials: true }
    );
  }
}
