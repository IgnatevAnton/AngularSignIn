import { Component, effect, Inject, Input } from '@angular/core';
import { DomainDecoators } from '@domain';
import { ApplicationInterfaces, ApplicationServices, ApplicationTokens, BarNames } from '@application';
import { DragAndDropDirective } from '@presentation/shared/directives/drag-and-drop.directive';



@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  imports: [DragAndDropDirective]
})
export class PanelComponent {

  @Input() public name!: BarNames;
  private _settingInterfaceService: ApplicationServices.ISettingInterfaceService;
  private _setting: ApplicationInterfaces.ISettingBar | undefined;
  get setting(): ApplicationInterfaces.ISettingBar | undefined { return this._setting; }

  public isStartDrag: boolean = false;

  constructor(
    @Inject(ApplicationTokens.SettingInterfaceServiceToken) settingInterface: ApplicationServices.ISettingInterfaceService,
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizationService: ApplicationServices.IAuthorizeService,
  ) {
    this._settingInterfaceService = settingInterface;
    const keySetting = (authorizationService.user$()?.uid ?? "") + "_" + _NGX_ENV_.NG_APP_VERSION;
    this._settingInterfaceService.loadSetting(keySetting);
    effect(() => {
      this._setting = this._settingInterfaceService.settings().get(this.name);
    });
  }

  @DomainDecoators.DebugMethod()
  onStartDrag() { this.isStartDrag = true; }

  @DomainDecoators.DebugMethod()
  onEndDrop(coord: { x: number, y: number }) {
    this.isStartDrag = false;
    const userProfileBar = this._settingInterfaceService.settings().get(this.name);
    if (userProfileBar === undefined) { return; }
    userProfileBar.position.y = coord.y;
    userProfileBar.position.x = coord.x;
    this._settingInterfaceService.setSettingBar(this.name, userProfileBar);
  }

  @DomainDecoators.DebugMethod()
  onClose() {
    if (this._setting === undefined) { return; }
    this._setting.isVisible = !this._setting.isVisible;
    this._settingInterfaceService.setSettingBar(this.name, this._setting);
  }

}
