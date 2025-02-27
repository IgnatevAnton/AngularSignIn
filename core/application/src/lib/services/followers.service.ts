import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { DomainDecoators, DomainInterface } from '#domain';
import { IFollowersService } from './interface/IFollowersService';
import { AddFollowersInGroupCommand, GetGroupFollowersQuery, RemoveFollowersFromGroupCommand } from '../requests/followers';
import { BaseService, StatusRequest } from '../entities';

@Injectable()
export class FollowersService extends BaseService implements IFollowersService {
  private _followers: WritableSignal<DomainInterface.IFollowerUser[]> = signal<DomainInterface.IFollowerUser[]>([]);

  private _getStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _addStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  private _removeStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  get followers(): Signal<DomainInterface.IFollowerUser[]> {
    return this._followers.asReadonly();
  }

  public readonly isLoadingGetFollowers = this._getStatus.isLoading;
  public readonly isErrorGetFollowers = this._getStatus.isError;
  public readonly isLoadingAddFollower = this._addStatus.isLoading;
  public readonly isErrorAddFollower = this._addStatus.isError;
  public readonly isLoadingRemoveFollower = this._removeStatus.isLoading;
  public readonly isErrorRemoveFollower = this._removeStatus.isError;

  constructor() {
    super('_FollowersService');
  }

  @DomainDecoators.DebugMethod()
  getFollowers(group: string, page: number): void {
    const request = new GetGroupFollowersQuery(group, page);
    const callbackSuccess = (value: DomainInterface.IFollowerUser[]) => this._followers.set([...this._followers(), ...value]);
    this.handlerResponseObservable('getFollowers', request, this._getStatus, null, callbackSuccess);
  }

  @DomainDecoators.DebugMethod()
  addFollowers(group: string, follower: DomainInterface.IFollowerUser): void {
    const request = new AddFollowersInGroupCommand(group, follower);
    const callbackSuccess = () => this._followers.set([...this._followers(), follower]);
    this.handlerResponseObservable('addFollowers', request, this._addStatus, false, callbackSuccess);
  }

  @DomainDecoators.DebugMethod()
  removeFollowers(group: string, follower: DomainInterface.IFollowerUser): void {
    const request = new RemoveFollowersFromGroupCommand(group, follower);
    const callbackSuccess = () => this._followers.set(this._followers().filter((f) => f !== follower));
    this.handlerResponseObservable('removeFollowers', request, this._removeStatus, false, callbackSuccess);
  }

  @DomainDecoators.DebugMethod()
  searchUser(userName: string): void {
    this._logger?.warning(this._title, 'Method not implemented searchUser');
  }
}
