import { ICommand } from '@cqrs';
import { Observable } from 'rxjs';

export class UserVerificationCommand extends ICommand<Observable<boolean | null>> {
  private _code: string;

  get code() {
    return this._code;
  }

  constructor(code: string) {
    super();
    this._code = code;
  }
}
