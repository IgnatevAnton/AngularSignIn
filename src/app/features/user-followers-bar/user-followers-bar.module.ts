import { Inject, NgModule } from '@angular/core';
import { UserFollowersBarComponent } from '#presentation/features/user-followers-bar/components/user-followers-bar/user-followers-bar.component';
import { PanelComponent } from '#presentation/shared/components/panel/panel.component';
import { ApplicationTokens } from '#application';
import { DefaultFollowersBar } from '#presentation/constants/DefaultSettingBar/DefaultFollowersBar';

@NgModule({
  declarations: [ UserFollowersBarComponent ],
  imports: [ PanelComponent ],
  exports: [ UserFollowersBarComponent ]
})
export class UserFollowersBarModule {
  constructor(
    @Inject(ApplicationTokens.DefaultSettingBarsToken) defaultSettingBars: Map<string, any>
  ) {
    defaultSettingBars.set(DefaultFollowersBar.name, DefaultFollowersBar);
  }
}
