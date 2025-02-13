import { Component, inject, Inject } from '@angular/core';
import { ApplicationTokens, IAuthorizeService } from '../../../../core/application';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DomainDecoators } from '../../../../core/domain';

@Component({
  selector: 'app-registration-from',
  standalone: false,
  
  templateUrl: './registration-from.component.html',
  styleUrl: './registration-from.component.scss'
})
export class RegistrationFromComponent {

  private title = "_RegistrationFromComponent";
  private authorizationService: IAuthorizeService;
  private formBuilder = inject(FormBuilder);

  constructor(@Inject(ApplicationTokens.AuthorizationServiceToken) _authorizationService: IAuthorizeService) {
    this.authorizationService = _authorizationService;
  }

  ngOnInit() {
    const password = this.registrationForm.parent?.get('password');
    const confirmPassword = this.registrationForm.parent?.get('confirmPassword');
  }

  public registrationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), matchValidator('password')]]
  });


  @DomainDecoators.DebugMethod()
  onSubmit(): void {
      
  }
}

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
    if (control.parent && reverse) {
      if (c) { c.updateValueAndValidity(); }
      return null;
    }
    return !!control.parent && !!control.parent.value && control.value === c.value ? null : { matching: true };
  };
}
