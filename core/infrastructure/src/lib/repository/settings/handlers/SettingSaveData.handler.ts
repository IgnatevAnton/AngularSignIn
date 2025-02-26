import { DomainDecoators } from '#domain';
import { ApplicationRequest } from '#application';
import { LocalStorageClientHandler } from '../../../entities/LocalStorageClientHandler';

export class SettingSaveDataHandler extends LocalStorageClientHandler<ApplicationRequest.setting.SettingSaveDataCommand, boolean> {
  @DomainDecoators.DebugMethod()
  override handler(request: ApplicationRequest.setting.SettingSaveDataCommand): boolean {
    try {
      localStorage.setItem(request.name, JSON.stringify(Object.fromEntries(request.setting)));
    } catch {
      return false;
    }
    return true;
  }
}
