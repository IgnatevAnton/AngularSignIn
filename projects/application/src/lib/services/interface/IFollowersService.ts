import { Signal } from '@angular/core';
import { DomainInterface, DomainInstruction } from '#domain';

export interface IFollowersService
  extends DomainInstruction.IGetFollowers,
    DomainInstruction.IAddFollowers,
    DomainInstruction.IRemoveFollowers,
    DomainInstruction.ISearchUser {
  readonly followers$: Signal<DomainInterface.IFollowerUser[]>;
  readonly isLoadingFollowers$: Signal<boolean>;
  readonly isErrorFollowers$: Signal<boolean>;
}
