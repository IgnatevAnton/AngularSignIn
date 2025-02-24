import { NgModule } from '@angular/core';

import { MappingUser } from './entities/User/MappingUser';
import { ValidateUser } from './entities/User/ValidateUser';
import { UserResponse } from './entities/User/UserResponse';

import { UserRepositoryHttpService } from './service/user-repository-http.service';
import { SettingInterfaceLocalStorageService } from './service/setting-interface-local-storage.service';
import { FollowersRepositoryHttpService } from './service/followers-repository-http.service';

import { FactoryUserResponseToken, PipelineUserTokens } from './tokens';
import { ApplicationTokens } from '#application';

@NgModule({
  providers: [
    { provide: FactoryUserResponseToken, useValue: () => new UserResponse() },
    { provide: PipelineUserTokens, useClass: ValidateUser, multi: true },
    { provide: PipelineUserTokens, useClass: MappingUser, multi: true },

    { provide: ApplicationTokens.UserRepositoryToken, useClass: UserRepositoryHttpService },
    { provide: ApplicationTokens.SettingInterfaceServiceToken, useClass: SettingInterfaceLocalStorageService },
    { provide: ApplicationTokens.FollowersRepositoryToken, useClass: FollowersRepositoryHttpService }

  ]
})
export class InfrastructureModule { }
