import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationTokens } from '@application';

import { UserRepositoryHttpService } from '@infrastructure/service/user-repository-http.service';
import { AuthorizationServiceHttpClient } from './services/authorization-http-client.service';


@NgModule({
  providers: [
    { provide: ApplicationTokens.URL_REST_API, useValue: "https://localhost:7069/" },
    { provide: ApplicationTokens.UserRepositoryToken, useClass: UserRepositoryHttpService },
    { provide: ApplicationTokens.AuthorizationServiceToken, useClass: AuthorizationServiceHttpClient }
  ],
  imports: [ HttpClientModule ]
})
export class ApplicationModule { }
