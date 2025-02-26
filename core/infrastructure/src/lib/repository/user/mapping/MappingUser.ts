import { DomainTokens, DomainInterface } from '#domain';
import { InfrastructureContainerForDecorator } from '../../../entities/ContainerForDecorator';
import { IPipelineBehevior } from '../../../interface/IPipelineBehevior';
import { IUserResponse } from '../../../interface/IUserResponse';

export class MappingUser implements IPipelineBehevior {
  private _data: any | null = null;
  get data(): any | null {
    return this._data;
  }

  set(data: any): IPipelineBehevior {
    this._data = null;
    const dt = data as IUserResponse;
    const user: DomainInterface.IUser = InfrastructureContainerForDecorator.get(DomainTokens.FactoryUserToken)();
    user.email = dt.email;
    user.name = dt.name;
    user.uid = dt.uid;
    user.isConfirm = dt.isConfirm;
    this._data = user;
    return this;
  }
}
