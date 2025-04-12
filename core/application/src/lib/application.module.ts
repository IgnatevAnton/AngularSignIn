import { NgModule } from '@angular/core';

import { AUTHORIZATION_SERVICE_STORE_TOKEN, AuthorizationServiceToken, DefaultSettingBarsToken, FollowersServiceToken, SenderToken, SettingInterfaceServiceToken } from './tokens';
import { ISettingBar } from './interface';
import { SettingInterfaceService } from './services/setting-interface.service';
import { FollowersService } from './services/followers.service';
import { SenderService } from './services/sender.service';
import { AuthorizationStoreService } from './services/authorization-store.service';
import { AuthorizationSignalService } from './services/authorization-signal.service';
import { STORE_DISPATCHER_TOKEN, StoreDispatcher } from '@cqrs';
import { AuthorizationStoreModule } from './stores/authorization/authorization-store.module';

@NgModule({
  providers: [
    { provide: AUTHORIZATION_SERVICE_STORE_TOKEN, useClass: AuthorizationStoreService },
    { provide: AuthorizationServiceToken, useClass: AuthorizationSignalService },

    { provide: DefaultSettingBarsToken, useValue: new Map<string, ISettingBar>() },
    { provide: SettingInterfaceServiceToken, useClass: SettingInterfaceService },
    { provide: FollowersServiceToken, useClass: FollowersService },
    { provide: SenderToken, useClass: SenderService },

    { provide: STORE_DISPATCHER_TOKEN, useClass: StoreDispatcher },

  ],
  imports: [
    AuthorizationStoreModule
  ],
})
export class ApplicationModule {}
