import { inject } from '@angular/core';
import { DomainDecoators, DomainInterface, DomainTokens } from '#domain';
import { IStoreDispatcher, StoreHandler } from '@cqrs';
import { UserMappingAction } from '../actions';

export class UserMappingHandler extends StoreHandler<UserMappingAction, DomainInterface.IUser | null> {

  private readonly _getDefaultUser = inject(DomainTokens.FactoryUserToken);

  @DomainDecoators.DebugMethod()
  override handler(action: UserMappingAction, dispatcher: IStoreDispatcher, callback?: (data: DomainInterface.IUser | null) => void) {
    if (action.request === null || callback === undefined) { return; }
    const user = this._getDefaultUser();
    user.email = action.request.email;
    user.name = action.request.name;
    user.uid = action.request.uid;
    user.isConfirm = action.request.isConfirm;
    callback(user);
  }

}
