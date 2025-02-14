import { UserRoles, DomainInterface } from '@domain';

export class User implements DomainInterface.IUser {

    id: number = 0;
    uid: string = "";
    name: string = "";
    email: string = "";
    role: UserRoles = UserRoles.USER;
    isConfirm: boolean = false;

}
