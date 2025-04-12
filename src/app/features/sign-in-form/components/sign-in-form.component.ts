import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Inject, Output, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DomainDecoators } from '#domain';
import { ApplicationTokens, ApplicationServices, ApplicationRequest } from '#application';
import { injectStore, ISender, STORE_DISPATCHER_TOKEN } from '@cqrs';

@Component({
  selector: 'app-sign-in-form',
  standalone: false,
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  private title = '_SignInFormComponent';

  private readonly _dispatcher = inject(STORE_DISPATCHER_TOKEN);
  private readonly _store = injectStore(ApplicationTokens.AUTHORIZATION_STORE);

  public isLoadingUser: Signal<boolean>;
  public isErrorUser: Signal<boolean>;

  @Output() private changeIsLoadingUser = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);

  constructor() {

    this.isLoadingUser = this._store.user.status.isPending;
    this.isErrorUser = this._store.user.status.isError;

    effect(() => {
      const isLoadingUser = this.isLoadingUser();
      this.changeIsLoadingUser.emit(isLoadingUser);
      if (!isLoadingUser) {
        this.authorizationForm.enable();
      }
    });
  }

  public authorizationForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const login = this.authorizationForm.value.login;
    const password = this.authorizationForm.value.password;
    if (!(login && password)) {
      return;
    }
    this.authorizationForm.disable();
    this._dispatcher.send(new ApplicationRequest.user.UserLoginAction(login, password));
  }
}
