import { Observable } from 'rxjs';
import { ApplicationRequest } from '#application';
import { DomainDecoators } from '#domain';
import { UserHandler } from './User.handler';

export class UserVerifivationHandler extends UserHandler<ApplicationRequest.user.UserVerificationCommand, Observable<boolean | null>> {
  @DomainDecoators.DebugMethod()
  handler(request: ApplicationRequest.user.UserVerificationCommand): Observable<boolean | null> {
    return this._client.post<boolean>(this._url + 'api/user/confirm', { code: request.code }, { responseType: 'json', withCredentials: true });
  }
}
