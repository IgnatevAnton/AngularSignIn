import { UserRoles } from '../constant/UserRoles';

export interface IUser {
  id: number;
  avatar: string;
  uid: string;
  name: string;
  email: string;
  role: UserRoles;
  isConfirm: boolean;
}
