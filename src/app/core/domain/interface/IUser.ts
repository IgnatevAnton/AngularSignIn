import { UserRoles } from "@domain";

export interface IUser {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: UserRoles;
  isConfirm: boolean;
}
