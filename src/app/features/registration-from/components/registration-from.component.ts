import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainDecoators, RegistrationStatusErrors } from '#domain';
import { ApplicationTokens, ApplicationRequest } from '#application';
import { matchValidator } from '../validators/matchValidator';
import { injectStore, STORE_DISPATCHER_TOKEN } from '@cqrs';

@Component({
  selector: 'app-registration-from',
  standalone: false,
  templateUrl: './registration-from.component.html',
  styleUrl: './registration-from.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFromComponent {
  private _title = '_RegistrationFromComponent';

  private readonly _dispathcer = inject(STORE_DISPATCHER_TOKEN);
  private readonly _store = injectStore(ApplicationTokens.AUTHORIZATION_STORE);

  private readonly _formBuilder = inject(FormBuilder);

  private _isExitRegistrationForm = false;

  public readonly isLoadingRegistrationUser: Signal<boolean>;

  public isErrorName = false;
  public isErrorEmail = false;
  public isErrorPassword = false;

  @Output() private changeIsLoadingRegistrationUser = new EventEmitter<boolean>();
  @Output() private changeIsRegistrationForm = new EventEmitter<boolean>();

  constructor() {
    this.isLoadingRegistrationUser = this._store.registrationStatus.status.isPending;

    effect(() => {
      const isLoad = this.isLoadingRegistrationUser();
      const isErrorRegistration = this._store.registrationStatus.value()?.errorNameFields ?? [];

      this.isErrorName = isErrorRegistration.includes(RegistrationStatusErrors.USER_NAME);
      this.isErrorEmail = isErrorRegistration.includes(RegistrationStatusErrors.EMAIL);
      this.isErrorPassword = isErrorRegistration.includes(RegistrationStatusErrors.PASSWORD);

      this.changeIsLoadingRegistrationUser.emit(isLoad);
      if (isLoad) {
        this._isExitRegistrationForm = true;
      } else {
        this.registrationForm.enable();
        if (this._isExitRegistrationForm && !this.isErrorName && !this.isErrorEmail && !this.isErrorPassword) {
          this.changeIsRegistrationForm.emit(false);
        } else {
          this._isExitRegistrationForm = false;
        }
      }
    });
  }

  public registrationForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), matchValidator('password')]],
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const login = this.registrationForm.value.login;
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    if (!(login && email && password)) { return; }
    this.registrationForm.disable();
    this._dispathcer.send(new ApplicationRequest.user.UserRegistrationAction(login, email, password));
  }
}
