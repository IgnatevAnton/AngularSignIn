import { pipeConveyor } from '../pipe/pipeConveyor';
import { IPipelineBehevior } from '../../interface/IPipelineBehevior';
import { InfrastructureContainerForDecorator } from '../../containerForDecorator';
import { InfrastructureTokens } from '../..';

export function PiplineObservible() {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const respClass: IPipelineBehevior[] = InfrastructureContainerForDecorator.get(InfrastructureTokens.PiplineUserTokens);
      return method?.apply(this, arg).pipe(pipeConveyor(respClass));
    };
  };
}

