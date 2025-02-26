import { Observable } from 'rxjs';
import { UserHandler } from './User.handler';
import { DomainDecoators, DomainInterface } from '#domain';
import { PipelineObservible } from '../../../common/decorators';
import { PipelineUserTokens } from '../../../tokens';
import { UserLoginCommand } from '../Commands/UserLogin.command';

export class UserLoginHandler extends UserHandler<UserLoginCommand, Observable<DomainInterface.IUser | null>> {
  @DomainDecoators.DebugMethod()
  @PipelineObservible(PipelineUserTokens)
  handler(request: UserLoginCommand): Observable<DomainInterface.IUser | null> {
    return this._client.post<DomainInterface.IUser>(
      this._url + 'api/user/login',
      { login: request.username, password: request.password },
      { responseType: 'json', withCredentials: true }
    );
  }
}
