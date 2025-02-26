import { DomainInterface } from '#domain';
import { ICommand } from '@cqrs';
import { Observable } from 'rxjs';

export class UserLoginCommand extends ICommand<Observable<DomainInterface.IUser | null>> {
  private _username: string;
  private _password: string;

  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }

  constructor(username: string, password: string) {
    super();
    this._username = username;
    this._password = password;
  }
}
