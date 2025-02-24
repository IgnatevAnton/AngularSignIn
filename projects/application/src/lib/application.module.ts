import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthorizationService } from './services/authorization.service';
import { FollowersService } from './services/followers.service';

import { AuthorizationServiceToken, DefaultSettingBarsToken, FollowersServiceToken, URL_REST_API } from './tokens';
import { ISettingBar } from './interface';

@NgModule({
  providers: [
    { provide: URL_REST_API, useValue: "https://localhost:7069/" },
    { provide: DefaultSettingBarsToken, useValue: new Map<string, ISettingBar>() },
    { provide: AuthorizationServiceToken, useClass: AuthorizationService },
    { provide: FollowersServiceToken, useClass: FollowersService },
  ],
  imports: [HttpClientModule]
})
export class ApplicationModule { }
