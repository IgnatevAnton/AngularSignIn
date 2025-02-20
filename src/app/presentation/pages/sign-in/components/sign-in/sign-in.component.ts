import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {

  public isRegsitarationForm: boolean = false;
  public isLoadingUser!: boolean;
  @Input() public isConfirm: boolean | null = null;
  @Input() public email: string | null = null;

  changeIsRegistrationForm(event: Event) {
    event.preventDefault();
    this.isRegsitarationForm = !this.isRegsitarationForm;
  }

}
