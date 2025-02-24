import { NgModule } from '@angular/core';
import { MainComponent } from '#presentation/pages/main/components/main/main.component';
import { UserProfileBarModule } from '#presentation/features/user-profile-bar/user-profile-bar.module';
import { UserFollowersBarModule } from '#presentation/features/user-followers-bar/user-followers-bar.module';
import { UserProfileModule } from '#presentation/features/user-profile/user-profile.module';
import { SettingListBarsModule } from '#presentation/features/setting-list-bars/setting-list-bars.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    UserProfileBarModule,
    UserFollowersBarModule,
    UserProfileModule,
    SettingListBarsModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
