import { DomainInterface } from '#domain';
import { Command } from '@cqrs';
import { Observable } from 'rxjs';

export class AddFollowersInGroupCommand extends Command<Observable<boolean>> {
  get group() {
    return this._group;
  }
  get follower() {
    return this._follower;
  }

  constructor(
    private _group: string,
    private _follower: DomainInterface.IFollowerUser
  ) {
    super();
  }
}
