import { UserRoles } from "../constant/UserRoles";
import { IUser } from "../interface/IUser";

export class User implements IUser {

  id: number = 0;
  uid: string = "";
  avatar: string = "";
  name: string = "";
  email: string = "";
  role: UserRoles = UserRoles.USER;
  isConfirm: boolean = false;

}
