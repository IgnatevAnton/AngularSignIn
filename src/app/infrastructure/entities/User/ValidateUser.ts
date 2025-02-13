import { isCheckPrimitiveTypeInObject } from '@infrastructure/common/utils/isCheckPrimitiveTypeInObject';
import { IPipelineBehevior } from '@infrastructure/interface/IPipelineBehevior';
import { UserResponse } from '@infrastructure/entities/User/UserResponse';

export class ValidateUser implements IPipelineBehevior {

  private _data: any | null = null;
  get data(): any | null { return this._data; }

  set(data: any): IPipelineBehevior {
    this._data = null;
    if (!isCheckPrimitiveTypeInObject(data, new UserResponse())) { return this; }
    this._data = data;
    return this;
  }
}
