import { Inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DomainTokens, DomainServices, DomainModule } from '#domain';
import { ApplicationModule } from '#application';
import { InfrastructureModule } from '#infrastructure';

import { AppRoutingModule } from '#presentation/app-routing.module';
import { AppComponent } from '#presentation/app.component';
import { SignInModule } from '#presentation/pages/sign-in/sign-in.module';
import { LoaderSpinnerComponent } from '#presentation/shared/components/loaders/loader-spinner/loader-spinner.component';
import { MainModule } from '#presentation/pages/main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    SignInModule,
    MainModule,
    LoaderSpinnerComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  private _loggerInfo: DomainServices.ILoggerService | undefined;

  constructor(@Inject(DomainTokens.LoggerServiceInfoToken) loggerInfo?: DomainServices.ILoggerService) {
    this._loggerInfo = loggerInfo;
    this.getAppInfo();
  }

  getAppInfo() {
    this._loggerInfo?.info(_NGX_ENV_.NG_APP_NAME, `run build ${_NGX_ENV_.NG_APP_VERSION} isDevMode ${isDevMode()}`);
  }
}
