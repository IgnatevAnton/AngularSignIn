import { ChangeDetectionStrategy, Component, Inject, Signal } from '@angular/core';
import { DomainInterface } from '#domain';
import { ApplicationTokens, ApplicationServices } from '#application';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public readonly title = '_AppComponent';
  public readonly user$: Signal<DomainInterface.IUser | null>;
  public readonly isCheckUser$: Signal<boolean>;
  private _authorizeService: ApplicationServices.IAuthorizeService;

  constructor(
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizeService: ApplicationServices.IAuthorizeService
  ) {
    this._authorizeService = authorizeService;
    this.user$ = this._authorizeService.user$;
    this.isCheckUser$ = this._authorizeService.isCheck$;
  }

  //ngOnInit() {
  //  console.log("ngOnInit");
  //}
  //
  //ngDoCheck() {
  //  console.log("ngDoCheck");
  //}
  //
  //ngOnChanges() {
  //  console.log("ngOnChanges");
  //}

  ngAfterContentInit() {
    //console.log("ngAfterContentInit");
    this._authorizeService?.check();
    //setTimeout(() => { this._authorizeService?.login("Anton", "12345") }, 5000);
    //setTimeout(() => { this._authorizeService?.login("Anton2", "12345") }, 10000);
  }

  //ngAfterContentChecked() {
  //  console.log("ngAfterContentChecked");
  //}
  //
  //ngAfterViewInit() {
  //  console.log("ngAfterViewInit");
  //}

}
