import { DomainContainerForDecorator } from "../containerForDecorator";
import { ILoggerService } from "../services/interface/ILoggerService";
import { LoggerServiceDebugToken } from "../tokens";

export function DebugMethod() {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...arg: any[]) {
      const time = performance.now();
      const logger: ILoggerService | undefined = DomainContainerForDecorator.get(LoggerServiceDebugToken);
      logger?.info(target.constructor.name, `${methodName}(`, arg, `)`);
      const result = method?.apply(this, arg);
      logger?.info(target.constructor.name, `${methodName}() =>`, result);
      logger?.time(target.constructor.name, performance.now() - time);
      return result;
    };
  };
}
