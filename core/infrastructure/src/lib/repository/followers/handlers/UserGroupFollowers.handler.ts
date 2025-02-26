import { Observable, of } from 'rxjs';
import { ApplicationRequest } from '#application';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';
import { DomainDecoators, DomainInterface } from '#domain';

export class UserGroupFollowersHandler extends HttpClientHandler<ApplicationRequest.followers.UserGroupFollowersQuery, Observable<DomainInterface.IFollowerUser[] | null>> {
  @DomainDecoators.DebugMethod()
  override handler(): Observable<DomainInterface.IFollowerUser[] | null> {
    return of([]);
  }
}
