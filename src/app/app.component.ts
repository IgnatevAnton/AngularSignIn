import { ChangeDetectionStrategy, Component, Inject, OnInit, Signal } from '@angular/core';
import { DomainInterface } from '#domain';
import { ApplicationTokens, ApplicationServices } from '#application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private _authorizeService: ApplicationServices.IAuthorizeService;
  public readonly title = '_AppComponent';
  public readonly user: Signal<DomainInterface.IUser | null>;
  public readonly isCheckUser: Signal<boolean>;

  constructor(@Inject(ApplicationTokens.AuthorizationServiceToken) authorizeService: ApplicationServices.IAuthorizeService) {
    this._authorizeService = authorizeService;
    this.user = this._authorizeService.user;
    this.isCheckUser = this._authorizeService.isCheck;
  }
  ngOnInit() {
    this._authorizeService?.check();
  }
}
