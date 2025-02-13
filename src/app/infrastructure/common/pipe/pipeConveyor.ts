import { Observable } from 'rxjs';
import { IPipelineBehevior } from '@infrastructure/interface/IPipelineBehevior';


export function pipeConveyor(respClass: IPipelineBehevior[]) {
  return function <P>(source: Observable<P>): Observable<P> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          let beheviorResult: IPipelineBehevior | undefined;
          for (let cls of respClass) {
            const data: any = (beheviorResult?.data !== undefined) ? beheviorResult?.data : value;
            if (data == null) {
              subscriber.error("Invalid data response");
              return;
            }
            beheviorResult = cls.set(data);
          }
          if (beheviorResult?.data !== undefined) {
            subscriber.next(beheviorResult.data as P);
          } else {
            subscriber.error("Invalid data response");
          }
        },
        error(error) { subscriber.error(error); },
        complete() { subscriber.complete(); }
      });
      return () => subscription.unsubscribe();
    });
  };
}
