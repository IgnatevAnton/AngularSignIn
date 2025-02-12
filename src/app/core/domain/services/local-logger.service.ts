import { Inject, Injectable, Optional } from '@angular/core';
import { ILogger } from '@domain/interface/ILogger';
import { DomainTokens } from '..';

@Injectable()
export class LocalLoggerService implements ILogger {
  private _timeThreshold: number = 30000;

  constructor(@Optional() @Inject(DomainTokens.LoggerTimeThreshold) timeThreshold?: number | undefined) {
    if (timeThreshold) {
      this._timeThreshold = timeThreshold;
    }
  }

  info(name: string, ...message: any[]): void {
    console.info(` [${name}] `, ...message, ` `);
  }
  warning(name: string, ...message: any[]): void {
    console.warn(` [${name}] `, ...message, ` `);
  }
  error(name: string, ...message: any[]): void {
    console.error(` [${name}] `, ...message , ` `);
  }
  time(name: string, time: number): void {
    const logMessage = ` [${name}] time: ${time.toFixed(2) } ms `;
    if (time > this._timeThreshold) {
      console.warn(`%c${logMessage}`, "color:white; background-color:#aa1d1d;");
    } else {
      console.log(`%c${logMessage}`, "color:white; background-color:green; ");
    }
  }
}
