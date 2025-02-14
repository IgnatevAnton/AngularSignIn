import { pipeConveyor } from '@infrastructure/common/pipe/pipeConveyor';
import { IPipelineBehevior } from '@infrastructure/interface/IPipelineBehevior';
import { InfrastructureContainerForDecorator } from '@infrastructure/containerForDecorator';
import { InjectionToken } from '@angular/core';

export function PiplineObservible(token: InjectionToken<IPipelineBehevior>) {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const respClass: IPipelineBehevior[] = InfrastructureContainerForDecorator.get(token);
      return method?.apply(this, arg).pipe(pipeConveyor(respClass));
    };
  };
}

