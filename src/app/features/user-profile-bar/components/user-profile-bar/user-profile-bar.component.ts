import { ChangeDetectionStrategy, Component, Inject, Signal } from '@angular/core';
import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationServices, ApplicationTokens, BarNames } from '#application';

@Component({
  selector: 'app-user-profile-bar',
  standalone: false,
  templateUrl: './user-profile-bar.component.html',
  styleUrl: './user-profile-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileBarComponent {
  private _authorizationService: ApplicationServices.IAuthorizeService;
  private _settingInterfaceService: ApplicationServices.ISettingInterfaceService;

  public name = BarNames.USER_PROFILE_BAR;
  public user$: Signal<DomainInterface.IUser | null>;

  constructor(
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: ApplicationServices.IAuthorizeService,
    @Inject(ApplicationTokens.SettingInterfaceServiceToken)
    settingInterface: ApplicationServices.ISettingInterfaceService
  ) {
    this._settingInterfaceService = settingInterface;
    this._authorizationService = authorizationService;
    this.user$ = authorizationService.user$;
  }

  @DomainDecoators.DebugMethod()
  logout() {
    this._authorizationService.logout();
  }

  @DomainDecoators.DebugMethod()
  openUserProfile() {
    const userProfile = this._settingInterfaceService.settings().get(BarNames.USER_PROFILE);
    if (userProfile === undefined) {
      return;
    }
    userProfile.isVisible = !userProfile.isVisible;
    this._settingInterfaceService.setSettingBar(BarNames.USER_PROFILE, userProfile);
  }

  @DomainDecoators.DebugMethod()
  openFollowers() {
    const followers = this._settingInterfaceService.settings().get(BarNames.FOLLOWERS_BAR);
    if (followers === undefined) {
      return;
    }
    followers.isVisible = !followers.isVisible;
    this._settingInterfaceService.setSettingBar(BarNames.FOLLOWERS_BAR, followers);
  }

  @DomainDecoators.DebugMethod()
  openSettingBars() {
    const settingBars = this._settingInterfaceService.settings().get(BarNames.SETTING_LIST_BARS);
    if (settingBars === undefined) {
      return;
    }
    settingBars.isVisible = !settingBars.isVisible;
    this._settingInterfaceService.setSettingBar(BarNames.SETTING_LIST_BARS, settingBars);
  }
}
