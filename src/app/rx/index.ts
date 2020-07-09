import { fromEvent, Observable } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

const rate = 1000;
let lastMove = Date.now() - rate;

// document.addEventListener('mousemove', ev => {
//   if (Date.now() - lastMove >= rate) {
//     console.log(ev);
//     lastMove = Date.now();
//   }
// });

// fromEvent(document, 'mousemove').pipe(
//   throttleTime(1000),
//   map((ev: MouseEvent) => ev.clientX + ' ' + ev.clientY)
// ).subscribe(console.log);

const observable = new Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('hello rxjs');
    // observer.complete();
  }, 1000);
  return function unsubsribe() {
    observer.complete();
    clearInterval(id);
  };
});

// observable.subscribe(
//   (val) => console.log,
//   (err) => console.error(err),
//   () => console.log('complete')
// );

const subscription = observable.subscribe({
  next: (val) => console.log(val),
  error: (err) => console.error(err),
  complete: () => console.log('completed!'),
});

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

// ngOnDestroy() {
//   subscription.unsubscribe()
// }

subscription.add(observable.subscribe(console.log));
