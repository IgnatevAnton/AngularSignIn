import { Inject, NgModule } from '@angular/core';
import { UserProfileComponent } from '#presentation/features/user-profile/component/user-profile/user-profile.component';
import { ApplicationTokens } from '#application';
import { PanelComponent } from '#presentation/shared/components/panel/panel.component';
import { DefaultUserProfile } from '#presentation/constants/DefaultSettingBar/DefaultUserProfile';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [PanelComponent],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule {
  constructor(
    @Inject(ApplicationTokens.DefaultSettingBarsToken) defaultSettingBars: Map<string, any>
  ) {
    defaultSettingBars.set(DefaultUserProfile.name, DefaultUserProfile);
  }
}
