import { InfrsatructureInterface } from '@infrastructure';


export class UserResponse implements InfrsatructureInterface.IUserResponse {
    email: string = "";
    uid: string = "";
    name: string = "";
    isConfirm: boolean = false;
}
