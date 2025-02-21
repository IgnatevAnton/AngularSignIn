import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationInterfaces, ApplicationTokens } from '@application';

import { AuthorizationServiceHttpClient } from './services/authorization-http-client.service';
import { UserRepositoryHttpService } from '@infrastructure/service/user-repository-http.service';
import { SettingInterfaceLocalStorageService } from '@infrastructure/service/setting-interface-local-storage.service';

@NgModule({
  providers: [
    { provide: ApplicationTokens.URL_REST_API, useValue: "https://localhost:7069/" },
    { provide: ApplicationTokens.UserRepositoryToken, useClass: UserRepositoryHttpService },
    { provide: ApplicationTokens.DefaultSettingBarsToken, useValue: new Map<string, ApplicationInterfaces.ISettingBar>() },
    { provide: ApplicationTokens.AuthorizationServiceToken, useClass: AuthorizationServiceHttpClient },
    { provide: ApplicationTokens.SettingInterfaceServiceToken, useClass: SettingInterfaceLocalStorageService }
  ],
  imports: [HttpClientModule]
})
export class ApplicationModule { }
