import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationRequest } from '#application';
import { Observable } from 'rxjs';
import { PipelineUserTokens } from '../../../tokens';
import { PipelineObservible } from '../../../common/decorators';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';

export class UserCheckHandler extends HttpClientHandler<ApplicationRequest.user.UserCheckQuery, Observable<DomainInterface.IUser | null>> {
  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  override handler(): Observable<DomainInterface.IUser | null> {
    return this._client.get<DomainInterface.IUser>(this._url + 'api/user/check', {
      responseType: 'json',
      withCredentials: true,
    });
  }
}
