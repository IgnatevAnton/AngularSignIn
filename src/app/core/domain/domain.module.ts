import { Inject, isDevMode, NgModule, Optional, Provider } from '@angular/core';
import { DomainTokens, DomainServices } from '@domain';
import { DomainContainerForDecorator } from './containerForDecorator';
import { LocalLoggerService } from './services/local-logger.service';
import { User } from './entities/User';
import { UserRegistration } from './entities/UserRegistration';

const providersDev: Provider[] = [
  { provide: DomainTokens.LoggerServiceDebugToken, useClass: LocalLoggerService }
];

@NgModule({
  providers: [
    { provide: DomainTokens.LoggerTimeThreshold, useValue: 1000 },
    { provide: DomainTokens.LoggerServiceInfoToken, useClass: LocalLoggerService },
    { provide: DomainTokens.FactoryUserToken, useValue: () => new User() },
    { provide: DomainTokens.FactoryUserRegistrationToken, useValue: () => new UserRegistration() },
    ...(isDevMode() ? providersDev : [])
  ]
})
export class DomainModule {
  constructor(@Optional() @Inject(DomainTokens.LoggerServiceDebugToken) loggerDebug?: DomainServices.ILoggerService | undefined) {
    DomainContainerForDecorator.set(DomainTokens.LoggerServiceDebugToken, loggerDebug);
  }
}
