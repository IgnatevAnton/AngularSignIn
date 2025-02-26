/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken } from '@angular/core';
import { IPipelineBehevior } from '../../interface';
import { pipeConveyor } from '../pipe/pipeConveyor';
import { InfrastructureContainerForDecorator } from '../../entities/ContainerForDecorator';

export function PipelineObservible(token: InjectionToken<IPipelineBehevior>) {
  return function (target: object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const respClass: IPipelineBehevior[] = InfrastructureContainerForDecorator.get(token);
      return method?.apply(this, arg).pipe(pipeConveyor(respClass));
    };
  };
}
