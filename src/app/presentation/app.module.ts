import { Inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

import { DomainTokens, DomainServices } from '@domain';

import { AppRoutingModule } from '@presentation/app-routing.module';
import { AppComponent } from '@presentation/app.component';
import { SignInComponent } from '@presentation/pages/sign-in/sign-in.component';
import { MainComponent } from '@presentation/pages/main/main.component';
import { LogoComponent } from '@presentation/shared/logo/logo.component';
import { LoaderLineComponent } from '@presentation/shared/loaders/loader-line/loader-line.component';
import { LoaderSpinnerComponent } from '@presentation/shared/loaders/loader-spinner/loader-spinner.component';
import { SignInFormComponent } from '@presentation/features/sign-in-form/components/sign-in-form.component';
import { RegistrationFromComponent } from '@presentation/features/registration-from/components/registration-from.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainComponent,
    SignInFormComponent,
    RegistrationFromComponent,
    LogoComponent,
    LoaderLineComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private _loggerInfo: DomainServices.ILoggerService | undefined;

  constructor(
    @Inject(DomainTokens.LoggerServiceInfoToken) loggerInfo?: DomainServices.ILoggerService
  ) {
    this._loggerInfo = loggerInfo;
    this.getAppInfo();
  }
  
  getAppInfo() {
    this._loggerInfo?.info(_NGX_ENV_.NG_APP_NAME, `run build ${_NGX_ENV_.NG_APP_VERSION} isDevMode ${isDevMode()}`);
  }
  
}
