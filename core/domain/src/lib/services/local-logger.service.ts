/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Optional } from '@angular/core';
import { ILoggerService } from './interface/ILoggerService';
import { LoggerTimeThreshold } from '../tokens';

@Injectable()
export class LocalLoggerService implements ILoggerService {
  private _timeThreshold = 30000;

  constructor(@Optional() @Inject(LoggerTimeThreshold) timeThreshold?: number | undefined) {
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
    console.error(` [${name}] `, ...message, ` `);
  }
  time(name: string, time: number): void {
    const logMessage = ` [${name}] time: ${time.toFixed(2)} ms `;
    if (time > this._timeThreshold) {
      console.warn(`${logMessage}`);
    } else {
      console.log(`%c${logMessage}`, 'color:white; background-color:#9bb894; ');
    }
  }
}
