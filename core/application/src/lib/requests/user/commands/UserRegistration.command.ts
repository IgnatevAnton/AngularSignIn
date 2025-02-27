import { DomainInterface } from '#domain';
import { Command } from '@cqrs';
import { Observable } from 'rxjs';

export class UserRegistrationCommand extends Command<Observable<DomainInterface.IUserRegistrationStatus | null>> {
  get login() {
    return this._login;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }

  constructor(
    private _login: string,
    private _email: string,
    private _password: string
  ) {
    super();
  }
}
