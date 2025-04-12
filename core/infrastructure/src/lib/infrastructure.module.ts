import { NgModule } from '@angular/core';
import { ICommand, IQuery, IRequestHandlerToken } from '@cqrs';
import { ApplicationTokens, ApplicationRequest } from '#application';

import { GetGroupFollowersHandler } from './repository/followers';
import { SettingSaveDataHandler, UpdateSettingFromLoadDataHandler } from './repository/settings';

import { URL_REST_API } from './tokens';

import { UserRepository } from './repository/user.repository';



@NgModule({
  providers: [
    { provide: URL_REST_API, useValue: 'https://localhost:7069/' },
    { provide: ApplicationTokens.USER_REPOSITORY_TOKEN, useClass: UserRepository },
    {
      provide: ApplicationTokens.HandlersToken,
      useFactory: () =>
        new Map<IQuery | ICommand, IRequestHandlerToken>([
          [ApplicationRequest.followers.GetGroupFollowersQuery, new GetGroupFollowersHandler()],
          [ApplicationRequest.setting.SettingSaveDataCommand, new SettingSaveDataHandler()],
          [ApplicationRequest.setting.UpdateSettingFromLoadDataCommand, new UpdateSettingFromLoadDataHandler()],
        ]),
    },
  ],
})
export class InfrastructureModule { }
