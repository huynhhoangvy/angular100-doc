import { BehaviorSubject, from, fromEvent, fromEventPattern, interval, merge, of, throwError, timer } from 'rxjs';
import { buffer, bufferTime, delay, map, mapTo, pluck, reduce, scan, toArray } from 'rxjs/operators';


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
of(1, 2, 3, 4, 5, 'hello', [ 1, 2, 3 ], { foo: 'bar' }).subscribe(observer);

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

