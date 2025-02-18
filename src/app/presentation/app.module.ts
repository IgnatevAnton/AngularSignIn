import { Inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

import { DomainTokens, DomainServices } from '@domain';

import { AppRoutingModule } from '@presentation/app-routing.module';
import { AppComponent } from '@presentation/app.component';

import { SignInModule } from '@presentation/pages/sign-in/sign-in.module';
import { MainModule } from '@presentation/pages/main/main.module';

import { MainComponent } from '@presentation/pages/main/components/main/main.component';

import { UserProfileBarComponent } from '@presentation/features/user-profile-bar/components/user-profile-bar/user-profile-bar.component';
import { LoaderSpinnerComponent } from '@presentation/shared/loaders/loader-spinner/loader-spinner.component';



@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    SignInModule,
    MainModule,
    LoaderSpinnerComponent
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
