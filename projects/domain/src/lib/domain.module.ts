import { Inject, isDevMode, NgModule, Optional, Provider } from '@angular/core';
import { DomainContainerForDecorator } from './containerForDecorator';
import { LocalLoggerService } from './services/local-logger.service';
import { User } from './entities/User';
import { UserRegistration } from './entities/UserRegistration';
import { FactoryUserRegistrationToken, FactoryUserToken, LoggerServiceDebugToken, LoggerServiceInfoToken, LoggerTimeThreshold } from './tokens';
import { ILoggerService } from './services';

const providersDev: Provider[] = [
  { provide: LoggerServiceDebugToken, useClass: LocalLoggerService }
];

@NgModule({
  providers: [
    { provide: LoggerTimeThreshold, useValue: 1000 },
    { provide: LoggerServiceInfoToken, useClass: LocalLoggerService },
    { provide: FactoryUserToken, useValue: () => new User() },
    { provide: FactoryUserRegistrationToken, useValue: () => new UserRegistration() },
    ...(isDevMode() ? providersDev : [])
  ]
})
export class DomainModule {
  constructor(@Optional() @Inject(LoggerServiceDebugToken) loggerDebug?: ILoggerService | undefined) {
    DomainContainerForDecorator.set(LoggerServiceDebugToken, loggerDebug);
  }
}
