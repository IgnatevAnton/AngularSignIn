import { IStoreDispatcher, StoreHandler } from '@cqrs';
import { DomainDecoators, DomainInterface } from '#domain';
import { IUserResponse } from '../../../interface';
import { UserResponse } from '../../../entities/UserResponse';
import { isCheckPrimitiveTypeInObject } from '../../../common/utils/isCheckPrimitiveTypeInObject';
import { UserMappingAction, UserValidateAction } from '../actions';

export class UserValidateHandler extends StoreHandler<UserValidateAction, DomainInterface.IUser | null> {

  @DomainDecoators.DebugMethod()
  override handler(
    action: UserValidateAction,
    dispatcher: IStoreDispatcher,
    callback?: (data: DomainInterface.IUser | null) => void
  ): void {
    const user: IUserResponse = new UserResponse();
    const data: IUserResponse = action.request;
    const isValid = isCheckPrimitiveTypeInObject<IUserResponse>(data, user);
    dispatcher.send(new UserMappingAction(isValid ? data : null), callback);
  }

}
