/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ISender, Query, Command } from '@cqrs';
import { DomainServices, DomainTokens } from '#domain';
import { Observable, take } from 'rxjs';
import { StatusRequest } from './StatusRequest';
import { SenderToken } from '../tokens';

export abstract class BaseService {
  protected _title: string;
  protected _timeoutMillisecondCleanError = 2000;
  protected _logger?: DomainServices.ILoggerService | null = inject(DomainTokens.LoggerServiceDebugToken, { optional: true });
  protected _sender: ISender = inject(SenderToken);
  constructor(serviceName: string) {
    this._title = serviceName;
  }

  protected handlerResponseObservable<TResp, TError>(
    methodName: string,
    request: Query<Observable<TResp | null>> | Command<Observable<TResp | null>>,
    status?: StatusRequest<any>,
    incorrectDataValue?: TError,
    callbackSuccess?: (value: TResp) => void,
    callbackError?: (error: any) => void,
    errorMessage?: any
  ): void {
    status?.set(true, false, null);
    const requestName = Object.getPrototypeOf(request).constructor.name;
    const response: Observable<TResp | TError> | undefined = this._sender.send(request);
    if (response === undefined) {
      status?.set(false, true, null);
      this._logger?.warning(this._title, `not implemented ${requestName}`);

      return;
    }
    response.pipe(take(1)).subscribe({
      next: (value: TResp | null | TError) => {
        this._logger?.info(this._title, `${methodName}() `, 'next =>', value);
        if (incorrectDataValue === undefined || value !== incorrectDataValue) {
          status?.set(false, false, null);
          if (callbackSuccess) {
            callbackSuccess(value as TResp);
          }
        } else {
          status?.set(false, true, errorMessage ?? null);
          if (callbackError) {
            callbackError(errorMessage ?? null);
          }
          this._logger?.warning(this._title, `error in implemented ${requestName}`);
        }
      },
      error: (error) => {
        status?.set(false, true, errorMessage ?? null);
        this._logger?.warning(this._title, error);
        if (callbackError) {
          callbackError(error);
        }
      },
    });
  }
}
