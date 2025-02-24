import { UserRoles } from '../constant/UserRoles';
import { IUser } from '../interface/IUser';

export class User implements IUser {
  id = 0;
  uid = '';
  avatar = '';
  name = '';
  email = '';
  role: UserRoles = UserRoles.USER;
  isConfirm = false;
}
