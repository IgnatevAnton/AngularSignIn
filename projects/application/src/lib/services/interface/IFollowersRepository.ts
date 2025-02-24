import { Observable } from 'rxjs';
import { DomainInterface } from '#domain';

export interface IFollowersRepository {
  getFollowers(group: string, page: number): Observable<DomainInterface.IFollowerUser[]>;
  addFollowers(group: string, followers: DomainInterface.IFollowerUser[]): Observable<boolean>;
  removeFollowers(group: string, followers: DomainInterface.IFollowerUser[]): Observable<boolean>;
  searchUser(query: string): Promise<DomainInterface.IFollowerUser[]>;
}
