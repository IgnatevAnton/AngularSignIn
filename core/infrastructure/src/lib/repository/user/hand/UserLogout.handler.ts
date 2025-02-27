import { DomainDecoators } from '#domain';
import { ApplicationRequest } from '#application';
import { take } from 'rxjs';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';

export class UserLogoutHandler extends HttpClientHandler<ApplicationRequest.user.UserLogoutCommand, void> {
  @DomainDecoators.DebugMethod()
  override handler(): void {
    this._client
      .get(this._url + 'api/user/logout', { responseType: 'json', withCredentials: true })
      .pipe(take(1))
      .subscribe();
  }
}
