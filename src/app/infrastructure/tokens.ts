import { InjectionToken } from "@angular/core";
import { IPipelineBehevior } from "@infrastructure/interface/IPipelineBehevior";

export const PiplineUserTokens = new InjectionToken<IPipelineBehevior>("PiplineUserTokens");
