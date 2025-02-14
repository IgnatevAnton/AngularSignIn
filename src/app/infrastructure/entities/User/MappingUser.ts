import { DomainTokens, DomainInterface } from '@domain';
import { InfrastructureContainerForDecorator, InfrsatructureInterface } from '@infrastructure';

export class MappingUser implements InfrsatructureInterface.IPipelineBehevior {

  private _data: any | null = null;
  get data(): any | null { return this._data; }

  set(data: any): InfrsatructureInterface.IPipelineBehevior {
    this._data = null;
    const dt = data as InfrsatructureInterface.IUserResponse;
    const user: DomainInterface.IUser = InfrastructureContainerForDecorator.get(DomainTokens.FactoryUserToken)();
    user.email = dt.email;
    user.name = dt.name;
    user.uid = dt.uid;
    user.isConfirm = dt.isConfirm;
    this._data = user;
    return this;
  }

}
