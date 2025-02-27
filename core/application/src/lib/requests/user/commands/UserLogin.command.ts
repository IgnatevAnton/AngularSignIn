import { DomainInterface } from '#domain';
import { Command } from '@cqrs';
import { Observable } from 'rxjs';

export class UserLoginCommand extends Command<Observable<DomainInterface.IUser | null>> {
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }

  constructor(
    private _username: string,
    private _password: string
  ) {
    super();
  }
}
