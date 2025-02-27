import { Observable, of } from 'rxjs';
import { ApplicationRequest } from '#application';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';
import { DomainDecoators, DomainInterface } from '#domain';

export class GetGroupFollowersHandler extends HttpClientHandler<ApplicationRequest.followers.GetGroupFollowersQuery, Observable<DomainInterface.IFollowerUser[] | null>> {
  @DomainDecoators.DebugMethod()
  override handler(): Observable<DomainInterface.IFollowerUser[] | null> {
    return of(null);
  }
}
