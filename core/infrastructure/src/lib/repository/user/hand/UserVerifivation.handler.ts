import { Observable } from 'rxjs';
import { ApplicationRequest } from '#application';
import { DomainDecoators } from '#domain';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';

export class UserVerifivationHandler extends HttpClientHandler<ApplicationRequest.user.UserVerificationCommand, Observable<boolean | null>> {
  @DomainDecoators.DebugMethod()
  override handler(request: ApplicationRequest.user.UserVerificationCommand): Observable<boolean | null> {
    return this._client.post<boolean>(this._url + 'api/user/confirm', { code: request.code }, { responseType: 'json', withCredentials: true });
  }
}
