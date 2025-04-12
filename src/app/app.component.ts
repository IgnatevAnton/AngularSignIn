import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { injectStore, STORE_DISPATCHER_TOKEN } from '@cqrs';
import { DomainInterface } from '#domain';
import { ApplicationTokens, ApplicationRequest } from '#application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  public readonly title = '_AppComponent';

  private readonly _dispatcher = inject(STORE_DISPATCHER_TOKEN);
  private readonly _store = injectStore(ApplicationTokens.AUTHORIZATION_STORE);

  public readonly user: Signal<DomainInterface.IUser | null>;
  public readonly isCheckUser: Signal<boolean>;

  constructor() {
    this.user = this._store.user.value;
    this.isCheckUser = this._store.isCheckUser.value;
  }

  ngOnInit() {
    this._dispatcher.send(new ApplicationRequest.user.UserCheckAction());
  }
}
