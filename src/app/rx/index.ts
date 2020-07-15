import { fromEvent, Observable, of, fromEventPattern, from, interval, timer, throwError, defer } from 'rxjs';
import { throttleTime, map, catchError } from 'rxjs/operators';


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
  complete: () => console.log('complete')
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
  }
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