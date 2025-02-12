import { Component, Inject, Signal } from '@angular/core';
import { ApplicationTokens, IAuthorizeService } from '../../../core/application';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public isRegsitarationForm: boolean = false;
  public isLoadingUser: Signal<boolean>;
  constructor(
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: IAuthorizeService
  ) {
    this.isLoadingUser = authorizationService.isLoadingLogin$;
  }

  changeIsRegistrationForm(event: Event) {
    event.preventDefault();
    this.isRegsitarationForm = !this.isRegsitarationForm;
  }

}
