import { DomainDecoators } from '#domain';
import { take } from 'rxjs';
import { UserLogoutCommand } from '../Commands/UserLogout.command';
import { UserHandler } from './User.handler';

export class UserLogoutHandler extends UserHandler<UserLogoutCommand, void> {
  @DomainDecoators.DebugMethod()
  handler(): void {
    this._client
      .get(this._url + 'api/user/logout', { responseType: 'json', withCredentials: true })
      .pipe(take(1))
      .subscribe();
  }
}
