import { StoreAction } from '@cqrs';
export class UserVerificationAction extends StoreAction {
    get code() { return this._code; }
    constructor(private _code: string) { super(); }
}
