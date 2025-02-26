import { IRequestHandler } from '@cqrs';

export abstract class LocalStorageClientHandler<TReq, TResp> implements IRequestHandler<TReq, TResp> {
  abstract handler(request: TReq): TResp;
}
