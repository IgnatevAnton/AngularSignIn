/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandToken } from './ICommandToken';

export abstract class ICommand<TResp> implements ICommandToken {
  private readonly _isCommand: boolean = true;
}
