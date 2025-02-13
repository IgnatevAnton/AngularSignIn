import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {

  public isRegsitarationForm: boolean = false;
  public isLoadingUser!: boolean;

  changeIsRegistrationForm(event: Event) {
    event.preventDefault();
    this.isRegsitarationForm = !this.isRegsitarationForm;
  }

}
