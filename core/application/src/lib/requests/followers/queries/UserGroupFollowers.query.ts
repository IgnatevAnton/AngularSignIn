import { DomainInterface } from '#domain';
import { IQuery } from '@cqrs';
import { Observable } from 'rxjs';

export class UserGroupFollowersQuery extends IQuery<Observable<DomainInterface.IFollowerUser[] | null>> {

  get group() { return this._group; }
  get page() { return this._page; }

  constructor(
    private _group: string,
    private _page: number
  ) {
    super();
  }

}
