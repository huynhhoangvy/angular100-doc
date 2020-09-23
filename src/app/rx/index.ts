import {
    asyncScheduler,
    BehaviorSubject,
    combineLatest,
    concat,
    forkJoin,
    from,
    fromEvent,
    fromEventPattern,
    interval,
    merge,
    Observable,
    of,
    race,
    Subject,
    throwError,
    timer,
    zip,
} from 'rxjs';
import {
    auditTime,
    buffer,
    bufferTime,
    catchError,
    debounceTime,
    delay,
    distinct,
    distinctUntilChanged, endWith,
    filter,
    find,
    first,
    last,
    map,
    mapTo, pairwise,
    pluck,
    reduce,
    sampleTime,
    scan,
    single,
    skip,
    skipUntil,
    skipWhile,
    startWith,
    take,
    takeLast,
    takeUntil,
    takeWhile,
    throttleTime,
    toArray,
    withLatestFrom,
} from 'rxjs/operators';


//////////////////////////////////////////
// const rate = 1000;
// let lastMove = Date.now() - rate;

// //   if (Date.now() - lastMove >= rate) {
// //     console.log(ev);
// //     lastMove = Date.now();
// //   }
// // });

// // fromEvent(document, 'mousemove').pipe(
// //   throttleTime(1000),
// //   map((ev: MouseEvent) => ev.clientX + ' ' + ev.clientY)
// // ).subscribe(console.log);

// const observable = new Observable(function subscribe(observer) {
//   const id = setInterval(() => {
//     observer.next('hello rxjs');
//     // observer.complete();
//   }, 1000);
//   return function unsubsribe() {
//     observer.complete();
//     clearInterval(id);
//   };
// });

// // observable.subscribe(
// //   (val) => console.log,
// //   (err) => console.error(err),
// //   () => console.log('complete')
// // );

// const subscription = observable.subscribe({
//   next: (val) => console.log(val),
//   error: (err) => console.error(err),
//   complete: () => console.log('completed!'),
// });

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 5000);

// // ngOnDestroy() {
// //   subscription.unsubscribe()
// // }

// // document.addEventListener('mousemove', ev => {
// subscription.add(observable.subscribe(console.log));

///////////////////////////////////////////
const observer = {
    next: val => console.log(val),
    error: err => console.error(err),
    complete: () => console.log('complete'),
};

// of
of(1, 2, 3, 4, 5, 'hello', [1, 2, 3], { foo: 'bar' }).subscribe(observer);

// from
from(Promise.resolve('hello')).subscribe(observer);

// fromEvent
fromEvent(document, 'click').subscribe(observer);

// fromEventPattern
fromEventPattern(
    handler => {
        document.addEventListener('click', handler);
    },
    handler => {
        document.removeEventListener('click', handler);
    },
).subscribe(observer);

// interval
interval(1000).subscribe(observer);

// timer
timer(1000).subscribe(observer);
timer(1000, 2000).subscribe(observer);

// throwError
throwError('some error').subscribe(observer);

// apiCall.pipe(
// catchError(err => {
//   sentry.logError(err);
//   const exception = createException(err);
//   return throwError(exception);
//   })
// )

// defer
// const random$ = of(Math.random());

// const random$ = defer(() => of(Math.random()));

// defer(() => {
//   return hasId ? updateResource() : createResource();
// })

/////////////////////////////////////////////

const users = [
    { id: 1, name: 'FooBar', first: 'Foo', last: 'Bar', postCount: 5 },
    { id: 2, name: 'FarBooz', first: 'Far', last: 'Booz', postCount: 19 },
];

const userVm = users.map(user => {
    return {
        ...user,
        fullName: `${user.first} ${user.last}`,
    };
});

// const observer = {
//     next: value => console.log(value),
//     error: err => console.error(err),
//     complete: () => console.log('completed'),
// };

//  map
of(users) // outer/parent observable
    .pipe(map(data => {
        console.log('inside map: ', data);
        return data;
    }))
    .subscribe(observer);

