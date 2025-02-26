import { IUserResponse } from '../interface';

export class UserResponse implements IUserResponse {
  email = '';
  uid = '';
  name = '';
  isConfirm = false;
}
