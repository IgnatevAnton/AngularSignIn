import { Observable, of } from 'rxjs';
import { ApplicationRequest } from '#application';
import { UserHandler } from '../../user/handlers/User.handler';
import { DomainDecoators, DomainInterface } from '#domain';

export class UserGroupFollowersHandler extends UserHandler<ApplicationRequest.followers.UserGroupFollowersQuery, Observable<DomainInterface.IFollowerUser[] | null>> {
  @DomainDecoators.DebugMethod()
  handler(): Observable<DomainInterface.IFollowerUser[] | null> {
    return of([]);
  }
}
