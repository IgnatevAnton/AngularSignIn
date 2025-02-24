import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DomainInterface } from '#domain';

@Component({
  selector: 'app-user-icon',
  standalone: false,
  
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIconComponent {
  @Input() public user!: DomainInterface.IUser | null;
  @Output() public handleOpenUserProfile = new EventEmitter<void>();

  public onOpenUserProfile(): void {
    this.handleOpenUserProfile.emit();
  }

}
