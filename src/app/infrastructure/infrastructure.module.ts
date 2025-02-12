import { NgModule } from '@angular/core';
import {  } from '@angular/common';
import { InfrastructureTokens } from '.';
import { MappingUser } from '@infrastructure/entities/User/MappingUser';
import { ValidateUser } from '@infrastructure/entities/User/ValidateUser';



@NgModule({
  providers: [
    { provide: InfrastructureTokens.PiplineUserTokens, useClass: ValidateUser, multi: true },
    { provide: InfrastructureTokens.PiplineUserTokens, useClass: MappingUser, multi: true },
  ]
})
export class InfrastructureModule { }
