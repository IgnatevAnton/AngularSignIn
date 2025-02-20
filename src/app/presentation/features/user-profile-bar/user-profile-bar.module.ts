import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileBarComponent } from '@presentation/features/user-profile-bar/components/user-profile-bar/user-profile-bar.component';
import { UserIconComponent } from '@presentation/features/user-profile-bar/components/user-icon/user-icon/user-icon.component';
import { UserFollowersIconComponent } from '@presentation/features/user-profile-bar/components/user-followers-icon/user-followers-icon/user-followers-icon.component';
import { UserSettingBarComponent } from '@presentation/features/user-profile-bar/components/user-setting-bar/user-setting-bar/user-setting-bar.component';
import { HorizontPanelComponent } from '../../shared/components/panels/horizont-panel/horizont-panel.component';



@NgModule({
  declarations: [
    UserProfileBarComponent,
    UserIconComponent,
    UserFollowersIconComponent,
    UserSettingBarComponent
  ],
  imports: [
    HorizontPanelComponent
  ],
  exports: [
    CommonModule,
    UserProfileBarComponent
  ]
})
export class UserProfileBarModule { }
