import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { DomainDecoators, DomainInterface, DomainServices, DomainTokens } from '#domain';
import { take } from 'rxjs';
import { IFollowersService } from './interface/IFollowersService';
import { IFollowersRepository } from './interface/IFollowersRepository';
import { FollowersRepositoryToken } from '../tokens';

@Injectable()
export class FollowersService implements IFollowersService {

  private _title: string = "_FollowersService";
  private _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  private _followersRepository: IFollowersRepository = inject(FollowersRepositoryToken);
  private _followers$: WritableSignal<DomainInterface.IFollowerUser[]> = signal<DomainInterface.IFollowerUser[]>([]);
  private _isLoadingFollowers: WritableSignal<boolean> = signal(false);
  private _isErrorFollowers: WritableSignal<boolean> = signal(false);

  get followers$(): Signal<DomainInterface.IFollowerUser[]> { return this._followers$.asReadonly(); }
  get isLoadingFollowers$(): Signal<boolean> { return this._isLoadingFollowers.asReadonly(); }
  get isErrorFollowers$(): Signal<boolean> { return this._isErrorFollowers.asReadonly(); }

  @DomainDecoators.DebugMethod()
  getFollowers(group:string, page: number): void {
    this._isLoadingFollowers.set(true);
    this._followersRepository.getFollowers(group, page).pipe(take(1)).subscribe({
      next: (followers: DomainInterface.IFollowerUser[]) => {
        this._logger?.info(this._title, "check() ", "next =>", followers);
        this._followers$.set([...this._followers$(), ...followers]);
        this._isErrorFollowers.set(false);
        this._isLoadingFollowers.set(false);
      },
      error: (error) => {
        this._logger?.warning(this._title, error);
        this._isErrorFollowers.set(true);
        this._isLoadingFollowers.set(false);
      }
    });
  }

@DomainDecoators.DebugMethod()
addFollowers(group:string, follower: DomainInterface.IFollowerUser): void {
  throw new Error('Method not implemented.');
}

@DomainDecoators.DebugMethod()
removeFollowers(group:string, follower: DomainInterface.IFollowerUser): void {
  throw new Error('Method not implemented.');
}

@DomainDecoators.DebugMethod()
searchUser(userName: string): void {
  throw new Error('Method not implemented.');
}

}