merge(
    of(users[0]).pipe(delay(2000)),
    of(users[1]).pipe(delay(4000)),
).pipe(
    map(user => ({ ...user, fullName: `${user.first} ${user.last}` })),
).subscribe(observer);

//  pluck
const params$ = of({ id: 123, foo: { bar: 'hello' } });

// similar to map: params => params.id
const id$ = params$.pipe(pluck('foo', 'bar')).subscribe(observer);

//  mapTo
merge(
    fromEvent(document, 'mouseenter').pipe(mapTo(true)),
    fromEvent(document, 'mouseleave').pipe(mapTo(false)),
).subscribe(observer);

//  reduce
const totalCount$ = merge(
    of(users[0]).pipe(delay(2000)),
    of(users[1]).pipe(delay(4000)),
    // interval(1000).pipe(mapTo({ postCount: 1 })),
);

totalCount$.pipe(reduce((acc, cur) => acc + cur.postCount, 0)).subscribe(observer);

//  toArray
const users$ = merge(
    of(users[0]).pipe(delay(2000)),
    of(users[1]).pipe(delay(4000)),
    // interval(1000).pipe(mapTo({ postCount: 1 })),
    // ).pipe(reduce((acc, cur) => ([...acc, cur]), [])).subscribe(observer);
).pipe(toArray()).subscribe(observer);

//  buffer
const source$ = interval(1000);
const click$ = fromEvent(document, 'click');

source$.pipe(buffer(click$)).subscribe(observer);

//  bufferTime
source$.pipe(bufferTime(2000)).subscribe(observer);

//  scan
totalCount$.pipe(scan((acc, cur) => acc + cur.postCount, 0)).subscribe(observer);

//  state management using scan

const initialState = {};
const stateSubject = new BehaviorSubject(initialState);

const state$ = stateSubject.asObservable().pipe(
    scan((state, partialState) => ({ ...state, ...partialState }), initialState))
                           .subscribe(observer);

// state$.subscribe(observer);

stateSubject.next({ name: 'Hello' });
stateSubject.next({ age: 10 });

///////////////////////////////////////////////////////

const items = [1, 2, 3, 4, 5, 6, 7, 8];

// filter
from(items).pipe(filter(x => x % 2 === 0)); // 2, 4, 6 -> complete

// first
from(items).pipe(first()); // 1 -> complete

from(items).pipe(first(x => x > 4)); // 5 -> complete

from(items).pipe(first(x => x > 10)); // error
of().pipe(first()); // error

// last
from(items).pipe(last()); // 6 -> complete

// same other behaviors with first

// find
from(items).pipe(find(x => x % 2 === 1)); // 1 -> complete

from(items).pipe(find(x => x > 10)); // undefined

// single
from(items).pipe(single()); // error

from(items).pipe(single(x => x > 7)); // 8 -> complete

from(items).pipe(single(x => x > 2)); // error

// take
interval(1000).pipe(take(3)); // 1, 2, 3 -> complete

interval(1000).pipe(take(1)); // nothing

// takeLast
interval(1000).pipe(takeLast(2)); // nothing, bcuz observable is not complete

interval(1000).pipe(take(5), takeLast(2)); // 3, 4 -> complete

// takeUntil
interval(1000).pipe(takeUntil(timer(5000))); // 0, 1, 2, 3 -> complete

const destroy$ = new Subject();

// @Directive()
// class abstract class Destroyable implements OnDestroy {
//     ngOnDestroy() {
//         subscription.unsubscribe();
//         subscription2.unsubscribe();
//         destroy$.next();
//         destroy$.complete();
//     }
// }
//
// class Component extends Destroyable {
//     const subscription = state$.pipe(
//         map(),
//         takeUntil(destroy$)
//     ).subscribe();
//
// }
// const subscription2 = subscription;
//
// subscription.add();

// takeWhile
interval(1000).pipe(takeWhile(x => x < 10)); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 -> complete

// skip
interval(1000).pipe(skip(5)); // 5, 6, 7, 8, 9...

// skipUntil
interval(1000).pipe(skipUntil(timer(6000))); // 5, 6, 7, 8, 9...

