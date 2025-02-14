import { Component, effect, EventEmitter, inject, Inject, Output, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainDecoators, DomainTokens, DomainInterface, RegistrationStatusErrors } from '@domain';
import { ApplicationTokens, ApplicationServices } from '@application';
import { matchValidator } from '../validators/matchValidator';

@Component({
  selector: 'app-registration-from',
  standalone: false,

  templateUrl: './registration-from.component.html',
  styleUrl: './registration-from.component.scss'
})
export class RegistrationFromComponent {

  private _title = "_RegistrationFromComponent";
  private _authorizationService: ApplicationServices.IAuthorizeService;
  private _formBuilder = inject(FormBuilder);
  private _userRegistrationData = inject(DomainTokens.FactoryUserRegistrationToken);
  public isLoadingRegistrationUser$: Signal<boolean>;

  public isErrorName: boolean = false;
  public isErrorEmail: boolean = false;
  public isErrorPassword: boolean = false;


  @Output() private changeIsLoadingRegistrationUser = new EventEmitter<boolean>();

  constructor(@Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: ApplicationServices.IAuthorizeService) {
    this._authorizationService = authorizationService;
    this.isLoadingRegistrationUser$ = this._authorizationService.isLoadingRegistration$;
    effect(() => {
      this.changeIsLoadingRegistrationUser.emit(this.isLoadingRegistrationUser$());
      this.isErrorName = (this._authorizationService.isErrorRegistration$()).includes(RegistrationStatusErrors.USER_NAME);
      this.isErrorEmail = (this._authorizationService.isErrorRegistration$()).includes(RegistrationStatusErrors.EMAIL);
      this.isErrorPassword = (this._authorizationService.isErrorRegistration$()).includes(RegistrationStatusErrors.PASSWORD);
    })
  }

  public registrationForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), matchValidator('password')]]
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {

    const login = this.registrationForm.value.login;
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    if (!(login && email && password)) { return; }
    const data: DomainInterface.IUserRegistration = this._userRegistrationData();
    data.login = login;
    data.email = email;
    data.password = password;
    this._authorizationService.registration(data);

  }
}

