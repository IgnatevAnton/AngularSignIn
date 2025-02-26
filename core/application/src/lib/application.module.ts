import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthorizationServiceToken, DefaultSettingBarsToken, FollowersServiceToken, SenderToken, SettingInterfaceServiceToken } from './tokens';
import { ISettingBar } from './interface';
import { AuthorizationService } from './services/authorization.service';
import { SettingInterfaceLocalStorageService } from './services/setting-interface-local-storage.service';
import { FollowersService } from './services/followers.service';
import { SenderService } from './services/sender.service';

@NgModule({
  providers: [
    { provide: DefaultSettingBarsToken, useValue: new Map<string, ISettingBar>() },

    { provide: AuthorizationServiceToken, useClass: AuthorizationService },
    { provide: SettingInterfaceServiceToken, useClass: SettingInterfaceLocalStorageService },
    { provide: FollowersServiceToken, useClass: FollowersService },
    { provide: SenderToken, useClass: SenderService },
  ],
  imports: [HttpClientModule],
})
export class ApplicationModule {}
