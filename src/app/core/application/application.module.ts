import { NgModule } from '@angular/core';
import { ApplicationTokens, AuthorizationServiceHttpClient } from '@application';
import { UserRepositoryHttpService } from '@infrastructure/service/user-repository-http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: ApplicationTokens.URL_REST_API, useValue: "https://localhost:7069/" },
    { provide: ApplicationTokens.UserRepositoryToken, useClass: UserRepositoryHttpService },
    { provide: ApplicationTokens.AuthorizationServiceToken, useClass: AuthorizationServiceHttpClient }
  ],
  imports: [ HttpClientModule ]
})
export class ApplicationModule { }
