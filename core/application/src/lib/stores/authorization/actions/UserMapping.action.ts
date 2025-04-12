import { StoreAction } from '@cqrs';
import { IUserResponse } from '../../../interface';
export class UserMappingAction extends StoreAction {
  constructor(readonly request: IUserResponse | null) { super(); }
}
