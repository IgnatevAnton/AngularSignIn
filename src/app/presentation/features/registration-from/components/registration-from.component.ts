import { Component, inject, Inject } from '@angular/core';
import { ApplicationTokens, IAuthorizeService } from '../../../../core/application';
import { FormBuilder, Validators } from '@angular/forms';
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

  public registrationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
      
  }
}
