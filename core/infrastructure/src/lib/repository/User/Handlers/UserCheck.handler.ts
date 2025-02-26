import { DomainDecoators, DomainInterface } from '#domain';
import { Observable } from 'rxjs';
import { PipelineUserTokens } from '../../../tokens';
import { PipelineObservible } from '../../../common/decorators';
import { UserHandler } from './User.handler';
import { UserCheckQuery } from '../Queries/UserCheck.query';

export class UserCheckHandler extends UserHandler<UserCheckQuery, Observable<DomainInterface.IUser | null>> {
  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  handler(): Observable<DomainInterface.IUser | null> {
    return this._client.get<DomainInterface.IUser>(this._url + 'api/user/check', {
      responseType: 'json',
      withCredentials: true,
    });
  }
}
