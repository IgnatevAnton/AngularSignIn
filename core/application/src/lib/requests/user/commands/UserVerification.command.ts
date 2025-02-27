import { Command } from '@cqrs';
import { Observable } from 'rxjs';

export class UserVerificationCommand extends Command<Observable<boolean | null>> {
  get code() {
    return this._code;
  }

  constructor(private _code: string) {
    super();
  }
}
