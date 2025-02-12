import { Signal } from "@angular/core";
import { IUser, ICheckUser, ILogin, ILogout } from "@domain";

export interface IAuthorizeService extends ICheckUser, ILogin, ILogout {
  readonly user$: Signal<IUser | null>;
  readonly isCheck$: Signal<boolean>;
  readonly isLoadingLogin$: Signal<boolean>;
  readonly isErrorLogin$: Signal<boolean>;
}
