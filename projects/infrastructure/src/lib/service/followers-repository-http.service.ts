import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationServices, ApplicationTokens } from '#application';

@Injectable()
export class FollowersRepositoryHttpService implements ApplicationServices.IFollowersRepository {
  private _url: string = inject(ApplicationTokens.URL_REST_API);
  private _client: HttpClient = inject(HttpClient);

  @DomainDecoators.DebugMethod()
  getFollowers(group: string, page: number): Observable<DomainInterface.IFollowerUser[]> {
    return of([]);
  }

  @DomainDecoators.DebugMethod()
  addFollowers(group: string, followers: DomainInterface.IFollowerUser[]): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  @DomainDecoators.DebugMethod()
  removeFollowers(group: string, followers: DomainInterface.IFollowerUser[]): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  @DomainDecoators.DebugMethod()
  searchUser(query: string): Promise<DomainInterface.IFollowerUser[]> {
    throw new Error('Method not implemented.');
  }
}
