import { NgModule } from '@angular/core';
import { MainComponent } from '@presentation/pages/main/components/main/main.component';
import { UserProfileBarModule } from '@presentation/features/user-profile-bar/user-profile-bar.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    UserProfileBarModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
