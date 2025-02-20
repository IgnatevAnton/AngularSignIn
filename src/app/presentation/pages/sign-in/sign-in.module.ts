import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from '@presentation/pages/sign-in/components/sign-in/sign-in.component';
import { SignInFormComponent } from '@presentation/features/sign-in-form/components/sign-in-form.component';
import { RegistrationFromComponent } from '@presentation/features/registration-from/components/registration-from.component';
import { VerificationFormComponent } from '@presentation/features/verification-form/components/verification-form.component';
import { LogoComponent } from '@presentation/shared/components/logo/logo.component';
import { LoaderLineComponent } from '@presentation/shared/components/loaders/loader-line/loader-line.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignInFormComponent,
    RegistrationFromComponent,
    VerificationFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    LogoComponent,
    LoaderLineComponent
  ],
  exports: [ SignInComponent ]
})
export class SignInModule {
}
