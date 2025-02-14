import { DomainInterface } from "@domain";

export class UserRegistration implements DomainInterface.IUserRegistration {
    name: string = "";
    email: string = "";
    password: string = "";
}
