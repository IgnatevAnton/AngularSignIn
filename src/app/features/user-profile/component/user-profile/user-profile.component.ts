import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarNames } from '#application';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  public name: BarNames = BarNames.USER_PROFILE;
}
