import { StoreAction } from '@cqrs';
import { IUserResponse } from '../../../interface';
export class UserValidateAction extends StoreAction {
  constructor(readonly request: IUserResponse) { super(); }
}
