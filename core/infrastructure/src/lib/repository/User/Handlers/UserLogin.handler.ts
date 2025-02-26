import { Observable } from 'rxjs';
import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationRequest } from '#application';
import { PipelineObservible } from '../../../common/decorators';
import { PipelineUserTokens } from '../../../tokens';
import { HttpClientHandler } from '../../../entities/HttpClientHandler';

export class UserLoginHandler extends HttpClientHandler<ApplicationRequest.user.UserLoginCommand, Observable<DomainInterface.IUser | null>> {
  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  override handler(request: ApplicationRequest.user.UserLoginCommand): Observable<DomainInterface.IUser | null> {
    return this._client.post<DomainInterface.IUser>(
      this._url + 'api/user/login',
      { login: request.username, password: request.password },
      { responseType: 'json', withCredentials: true }
    );
  }
}
