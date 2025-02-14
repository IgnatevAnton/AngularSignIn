import { NgModule } from '@angular/core';
import { InfrastructureTokens } from '@infrastructure';

import { MappingUser } from '@infrastructure/entities/User/MappingUser';
import { ValidateUser } from '@infrastructure/entities/User/ValidateUser';
import { UserResponse } from '@infrastructure/entities/User/UserResponse';

@NgModule({
  providers: [
    { provide: InfrastructureTokens.FactoryUserResponseToken, useFactory: () => new UserResponse() },
    { provide: InfrastructureTokens.PipelineUserTokens, useClass: ValidateUser, multi: true },
    { provide: InfrastructureTokens.PipelineUserTokens, useClass: MappingUser, multi: true },
  ]
})
export class InfrastructureModule { }
