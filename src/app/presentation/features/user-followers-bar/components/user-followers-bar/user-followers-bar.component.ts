import { Component } from '@angular/core';
import { BarNames } from '@application';

@Component({
  selector: 'app-user-followers-bar',
  standalone: false,
  
  templateUrl: './user-followers-bar.component.html',
  styleUrl: './user-followers-bar.component.scss'
})
export class UserFollowersBarComponent {
  public name: BarNames = BarNames.FOLLOWERS_BAR;
}
