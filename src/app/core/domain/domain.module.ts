import { Inject, isDevMode, NgModule, Optional, Provider } from '@angular/core';
import { DomainTokens, ILogger } from '@domain';
import { LocalLoggerService } from './services/local-logger.service';
import { DomainContainerForDecorator } from '@domain/containerForDecorator';

const providersDev: Provider[] = [
  { provide: DomainTokens.LoggerServiceDebugToken, useClass: LocalLoggerService }
];

@NgModule({
  providers: [
    { provide: DomainTokens.LoggerTimeThreshold, useValue: 1000 },
    { provide: DomainTokens.LoggerServiceInfoToken, useClass: LocalLoggerService },
    ...(isDevMode() ? providersDev : [])
  ]
})
export class DomainModule {
  constructor(@Optional() @Inject(DomainTokens.LoggerServiceDebugToken) loggerDebug?: ILogger | undefined) {
    DomainContainerForDecorator.set(DomainTokens.LoggerServiceDebugToken, loggerDebug);
  }
}
