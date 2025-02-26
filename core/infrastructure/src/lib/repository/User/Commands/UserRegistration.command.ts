import { DomainInterface } from '#domain';
import { ICommand } from '@cqrs';
import { Observable } from 'rxjs';

export class UserRegistrationCommand
  extends ICommand<Observable<DomainInterface.IUserRegistrationStatus | null>>
  implements DomainInterface.IUserRegistration
{
  private _login: string;
  private _email: string;
  private _password: string;

  get login() {
    return this._login;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }

  constructor(login: string, email: string, password: string) {
    super();
    this._login = login;
    this._email = email;
    this._password = password;
  }
}
