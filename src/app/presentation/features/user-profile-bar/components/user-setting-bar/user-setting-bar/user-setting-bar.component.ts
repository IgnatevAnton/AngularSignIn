import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-setting-bar',
  standalone: false,
  
  templateUrl: './user-setting-bar.component.html',
  styleUrl: './user-setting-bar.component.scss'
})
export class UserSettingBarComponent {
  @Output() private handleLogout = new EventEmitter<void>();

  emitLogout() {
    this.handleLogout.emit();
  }
}
