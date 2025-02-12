import { InjectionToken } from "@angular/core";
import { ILogger } from "./interface/ILogger";

export const LoggerServiceInfoToken = new InjectionToken<ILogger>("LoggerServiceInfoToken");
export const LoggerServiceDebugToken = new InjectionToken<ILogger>("LoggerServiceDebugToken");
export const LoggerTimeThreshold = new InjectionToken<number>("LoggerTimeThreshold");
