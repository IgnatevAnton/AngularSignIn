import { InjectionToken } from "@angular/core";
import { InfrsatructureInterface } from "@infrastructure";

export const PipelineUserTokens = new InjectionToken<InfrsatructureInterface.IPipelineBehevior>("PiplineUserTokens");
export const FactoryUserResponseToken = new InjectionToken<InfrsatructureInterface.IUserResponse>("FactoryUserResponseToken");
