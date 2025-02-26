import { isCheckPrimitiveTypeInObject } from '../../common/utils/isCheckPrimitiveTypeInObject';
import { InfrastructureContainerForDecorator } from '../../containerForDecorator';
import { IPipelineBehevior, IUserResponse } from '../../interface';
import { FactoryUserResponseToken } from '../../tokens';

export class ValidateUser implements IPipelineBehevior {
  private _data: any | null = null;
  get data(): any | null {
    return this._data;
  }

  set(data: any): IPipelineBehevior {
    this._data = null;
    const user: IUserResponse = InfrastructureContainerForDecorator.get(FactoryUserResponseToken)();
    if (!isCheckPrimitiveTypeInObject(data, user)) {
      return this;
    }
    this._data = data;
    return this;
  }
}
