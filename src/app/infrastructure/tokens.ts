import { InjectionToken } from "@angular/core";
import { IPipelineBehevior } from "@infrastructure/interface/IPipelineBehevior";

export const PipelineUserTokens = new InjectionToken<IPipelineBehevior>("PiplineUserTokens");
