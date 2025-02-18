import { NgModule } from '@angular/core';
import { UserProfileBarComponent } from '@presentation/features/user-profile-bar/components/user-profile-bar/user-profile-bar.component';
import { UserIconComponent } from '@presentation/features/user-profile-bar/components/user-icon/user-icon/user-icon.component';
import { UserFollowersIconComponent } from '@presentation/features/user-profile-bar/components/user-followers-icon/user-followers-icon/user-followers-icon.component';
import { UserSettingBarComponent } from '@presentation/features/user-profile-bar/components/user-setting-bar/user-setting-bar/user-setting-bar.component';


@NgModule({
  declarations: [
    UserProfileBarComponent,
    UserIconComponent,
    UserFollowersIconComponent,
    UserSettingBarComponent
  ],
  imports: [ ],
  exports: [
    UserProfileBarComponent
  ]
})
export class UserProfileBarModule { }
