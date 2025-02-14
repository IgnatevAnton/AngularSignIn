import { InfrastructureContainerForDecorator, InfrastructureTokens, InfrsatructureInterface } from '@infrastructure';
import { isCheckPrimitiveTypeInObject } from '@infrastructure/common/utils/isCheckPrimitiveTypeInObject';

export class ValidateUser implements InfrsatructureInterface.IPipelineBehevior {

  private _data: any | null = null;
  get data(): any | null { return this._data; }

  set(data: any): InfrsatructureInterface.IPipelineBehevior {
    this._data = null;
    const user: InfrsatructureInterface.IUserResponse = InfrastructureContainerForDecorator.get(InfrastructureTokens.FactoryUserResponseToken)();
    if (!isCheckPrimitiveTypeInObject( data, user )) { return this; }
    this._data = data;
    return this;
  }
}