// skipWhile
interval(1000).pipe(skipWhile(x => x < 6)); // 6, 7, 8, 9...

// distinct
from([1, 2, 3, 4, 5, 6, 4, 3, 6, 1]).pipe(distinct()); // 1, 2, 3, 4, 5, 6 -> complete

// distinctUntilChange
from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4]).pipe(distinctUntilChanged()); // 1, 2, 1, 2, 3, 4 -> complete

// from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4]).pipe(distinctUntilChanged((a, b) => a.name === b.name)); // 1, 2, 1, 2, 3, 4 -> complete

// throttle/throttleTime
fromEvent(document, 'mousemove').pipe(
    throttleTime(1500, asyncScheduler, { trailing: true, leading: false }),
);

fromEvent(document, 'mousemove').pipe(
    throttleTime(1500, asyncScheduler, { trailing: false, leading: true }), // behave like auditTime
);

// debounce/debounceTime
const queryInput = document.querySelector('#queryInput');
fromEvent(queryInput, 'keydown').pipe(
    debounceTime(1500),
    pluck('target', 'value'),
);

// audit/auditTime
fromEvent(document, 'click')
    .pipe(
        auditTime(1500), // internal timer: 1500ms, all emitted value will be skipped,
        // auditTime emit the last value from the observable when the timer is over
    ); // 1, 3, 5, 7, 9, 11...

// sampleTime
interval(1000).pipe(
    sampleTime(1500), // timer will not wait until the next value emitting but run continuously
); // 0, 1, 3, 4, 6, 7, 9, 10, 12...

// forkJoin
forkJoin([
    of('hello').pipe(delay(1000)),
    of('world').pipe(delay(2000)),
    interval(1000).pipe(take(2)),
], (hello, world, inter) => ({ hello, world, inter })).subscribe(observer);

forkJoin([
    of('hello').pipe(delay(1000)),
    of('world').pipe(delay(2000)),
    interval(1000).pipe(take(2)),
]).pipe(map(([hello, world, inter]) => ({ hello, world, inter }))).subscribe(observer);

// combineLatest
combineLatest([
    interval(2000).pipe(map(x => `First: ${x}`)), // {1}
    interval(1000).pipe(map(x => `Second: ${x}`)), // {2}
    interval(3000).pipe(map(x => `Third: ${x}`)), // {3}
]).subscribe(observer);

// zip
zip(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);

// concat
concat(
    interval(1000).pipe(take(3)),
    interval(500).pipe(take(5)),
).subscribe(observer);

// merge
merge(
    interval(1000).pipe(take(3), map(x => `First ${x}`)),
    interval(500).pipe(take(5), map(x => `Second ${x}`)),
).subscribe(observer);

// race
race(
    interval(1000).pipe(take(3), map(x => `first ${x}`)),
    interval(500).pipe(take(5), map(x => `second ${x}`)),
).subscribe(observer);

// withLatestFrom
const withLatestFrom$ = interval(2000).pipe(map(x => `Need latest from this value: ${x}`));

fromEvent(document, 'click').pipe(withLatestFrom(withLatestFrom$)).subscribe(observer);

// startWith
of('world').pipe(startWith('hello')).subscribe(observer);

// this.loading = true;
// apiCall.subscribe(() => {this.loading = false});

interface ApiResponse<T> {
    data: T;
    isLoading: boolean;
    error: string;
}

function getApiResponse<T>(apiCall: Observable<T>): Observable<ApiResponse<T>> {
    return apiCall.pipe(
        map(data => ({ isLoading: false, data, error: '' })),
        startWith({ isLoading: true, data: null, error: '' }),
        catchError(err => of({ isLoading: false, data: null, error: err.message })),
    );
}

// endWith
of('hello').pipe(endWith('world')).subscribe(observer);

// pairwise
from([1, 2, 3, 4, 5])
    .pipe(
        pairwise(),
        map(([prev, cur]) => prev + cur)
    ).subscribe(observer);

fromEvent(document, 'click').pipe(pairwise());
