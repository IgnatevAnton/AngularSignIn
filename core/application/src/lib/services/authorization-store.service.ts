import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { IStoreFieldArray, IStoreLoaderSort, StoreFieldArray, StoreFieldTransferType, StoreTypeSort } from '@cqrs';
import { DomainInterface, RegistrationStatusErrors } from '#domain';
import { IAuthorizeServiceStore } from './interface/IAuthorizeServiceStore';
import { StatusRequest } from '../entities';

@Injectable()
export class AuthorizationStoreService implements IAuthorizeServiceStore {

  private readonly _client: HttpClient = inject(HttpClient);
  private time = performance.now();
  private readonly _timeoutMillisecondCleanError = 2000;
  //private readonly _list: IStoreFieldArray<DomainInterface.IUser> = new StoreFieldArray();

  user: WritableSignal<DomainInterface.IUser | null> = signal(null);
  numberTimeoutRepeatSendCode: WritableSignal<number> = signal(0);
  userCheckStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  userLoginStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);
  userRegistrationStatus = new StatusRequest<RegistrationStatusErrors[] | null>(this._timeoutMillisecondCleanError);
  userVerificationStatus = new StatusRequest<null>(this._timeoutMillisecondCleanError);

  constructor() {

    console.log(`%c${performance.now() - this.time}, `, 'color:red; background-color:#9bb894; ');

    //// ----------------------------------
    //// ----filter
    //setInterval(() => {
    //  this.time = performance.now();
    //  const indxs = [];
    //  for (let i = 0; i < this._data().length; i++) {
    //    indxs.push(i);
    //  }
    //  console.log(`%c${performance.now() - this.time}, `, 'color:red; background-color:#9bb894; ');
    //}, 5000);
    //// ----------------------------------

    // ----------------------------------
    // ----search
    //const fields: string[] = ["name", "email"];
    //const search = "er1";
    //
    //const d = this._data();
    //setInterval(() => {
    //  this.time = performance.now();
    //  const indxs: number[] = [];
    //  for (let i = 0; i < d.length; i++) {
    //    let isValide = false;
    //    for (const key of fields) {
    //      if (`${d[i][key as keyof DomainInterface.IUser]}`.toLocaleLowerCase().includes(`${search}`)) { isValide = true; break; }
    //    }
    //    if (!isValide) { continue; }
    //    //const index = i + (message.data.number ?? 0) * data.length;
    //    indxs.push(i);
    //  }
    //  console.log(`%c${performance.now() - this.time}, `, 'color:red; background-color:#9bb894; ');
    //}, 5000);
    // ----------------------------------

    // ----------------------------------
    // -----sort-------------------------
    //const d = this._data();
    //setInterval(() => {
    //  this.time = performance.now();
    //  d.sort(fieldSorter(["name", "-email"]));
    //  console.log(`%c${performance.now() - this.time}, `, 'color:red; background-color:#9bb894; ');
    //}, 5000);

    //const sortName: IStoreLoaderSort<DomainInterface.IUser> = new Map([
    //  ["name", StoreTypeSort.DESC],
    //  ["email", StoreTypeSort.DESC]
    //]);

    //this._list.fetch({
    //  data: { url: "https://localhost:7069/api/user/followers", method: StoreFetchMethods.GET },
    //  sorts: [sortName],
    //  transferType: StoreFieldTrasnferType.BUFFER,
    //});
    //setTimeout(() => {
    //  this._list.sort(sortName);
    //  setInterval(() => {
    //    this._list.search(["name"], "er10");
    //  }, 10000);
    //}, 10000);

    //this._client.get<DomainInterface.IUser[]>(
    //  "https://localhost:7069/api/user/followers",
    //  { responseType: 'json', withCredentials: true }
    //)
    //  .pipe(take(1))
    //  .subscribe((data) => {
    //    this._list.set({ data, sorts: [sortName], transferType: StoreFieldTransferType.URL });
    //    setTimeout(() => {
    //      this._list.sort(sortName);
    //      setInterval(() => {
    //        this._list.search(["name"], "er10");
    //      }, 10000);
    //    }, 10000);
    //  });
    //
    //effect(() => {
    //  console.log("AuthorizationStoreService", this._list.value());
    //});

  }
}
