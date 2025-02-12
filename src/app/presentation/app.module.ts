import { Inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '@presentation/app-routing.module';
import { AppComponent } from '@presentation/app.component';
import { SignInComponent } from '@presentation/pages/sign-in/sign-in.component';
import { ApplicationModule } from '@application/application.module';
import { DomainTokens, ILogger } from '@domain';
import { MainComponent } from '@presentation/pages/main/main.component';
import { DomainModule } from '@domain/domain.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { RegistrationFromComponent } from './features/registration-from/registration-from.component';
import { LogoComponent } from './shared/logo/logo.component';
import { LoaderLineComponent } from './shared/loaders/loader-line/loader-line.component';
import { LoaderSpinnerComponent } from './shared/loaders/loader-spinner/loader-spinner.component';
import { SignInFormComponent } from './features/sign-in-form/components/sign-in-form.component';

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
  private _loggerInfo: ILogger | undefined;

  constructor(
    @Inject(DomainTokens.LoggerServiceInfoToken) loggerInfo?: ILogger
  ) {
    this._loggerInfo = loggerInfo;
    this.getAppInfo();
  }
  
  getAppInfo() {
    this._loggerInfo?.info(_NGX_ENV_.NG_APP_NAME, `run build ${_NGX_ENV_.NG_APP_VERSION} isDevMode ${isDevMode()}`);
  }
  
}
