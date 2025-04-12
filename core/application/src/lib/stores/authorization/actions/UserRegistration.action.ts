import { StoreAction } from '@cqrs';
export class UserRegistrationAction extends StoreAction {
    get login() { return this._login; }
    get email() { return this._email; }
    get password() { return this._password; }
    constructor(
        private _login: string,
        private _email: string,
        private _password: string
    ) { super(); }
}
