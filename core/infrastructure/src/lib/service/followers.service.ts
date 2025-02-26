import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { ISender } from '@cqrs';
import { DomainDecoators, DomainInterface, DomainServices, DomainTokens } from '#domain';
import { ApplicationServices } from '#application';

import { SenderToken } from '../tokens';
import { StatusRequest } from '../entities/StatusRequest';
import { UserGroupFollowersQuery } from '../repository';

@Injectable()
export class FollowersService implements ApplicationServices.IFollowersService {
  private _title = '_FollowersService';
  private _timeoutMillisecondCleanError = 2000;
  private _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, {
    optional: true,
  });
  private _sender: ISender = inject(SenderToken);

  private _followers$: WritableSignal<DomainInterface.IFollowerUser[]> = signal<DomainInterface.IFollowerUser[]>([]);
  get followers$(): Signal<DomainInterface.IFollowerUser[]> {
    return this._followers$.asReadonly();
  }
  private _followersListStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);

  public isLoadingFollowers$ = this._followersListStatus.isLoading;
  public isErrorFollowers$ = this._followersListStatus.isError;

  @DomainDecoators.DebugMethod()
  getFollowers(group: string, page: number): void {
    this._followersListStatus.set(true, false, null);
    const response: Observable<DomainInterface.IFollowerUser[] | null> =
      this._sender.send(new UserGroupFollowersQuery(group, page)) ?? of(null);
    response.pipe(take(1)).subscribe({
      next: (followers: DomainInterface.IFollowerUser[] | null) => {
        this._logger?.info(this._title, 'check() ', 'next =>', followers);
        if (followers === null) {
          this._followersListStatus.set(false, true, null);
          return;
        }
        this._followers$.set([...this._followers$(), ...followers]);
        this._followersListStatus.set(false, false, null);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._followersListStatus.set(false, true, null);
      },
    });
  }

  @DomainDecoators.DebugMethod()
  addFollowers(group: string, follower: DomainInterface.IFollowerUser): void {
    throw new Error('Method not implemented.');
  }

  @DomainDecoators.DebugMethod()
  removeFollowers(group: string, follower: DomainInterface.IFollowerUser): void {
    throw new Error('Method not implemented.');
  }

  @DomainDecoators.DebugMethod()
  searchUser(userName: string): void {
    throw new Error('Method not implemented.');
  }
}
