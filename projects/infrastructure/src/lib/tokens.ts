import { InjectionToken } from "@angular/core";
import { IPipelineBehevior, IUserResponse } from "./interface";

export const PipelineUserTokens = new InjectionToken<IPipelineBehevior>("PiplineUserTokens");
export const FactoryUserResponseToken = new InjectionToken<IUserResponse>("FactoryUserResponseToken");

