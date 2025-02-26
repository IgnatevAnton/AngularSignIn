import { Observable, of } from 'rxjs';
import { UserGroupFollowersQuery } from '../Queries/UserGroupFollowers.query';
import { UserHandler } from './User.handler';
import { DomainDecoators, DomainInterface } from '#domain';

export class UserGroupFollowersHandler extends UserHandler<
  UserGroupFollowersQuery,
  Observable<DomainInterface.IFollowerUser[] | null>
> {
  @DomainDecoators.DebugMethod()
  handler(): Observable<DomainInterface.IFollowerUser[] | null> {
    return of([]);
  }
}
