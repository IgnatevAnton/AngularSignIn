import { Component, effect, EventEmitter, inject, Inject, Output, Signal } from '@angular/core';
import { ApplicationTokens, IAuthorizeService } from '@application';
import { DomainDecoators } from '@domain';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  standalone: false,
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {

  private title = "_SignInFormComponent";
  private _authorizationService: IAuthorizeService;
  public isLoadingUser: Signal<boolean>;
  public isErrorUser: Signal<boolean>;
  @Output() private changeIsLoadingUser = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);

  constructor(@Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: IAuthorizeService) {

    this._authorizationService = authorizationService;
    this.isLoadingUser = this._authorizationService.isLoadingLogin$;
    this.isErrorUser = this._authorizationService.isErrorLogin$;

    effect(() => {
      this.changeIsLoadingUser.emit(this.isLoadingUser());
    });

  }

  public authorizationForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const login = this.authorizationForm.value.login;
    const password = this.authorizationForm.value.password;
    if (!(login && password)) { return; }
    this._authorizationService.login(login, password);
  }

}
