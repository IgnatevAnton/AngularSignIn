import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarNames } from '#application';

@Component({
  selector: 'app-setting-list-bars',
  standalone: false,
  templateUrl: './setting-list-bars.component.html',
  styleUrl: './setting-list-bars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingListBarsComponent {
  public name: BarNames = BarNames.SETTING_LIST_BARS;
}
