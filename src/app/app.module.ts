import { inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DomainTokens, DomainServices, DomainModule } from '#domain';
import { ApplicationModule } from '#application';
import { InfrastructureModule } from '#infrastructure';

import { AppRoutingModule } from '#presentation/app-routing.module';
import { AppComponent } from '#presentation/app.component';
import { SignInModule } from '#presentation/pages/sign-in/sign-in.module';
import { LoaderSpinnerComponent } from '#presentation/shared/components/loaders/loader-spinner/loader-spinner.component';
import { MainModule } from '#presentation/pages/main/main.module';
import { WebWorkerRegistrationModule } from './workers/web-worker-registration.module';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './services/transloco-http-loader.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebWorkerRegistrationModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    SignInModule,
    MainModule,
    LoaderSpinnerComponent,
  ],
  providers: [
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'rus'],
        defaultLang: 'rus',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  private _loggerInfo?: DomainServices.ILoggerService = inject(DomainTokens.LoggerServiceInfoToken)
  constructor( ) { this.getAppInfo(); }

  getAppInfo() {
    this._loggerInfo?.info(_NGX_ENV_.NG_APP_NAME, `run build ${_NGX_ENV_.NG_APP_VERSION} isDevMode ${isDevMode()}`);
  }
}
