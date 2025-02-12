import { DomainTokens, ILogger } from "@domain";
import { DomainContainerForDecorator } from '@domain';

export function DebugMethod() {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const time = performance.now();
      const logger: ILogger | undefined = DomainContainerForDecorator.get(DomainTokens.LoggerServiceDebugToken);
      logger?.info(target.constructor.name, `${methodName}(`, arg, `)`);
      const result = method?.apply(this, arg);
      logger?.info(target.constructor.name, `${methodName}() =>`, result);
      logger?.time(target.constructor.name, performance.now() - time);
      return result;
    };
  };
}
