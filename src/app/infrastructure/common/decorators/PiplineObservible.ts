import { InjectionToken } from '@angular/core';
import { pipeConveyor } from '@infrastructure/common/pipe/pipeConveyor';
import { InfrastructureContainerForDecorator, InfrsatructureInterface } from '@infrastructure';

export function PiplineObservible(token: InjectionToken<InfrsatructureInterface.IPipelineBehevior>) {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const respClass: InfrsatructureInterface.IPipelineBehevior[] = InfrastructureContainerForDecorator.get(token);
      return method?.apply(this, arg).pipe(pipeConveyor(respClass));
    };
  };
}

