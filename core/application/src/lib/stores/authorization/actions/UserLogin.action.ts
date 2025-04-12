import { StoreAction } from '@cqrs';
export class UserLoginAction extends StoreAction {
  get username() { return this._username; }
  get password() { return this._password; }
  constructor(
    private _username: string,
    private _password: string
  ) { super(); }
}
