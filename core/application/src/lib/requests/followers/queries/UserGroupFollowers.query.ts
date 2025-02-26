import { DomainInterface } from '#domain';
import { IQuery } from '@cqrs';
import { Observable } from 'rxjs';

export class UserGroupFollowersQuery extends IQuery<Observable<DomainInterface.IFollowerUser[] | null>> {
  private _group: string;
  private _page: number;
  get group() {
    return this._group;
  }
  get page() {
    return this._page;
  }

  constructor(group: string, page: number) {
    super();
    this._group = group;
    this._page = page;
  }
}
