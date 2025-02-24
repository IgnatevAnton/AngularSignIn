import { Inject, NgModule } from '@angular/core';
import { UserProfileBarComponent } from '#presentation/features/user-profile-bar/components/user-profile-bar/user-profile-bar.component';
import { UserIconComponent } from '#presentation/features/user-profile-bar/components/user-icon/user-icon.component';
import { UserFollowersIconComponent } from '#presentation/features/user-profile-bar/components/user-followers-icon/user-followers-icon.component';
import { UserSettingBarComponent } from '#presentation/features/user-profile-bar/components/user-setting-bar/user-setting-bar.component';
import { PanelComponent } from '#presentation/shared/components/panel/panel.component';
import { ApplicationTokens } from '#application';
import { DefaultUserProfileBar } from '#presentation/constants/DefaultSettingBar/DefaultUserProfileBar';

@NgModule({
  declarations: [UserProfileBarComponent, UserIconComponent, UserFollowersIconComponent, UserSettingBarComponent],
  imports: [PanelComponent],
  exports: [UserProfileBarComponent],
})
export class UserProfileBarModule {
  constructor(@Inject(ApplicationTokens.DefaultSettingBarsToken) defaultSettingBars: Map<string, any>) {
    defaultSettingBars.set(DefaultUserProfileBar.name, DefaultUserProfileBar);
  }
}
