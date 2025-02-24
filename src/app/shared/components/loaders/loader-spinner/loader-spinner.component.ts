import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderSpinnerComponent {}
