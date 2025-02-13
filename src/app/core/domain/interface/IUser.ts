import { UserRoles } from "@domain/constant/UserRoles";

export interface IUser {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: UserRoles;
  isConfirm: boolean;
}
