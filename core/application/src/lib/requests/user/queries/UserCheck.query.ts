import { DomainInterface } from '#domain';
import { Query } from '@cqrs';
import { Observable } from 'rxjs';
export class UserCheckQuery extends Query<Observable<DomainInterface.IUser | null>> {}
