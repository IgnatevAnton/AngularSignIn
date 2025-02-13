import { IUserResponse } from '../../interface/IUserResponse';


export class UserResponse implements IUserResponse {
    email: string = "";
    uid: string = "";
    name: string = "";
    isConfirm: boolean = false;
}
