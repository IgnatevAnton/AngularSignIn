import { Component, inject, Inject, Signal } from '@angular/core';
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
  private authorizationService: IAuthorizeService;
  public submitted = false;
  public isLoadingUser: Signal<boolean>;
  public isErrorUser: Signal<boolean>;
  private formBuilder = inject(FormBuilder);



  constructor(@Inject(ApplicationTokens.AuthorizationServiceToken) _authorizationService: IAuthorizeService) {
    this.authorizationService = _authorizationService;
    this.isLoadingUser = this.authorizationService.isLoadingLogin$;
    this.isErrorUser = this.authorizationService.isErrorLogin$;
  }

  public authorizationForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const login = this.authorizationForm.value.login;
    const password = this.authorizationForm.value.password;
    if (!(login && password)) { return; }
    this.authorizationService.login(login, password);
  }

}
