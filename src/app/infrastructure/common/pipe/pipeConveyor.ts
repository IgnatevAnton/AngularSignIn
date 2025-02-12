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
                        if (data == null) { subscriber.next(null as P); return; }
                        beheviorResult = cls.set(data);
                    }
                    const out = (beheviorResult?.data !== undefined) ? beheviorResult?.data : value;
                    subscriber.next(out as P);
                },
                error(error) { subscriber.error(error); },
                complete() { subscriber.complete(); }
            });
            return () => subscription.unsubscribe();
        });
    };
}
