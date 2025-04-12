import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { DomainDecoators, DomainInterface } from '#domain';
import { ApplicationRequest, ApplicationServices, ApplicationTokens, BarNames } from '#application';
import { STORE_DISPATCHER_TOKEN } from '@cqrs';
import { injectStore } from 'libs/cqrs/src/public-api';

@Component({
  selector: 'app-user-profile-bar',
  standalone: false,
  templateUrl: './user-profile-bar.component.html',
  styleUrl: './user-profile-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileBarComponent {

  private readonly _dispatcher = inject(STORE_DISPATCHER_TOKEN);
  private readonly _authorizationStore = injectStore(ApplicationTokens.AUTHORIZATION_STORE);

  private readonly _settingInterfaceService: ApplicationServices.ISettingInterfaceService = inject(ApplicationTokens.SettingInterfaceServiceToken);

  public name = BarNames.USER_PROFILE_BAR;
  public user: Signal<DomainInterface.IUser | null> = this._authorizationStore.user.value;

  @DomainDecoators.DebugMethod()
  logout() { this._dispatcher.send(new ApplicationRequest.user.UserLogoutAction()); }

  @DomainDecoators.DebugMethod()
  openUserProfile() { this.openBar(BarNames.USER_PROFILE); }

  @DomainDecoators.DebugMethod()
  openFollowers() { this.openBar(BarNames.FOLLOWERS_BAR); }

  @DomainDecoators.DebugMethod()
  openSettingBars() { this.openBar(BarNames.SETTING_LIST_BARS); }

  private openBar(name: BarNames) {
    const setting = this._settingInterfaceService.settings().get(name);
    if (setting === undefined) { return; }
    setting.isVisible = !setting.isVisible;
    this._settingInterfaceService.setSettingBar(name, setting);
  }

}
