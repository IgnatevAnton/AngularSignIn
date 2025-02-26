import { Observable } from 'rxjs';
import { UserVerificationCommand } from '../Commands/UserVerification.command';
import { UserHandler } from './User.handler';
import { DomainDecoators } from '#domain';

export class UserVerifivationHandler extends UserHandler<UserVerificationCommand, Observable<boolean | null>> {
  @DomainDecoators.DebugMethod()
  handler(request: UserVerificationCommand): Observable<boolean | null> {
    return this._client.post<boolean>(
      this._url + 'api/user/confirm',
      { code: request.code },
      { responseType: 'json', withCredentials: true }
    );
  }
}
