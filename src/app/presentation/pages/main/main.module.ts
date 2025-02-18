import { NgModule } from '@angular/core';
import { UserProfileBarComponent } from '@presentation/features/user-profile-bar/components/user-profile-bar/user-profile-bar.component';
import { MainComponent } from '@presentation/pages/main/components/main/main.component';


@NgModule({
  declarations: [
    MainComponent,
    UserProfileBarComponent
  ],
  imports: [

  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
