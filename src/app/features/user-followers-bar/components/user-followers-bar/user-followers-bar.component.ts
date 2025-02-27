import { ChangeDetectionStrategy, Component, effect, Inject, Signal } from '@angular/core';
import { DomainInterface } from '#domain';
import { ApplicationServices, ApplicationTokens, BarNames } from '#application';

@Component({
  selector: 'app-user-followers-bar',
  standalone: false,
  templateUrl: './user-followers-bar.component.html',
  styleUrl: './user-followers-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFollowersBarComponent {
  public name: BarNames = BarNames.FOLLOWERS_BAR;
  private _isInitialFollowersData = false;
  private _followersService: ApplicationServices.IFollowersService;
  private _userUID = '';
  public followers: Signal<DomainInterface.IFollowerUser[]>;

  constructor(
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: ApplicationServices.IAuthorizeService,
    @Inject(ApplicationTokens.FollowersServiceToken) followersService: ApplicationServices.IFollowersService,
    @Inject(ApplicationTokens.SettingInterfaceServiceToken)
    settingInterfaceService: ApplicationServices.ISettingInterfaceService
  ) {
    this._followersService = followersService;
    this.followers = this._followersService.followers;

    effect(() => {
      const uid = authorizationService.user()?.uid;
      if (uid === undefined) {
        return;
      }
      this._userUID = uid;
    });

    effect(() => {
      const isVisible: boolean | undefined = settingInterfaceService.settings().get(BarNames.FOLLOWERS_BAR)?.isVisible;
      if (isVisible === undefined || isVisible === this._isInitialFollowersData) {
        return;
      }
      this._isInitialFollowersData = isVisible;
      if (!isVisible) {
        return;
      }
      this.initialFollowersData();
    });
  }

  private initialFollowersData() {
    this._followersService.getFollowers(this._userUID, 0);
  }
}
