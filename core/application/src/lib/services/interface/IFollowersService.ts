import { Signal } from '@angular/core';
import { DomainInterface, DomainInstruction } from '#domain';

export interface IFollowersService extends DomainInstruction.IGetFollowers, DomainInstruction.IAddFollowers, DomainInstruction.IRemoveFollowers, DomainInstruction.ISearchUser {
  readonly followers: Signal<DomainInterface.IFollowerUser[]>;
  readonly isLoadingGetFollowers: Signal<boolean>;
  readonly isErrorGetFollowers: Signal<boolean>;
  readonly isLoadingAddFollower: Signal<boolean>;
  readonly isErrorAddFollower: Signal<boolean>;
  readonly isLoadingRemoveFollower: Signal<boolean>;
  readonly isErrorRemoveFollower: Signal<boolean>;
}
