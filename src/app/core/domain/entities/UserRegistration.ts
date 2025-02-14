import { DomainInterface } from "@domain";

export class UserRegistration implements DomainInterface.IUserRegistration {
    login: string = "";
    email: string = "";
    password: string = "";
}
