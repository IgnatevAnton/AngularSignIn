import { DomainDecoators } from '#domain';
import { ApplicationRequest } from '#application';
import { take } from 'rxjs';
import { UserHandler } from './User.handler';

export class UserLogoutHandler extends UserHandler<ApplicationRequest.user.UserLogoutCommand, void> {
  @DomainDecoators.DebugMethod()
  handler(): void {
    this._client
      .get(this._url + 'api/user/logout', { responseType: 'json', withCredentials: true })
      .pipe(take(1))
      .subscribe();
  }
}
