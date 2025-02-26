import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationRequest } from '#application';
import { Observable } from 'rxjs';
import { PipelineUserTokens } from '../../../tokens';
import { PipelineObservible } from '../../../common/decorators';
import { UserHandler } from './User.handler';

export class UserCheckHandler extends UserHandler<ApplicationRequest.user.UserCheckQuery, Observable<DomainInterface.IUser | null>> {
  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  handler(): Observable<DomainInterface.IUser | null> {
    return this._client.get<DomainInterface.IUser>(this._url + 'api/user/check', {
      responseType: 'json',
      withCredentials: true,
    });
  }
}
