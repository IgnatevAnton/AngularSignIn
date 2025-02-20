import { NgModule } from '@angular/core';
import { UserFollowersBarComponent } from '@presentation/features/user-followers-bar/components/user-followers-bar/user-followers-bar.component';
import { PanelComponent } from '@presentation/shared/components/panel/panel.component';

@NgModule({
  declarations: [
    UserFollowersBarComponent
  ],
  imports: [
    PanelComponent
  ],
  exports: [
    UserFollowersBarComponent
  ]
})
export class UserFollowersBarModule { }
