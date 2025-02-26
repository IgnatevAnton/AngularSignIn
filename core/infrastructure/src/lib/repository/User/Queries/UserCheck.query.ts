import { DomainInterface } from '#domain';
import { IQuery } from '@cqrs';
import { Observable } from 'rxjs';
export class UserCheckQuery extends IQuery<Observable<DomainInterface.IUser | null>> {}
