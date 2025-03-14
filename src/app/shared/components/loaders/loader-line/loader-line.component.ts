import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-line',
  standalone: true,
  templateUrl: './loader-line.component.html',
  styleUrl: './loader-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderLineComponent {}
