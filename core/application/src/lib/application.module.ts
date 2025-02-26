import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DefaultSettingBarsToken, URL_REST_API } from './tokens';
import { ISettingBar } from './interface';

@NgModule({
  providers: [
    { provide: URL_REST_API, useValue: 'https://localhost:7069/' },
    { provide: DefaultSettingBarsToken, useValue: new Map<string, ISettingBar>() },
  ],
  imports: [HttpClientModule],
})
export class ApplicationModule {}
