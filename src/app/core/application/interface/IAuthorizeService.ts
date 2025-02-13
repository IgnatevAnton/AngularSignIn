import { Signal } from "@angular/core";
import { IUser, ICheckUser, ILogin, ILogout, IRegistrationUser, IConfirmEmail } from "@domain";

export interface IAuthorizeService extends ICheckUser, ILogin, ILogout, IRegistrationUser, IConfirmEmail {
  readonly user$: Signal<IUser | null>;
  readonly isCheck$: Signal<boolean>;
  readonly isLoadingLogin$: Signal<boolean>;
  readonly isErrorLogin$: Signal<boolean>;
}
