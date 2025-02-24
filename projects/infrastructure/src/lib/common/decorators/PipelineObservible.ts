import { InjectionToken } from '@angular/core';
import { IPipelineBehevior } from '../../interface';
import { InfrastructureContainerForDecorator } from '../../containerForDecorator';
import { pipeConveyor } from '../pipe/pipeConveyor';

export function PipelineObservible(token: InjectionToken<IPipelineBehevior>) {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const respClass: IPipelineBehevior[] = InfrastructureContainerForDecorator.get(token);
      return method?.apply(this, arg).pipe(pipeConveyor(respClass));
    };
  };
}

