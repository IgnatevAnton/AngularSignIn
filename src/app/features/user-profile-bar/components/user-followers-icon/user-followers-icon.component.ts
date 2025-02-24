import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-followers-icon',
  standalone: false,
  templateUrl: './user-followers-icon.component.html',
  styleUrl: './user-followers-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFollowersIconComponent {
  @Output() public handleOpenFollowers = new EventEmitter<void>();

  public onOpenFollowers(): void {
    this.handleOpenFollowers.emit();
  }
}
