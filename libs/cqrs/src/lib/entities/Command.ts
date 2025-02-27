/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommand } from '../interfaces/ICommand';

export abstract class Command<TResp> implements ICommand {
  private readonly _isCommand: boolean = true;
}
