import { Inject, NgModule } from '@angular/core';
import { ApplicationTokens } from '#application';
import { SettingListBarsComponent } from '#presentation/features/setting-list-bars/components/setting-list-bars/setting-list-bars.component';
import { PanelComponent } from '#presentation/shared/components/panel/panel.component';
import { DefaultSettingListBars } from '../../constants/DefaultSettingBar/DefaultSettingListBars';



@NgModule({
  declarations: [ SettingListBarsComponent ],
  imports: [ PanelComponent ],
  exports: [SettingListBarsComponent]
})
export class SettingListBarsModule {
  constructor(
    @Inject(ApplicationTokens.DefaultSettingBarsToken) defaultSettingBars: Map<string, any>
  ) {
    defaultSettingBars.set(DefaultSettingListBars.name, DefaultSettingListBars);
  }
}
