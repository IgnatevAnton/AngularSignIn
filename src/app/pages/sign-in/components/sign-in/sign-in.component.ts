import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  public isRegsitarationForm = false;
  public isLoadingUser!: boolean;
  @Input() public isConfirm: boolean | null = null;
  @Input() public email: string | null = null;

  changeIsRegistrationForm(event: Event) {
    event.preventDefault();
    this.isRegsitarationForm = !this.isRegsitarationForm;
  }
}
