# Angular100Doc

## DAY #2 - EXPLORE APP

- `<app-root>` inside index.html
- module
- ngModule - angular component
- a component can be declared in only one module/place

## DAY #3 - DATA BINDING

- interpolation: `{{ data }}`
- property binding: `[value]="data.value"`
- event binding: `(click)="handleClick()"`
- 2 way binding: `[(ngModel)]="data.value" // FormsModule needed`

## DAY #4 - STRUCTURE DIRECTIVE - NGIF

- if else: `<div *ngIf="data === condition; else someTag" >`
- ng-template:

```typescript
    <ng-template #someTag>
    <ng-templage [ngIf]="data == condition">
```

## DAY #5 - STRUCTURE DIRECTIVE - NGFOROF

- `<div *ngFor="let author of authors; idx as index">`
- local variables: \$implicit: T; index; count; first; last; even; odd
- `<ng-template ngFor [ngForOf]="authors" let-author let-idx="index">`

- multiple structure directive:

```HTML
    <div *ngFor="”let" item of list”>
        <div *ngIf="”somethingGoood”">
            More code
        </div>
    </div>
```

```HTML
    <div *ngFor="”let" item of list”>
        <ng-container *ngIf="”somethingGoood”">
            More code
        </ng-container>
    </div>
    <div *ngFor="”let" item of list”>
        <ng-template [ngIf]="”somethingGoood”">
            More code
        </ng-template>
    </div>
```

## DAY #6 - ATTRIBUTE DIRECTIVE

- class binding: `<div [class.tab-active]="isTabActive">`, `[class]="clasExpr"` with classExpr is string, array string, object
- style binding: `<div [style.width]="'value'">`
  with unit: `[style.property.unit]="expression"` with expression is `number | undefined | null`
  `[style]="styleExpr"` with styleExpr is string, array string, object
- font-size & fontSize are both acceptable

## DAY #7 - COMPONENT INTERACTION

- ngOnInit: run after component is created, after constructor and input binding
- validate in ngOnChanges or setter/getter; ngOnChanges is better for multiple input validation
- ngOnChanges can access to both old & new value
- have to implement onChanges & override ngOnChanges when using ngOnChanges
- dynamically component generating: manually call lifecycle → implement side effect in setter
- `<button (click)="currentProgress = currentProgress + 1">increase</button>`
- external name/alias is not recommended

## DAY #8 - COMPONENT INTERACTION - PARENT LISTENS TO CHILDREN EVENT

- create: `@Output() delete = new EventEmitter<number>();`
- emit: `(click)="delete.emit(author.id):`
- implement handling method: `onDelete(id: number) { //somethimg }`
- binding: `(delete)="onDelete($event)`

## DAY #9 - CUSTOM 2 WAY BINDING

- 2 way binding: `<input type="text" [(ngModel)]="name">` === `<input type="text" [ngModel]="name" (ngModelChange)="name = $event">`
- create input & output:

```typescript
    @Input() checked: boolean;
    @Output() checkedChange = new EventEmitter<boolean>(); // must have `change` suffix
    [(checked)]="isChecked"
```

## DAY #10 - TEMPLATE VARIABLE, VIEWCHILD, VIEWCHILDREN

- template variable:

```HTML
<button (click)="toggleComp.toggle()"></button>
<app-toggle #toggleComp></app-toggle>

```

```typescript
ViewChild(selector: string | Function | Type<any>, opts?: {
  read?: any;
  static?: boolean;
})
```

```typescript
@ViewChildren(ToggleComponent) toggleList: QueryList<ToggleComponent>;


ngAfterViewInit() {
  console.log(this.toggleList);
}
```

- `static` grants access of component in ngOnInit; however, childComponent must not be in any structure directive
- `ViewChildren` subscribe changes will fail if a child is inside a structure directive; in that case, move method to ngAfterViewInit
- `ViewChildren` does not have `static`

## DAY #11 - TYPESCRIPT DATA TYPE

- `interface` is used to define types for an object

```typescript
interface User {
  firstName: string;
  lastName: string;
  age: number;
  job?: string; // optional property
}
```

```typescript
type User = {
  firstName: string;
  lastName: string;
  age: number;
  job?: string;
};
```

## DAY #12 - TYPESCRIPT ADVANCED TYPE

- `unknown` is recommended instead of `any`
- Union type: A or B
  `function test () string | number {}`
  `type StringOrNumber = string | number;`
- Intersection type A and B

```typescript
function merge<T1, T2>(o1: T1, o2: T2): T1 & T2 {
  return { ...o1, ...o2 };
}

merge({ foo: "bar" }, { bar: "foo" });
```

- Conditional type: `T extends U ? X : Y`
- Type alias

```typescript
@Component({
  selector: "flex-container",
  template: `<ng-content></ng-content>`,
})
export class FlexComponent {
  @Input() flexDirection: string = "row";

  @HostBinding("style.display") get display() {
    return "flex";
  }

  @HostBinding("style.flex-direction") get direction() {
    return this.flexDirection;
  }
}
```

- Alternative:

```typescript
    type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

    @Component({
    selector: 'flex-container',
    template: `<ng-content></ng-content>`
    })
    export class FlexComponent {
    @Input() flexDirection: FlexDirection = 'row';

    @HostBinding('style.display') get display() {...}

    @HostBinding('style.flex-direction') get direction() {
        return this.flexDirection;
    }
    }
```

```HTML
    <!-- app.component.html -->
    <flex-container>
    <button>Submit</button>
    <button>Cancel</button>
    </flex-container>

    <flex-container flexDirection="column">
    <input type="email" />
    <input type="password" />
    </flex-container>
```

- Type alias + conditional type

```typescript
type ObjectDictionary<T> = { [key: string]: T };
type ArrayDictionary<T> = { [key: string]: T[] };
export type Dictionary<T> = T extends []
  ? ArrayDictionary<T[number]>
  : ObjectDictionary<T>;

type StringDictionary = Dictionary<string>; // {[key: string]: string}
type NumberArrayDictionary = Dictionary<number[]>; // {[key: string]: number[]}
type UserEntity = Dictionary<User>; // {[key: string]: User}
```

## DAY #13 - CONTENT PROJECTION

- `<ng-content></ng-content>` work the same as React's `{children}`
- multiple `ng-content` is not allowed (without selector)
- Tag selector: `<ng-content select="some-component-selector-or-html-tag"><ng-content>`
- CSS class selector: `<ng-content select=".some-class"></ng-content>`
- Attribute selector: `<ng-content select="[some-attr]"></ng-content>`
- Selectors combination: `<ng-content select="some-component-selector-or-html-tag[some-attr]"></ng-content>`
- Selector: the same as CSS selector `select="label, span, app-label"`
- ngProjectAs: `<span ngProjectAs="label">` `<ng-container ngProjectAs="label">`
- `ng-container` works the same as React `<>`

## DAY #14 - `NG-TEMPLATE`, `NGTEMPLATEOUTLET` AND `NG-CONTAINER`

- `ng-template`: a template that render with some conditions
- `ng-container`: avoid unnecessary wrapper

```HTML
<ng-container [ngTemplateOutlet]="counterTmpl"></ng-container> items.
<ng-template #counterTmpl>
<span class="badge badge-primary">{{ counter }}</span> items
</ng-template>
```

```HTML
<ng-container
    *ngTemplateOutlet="linkTemplate; context: { $implicit: link }"
    *ngTemplateOutlet="linkTemplate; context: { link: link }"
>
    <!-- <ng-container
    [ngTemplateOutlet]="linkTemplate"
    [ngTemplateOutletContext]="{ link: link }"
> -->
</ng-container>
```

```HTML
<ng-template #linkTemplate let-l>
<!-- <ng-template #linkTemplate let-l="link"> -->
<h4>
{{l}}
</h4>
</ng-template>
```

## DAY #15 - DEPENDENCY INJECTION

- `@Injectable()`, `NgModule()`, `@Component()`

```typescript
@Injectable({
  providedIn: "root",
})
export class CartService {
  // properties and methods
}
```

```typescript
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log(this.cartService.calculateTotal());
  }
}
```

## DAY #16 - DEPENDENCY INJECTION IN ANGULAR

- Inject parent component to child component
- Provide another component with the same API

```typescript
@Component({
  selector: "app-bs-tab-group",
  templateUrl: "./bs-tab-group.component.html",
  styleUrls: ["./bs-tab-group.component.css"],
  providers: [
    {
      provide: TabGroupComponent,
      useExisting: BsTabGroupComponent,
    },
  ],
})
export class BsTabGroupComponent extends TabGroupComponent {}
```

- Forward reference

```typescript
const BsTabGroupProvider = {
  provide: TabGroupComponent,
  useExisting: forwardRef(() => BsTabGroupComponent),
};

@Component({
  selector: "app-bs-tab-group",
  templateUrl: "./bs-tab-group.component.html",
  styleUrls: ["./bs-tab-group.component.css"],
  providers: [BsTabGroupProvider],
})
export class BsTabGroupComponent extends TabGroupComponent {}
```

- Provider syntax
  `useClass`

```typescript
@NgModule({
  providers: [SomeClass]
})
```

```typescript
@NgModule({
  providers: [{ provide: SomeClass, useClass: SomeClass}]
})
```

`useExisting`

```typescript
@Component({
  providers: [
    {
      provide: SomeClass,
      useExisting: OtherClass
    }
  ]
})
```

`useFactory`

```typescript
@Component({
  providers: [
    {
      provide: SomeClass,
      useFactory: function() {
        return aValue;
      }
    }
  ]
})
```

`useValue`

```typescript
@Component({
  providers: [
    {
      provide: SomeToken,
      useValue: someValue
    }
  ]
})
```

## DAY #17 - `CONTENTTYPE` AND `CONTENTCHILDREN` IN ANGULAR

- `@Component` is just `@Directive` with template

- `ContentChild` can be used to lazy load component

`@ContentChild(TabContentDirective, { static: true, read: TemplateRef }) explicitBody: TemplateRef<unknown>;`

- `@ContentChildren`:

`@ContentChildren(forwardRef(() => TabPanelComponent)) tabPanels: QueryList<TabPanelComponent>;`

- `forwardRef()` can be used to resolve `cannot access Component before initialization

- `@ViewChildren`: your own child; `@ContentChildren`: someone's else child

- `View`: template that component directly interact with (crud). It is everything inside `templateUrl` or `template` of `@Component`, except for `ng-content`. A component's view is a black box for other components (shadow DOM)

- `Content`: template that is projected inside component/directive tag (light DOM)

## DAY #18 - PIPE

- `{{ interpolated_value | pipe_name }}`

- Pipe parameter: `{{ value | pipe: param1:param2 }}`

- Pipe chaining: `{{ value | pipe1 | pipe2 }}`

- Custom pipe:

  create `class implements interface PipeTransform`

  ```typescript
  interface PipeTransform {
    transform(value: any, ...arge: any[]: any);
  }
  ```

  ```typescript
  export class AppTitlePipe implements PipeTransform {
    transform(resourceId: string): string {
      return resourceId ? "Edit" : "Add";
    }
  }
  ```

  Add pipe decorator

  ```typescript
  @Pipe({
    name: 'Title'; //required
  })

  export class AppTitlePipe implements PipeTransform {
    ...
  }
  ```

```HTML
<h2 class='ibox-title'>{{ userId | appTitle }}</h2>
```

Custom pipe parameters

```typescript
transform(
  resourceId: string,
  addText: string = 'Add',
  editText: string = 'Edit',
): string {
  return resourceId ? editText : addText;
}
```

```HTML
{{ userId | appTitle: 'Set': 'Change }}
```

- Detect changes with data binding in pipes

Primitive type

```typescript
export class PipeExampleComponent implements OnInit {
  userIdChangeAfterFiveSeconds = "14324";
  time$: Observable<number> = timer(0, 1000).pipe(
    map((val) => 5 - (val + 1)),
    startWith(5),
    finalize(() => {
      this.userIdChangeAfterFiveSeconds = "";
    }),
    takeWhile((val) => val >= 0)
  );
}
```

```HTML
<p>
  Set userId to empty string after {{ timer | async }} seconds, notice the text "Edit" will be set to "Add"
</p>
<pre ngNonBindable>{{ userIdChangeAfterFiveSeconds | appTitle }}</pre>
<div>Form title: {{ userIdChangeAfterFiveSeconds | appTitle }} User</div>
```

Reference type
`pipe` cannot detect change in reference type, use `immutable` method or `pure:false`

```typescript
@Pipe({
  name: "isAdult",
  // pure: false,
})
export class IsAdultPipe implements PipeTransform {
  transform(arr: User[]): User[] {
    return arr.filter((x) => x.age > 18);
  }
}
```

```HTML
<div class="row">
  <div class="col-xs-6">
    <h4>Full user list</h4>
    <div *ngFor="let user of users">{{ user.name }}</div>
  </div>
  <div class="col-xs-6">
    <div class="ml-4">
      <h4>Adult user list</h4>
      <div *ngFor="let user of users | isAdult">{{ user.name }}</div>
    </div>
  </div>
</div>
```

- `*ngFor="let user of users | pipeName"`
- nested pipe in pipe

```typescript
export class AdultPipe implements PipeTransform {
  transform(value, pipe) {
    pipe.transform();
    return value.filter((x) => x.age >= 18);
  }
}
```

## DAY #19 - RX OBSERVABLE CONCEPTS

- `Observable`:
  A collection of values or events in the future. Values and events created in the future will be passed to `Observer`
  `Observable` is a function which take an `Observer` and return a function to cancel execution (`unsubscribe`)

- `Observer`:
  A collection of callbacks to listen to values sent from `Observable`

- `Subscription`:
  Result after a `Observable` is resolved, have a `unsubscribe` to resolve stream

- `Operators`:
  Pure functions/methods to use with `Observable`

- `Subject`:
  Send data to multiple `Observers` (multicasting)

- `Scheduler`:
  Control when a `subscription` start, when to send message

- Create `Observable`:

  ```typescript
  const observable = new Observable(function subscribe(observer) {
    // done creating observable
    const id = setTimeout(() => {
      observer.next("hello rxjs");
      observer.complete();
    }, 1000);
    return function unsubscribe() {
      //cleanup
      clearTimeout(id);
    };
  });
  ```

- Invoke `Observable`:
  `subscribe` to invoke, a `Subscription` is returned

  ```typescript
  const subsription = observable.subscribe({
    next: (value) => {
      console.log(value);
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log("done");
    },
  });
  ```

- Execute `Observable`:
  `new Observable(function subscribe(observer)) {...}`
  Notification:
  `next`: send a value, `number`, `string`, `object`, etc
  `error`: send a javascript error or exception
  `complete`: send no value but send a message instead, to notify that the stream is completed in order for `Observer` to execute some actions
  Either `error` or `complete` can be sent once

- Dispose `Observable` execution:

  ```typescript
  const subscription = observable.subscribe({
    next: (value) => {
      console.log(value);
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log("Done");
    },
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 500);
  ```

- `Observer`:
  Consumes data sent from `Observable`. `Observer` consists of 3 callbacks respectively for each notification: `next`, `error`, `complete`

  ```typescript
  const observer = {
    next: (x) => console.log("Observer got a next value: " + x),
    error: (err) => console.error("Observer got an error: " + err),
    complete: () => console.log("Observer got a complete notification"),
  };
  ```

  ```typescript
  observable.subscribe(
    (x) => console.log("Observer got a next value: " + x),
    (err) => console.error("Observer got an error: " + err),
    () => console.log("Observer got a complete notification")
  );
  ```

  ```typescript
  const observer = {
    next: (x) => console.log("Observer got a next value: " + x),
    error: (err) => console.error("Observer got an error: " + err),
    complete: () => console.log("Observer got a complete notification"),
  };
  ```

  ```typescript
  observable.subscribe(
    (x) => console.log("Observer got a next value: " + x),
    null,
    () => console.log("Observer got a complete notification")
  );
  ```

- `Subscription`:
  Cancel `Observable` execution

  ```typescript
  const foo = interval(500);
  const bar = interval(700);

  const subscription = foo.subscribe((x) => console.log("first: " + x));
  const childSub = bar.subscribe(x => console.log('second: ' + x));

  subscription.add(childSub);

  setTimeout(() => {
    // Unsubscribes BOTH `subscription` and `childSub`
    subscription.unsubscribe();
  }, 2000);

  ngOnDestroy() {
    subscription.unsubscribe();
  }
  ```

## DAY #20 - RXJS CREATION

- `of()`:
  create `Observable` from any value: `primitive`, `array`, `object`, `function`,...
  `of()` receives, returns the values and `complete` right away as soon as all the value are `emitted`

  Primitive value

  ```typescript
  // output: 'hello'
  // complete: 'complete'
  of("hello").subscribe(observer);
  ```

  Object/Array

  ```typescript
  // output: [1, 2, 3]
  // complete: 'complete'
  of([1, 2, 3]).subscribe(observer);
  ```

  Sequence of values

  ```typescript
  // output: 1, 2, 3, 'hello', 'world', {foo: 'bar'}, [4, 5, 6]
  // complete: 'complete'
  of(1, 2, 3, "hello", "world", { foo: "bar" }, [4, 5, 6]).subscribe(observer);
  ```

- `from()`:
  create `Observable` from: `Iterable` or `Promise`

  Array

  ```typescript
  // output: 1, 2, 3
  // complete: 'complete'
  from([1, 2, 3]).subscribe(observer);
  ```

  String

  ```typescript
  // output: 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'
  // complete: 'complete'
  from("hello world").subscribe(observer);
  ```

  Map/Set

  ```typescript
  const map = new Map();
  map.set(1, "hello");
  map.set(2, "bye");

  // output: [1, 'hello'], [2, 'bye']
  // complete: 'complete'
  from(map).subscribe(observer);

  const set = new Set();
  set.add(1);
  set.add(2);

  // output: 1, 2
  // complete: 'complete'
  from(set).subscribe(observer);
  ```

  Promise

  ```typescript
  // output: 'hello world'
  // complete: 'complete'
  from(Promise.resolve("hello world")).subscribe(observer);
  ```
  `from()` returns each item of `Iterable`
  `from()` unwrapps and returns resolved value of `Promise`. This is a way of converting a `Promise` into an `Observable`

- `fromEvent()`
  Used to convert an event into an `Observable`

  ```typescript
  const btn = document.querySelector("#btn");
  const input = document.querySelector("#input");

  // output (example): MouseEvent {...}
  // complete: không có gì log.
  fromEvent(btn, "click").subscribe(observer);

  // output (example): KeyboardEvent {...}
  // complete: không có gì log.
  fromEvent(input, "keydown").subscribe(observer);
  ```

  `fromEvent()` creates an `Observable` without automatically implement `complete`. Manually invoke `unsubscribe` is needed

- `fromEventPattern()`

  `fromEventPattern()` is different from `fromEvent()` in terms of usage and event type

  ```typescript
  // fromEvent() từ ví dụ trên
  // output: MouseEvent {...}
  fromEvent(btn, "click").subscribe(observer);

  // fromEventPattern
  // output: MouseEvent {...}
  fromEventPattern(
    (handler) => {
      btn.addEventListener("click", handler);
    },
    (handler) => {
      btn.removeEventListener("click", handler);
    }
  ).subscribe(observer);
  ```

  ```typescript
  // output: 10 10
  fromEvent(btn, "click")
    .pipe(map((ev: MouseEvent) => ev.offsetX + " " + ev.offsetY))
    .subscribe(observer);

  // fromEventPattern
  // Ở ví dụ này, chúng ta sẽ tách `addHandler` và `removeHandler` ra thành function riêng nhé

  function addHandler(handler) {
    btn.addEventListener("click", handler);
  }

  function removeHandler(handler) {
    btn.removeEventListener("click", handler);
  }

  // output: 10 10
  fromEventPattern(
    addHandler,
    removeHandler,
    (ev: MouseEvent) => ev.offsetX + " " + ev.offsetY
  ).subscribe(observer);
  ```

`fromEventPattern()`receives 3 parameters: add..., remove... and `projectFunc`(optional)
`fromEventPattern()` provides API to transform event from original API of the event
`addEventListener`and `removeEventListener`APIs are used directly from the DOM to transform into `Observable`. `fromtEventPattern()`can be used to transform more complicated API into `Observable`, such as `SignalR Hub`

  ```typescript
// _getHub() là hàm trả về Hub.
const hub = this._getHub(url);
return fromEventPattern(
  (handler) => {
    // mở websocket
    hub.connection.on(methodName, handler);

    if (hub.refCount === 0) {
      hub.connection.start();
    }

    hub.refCount++;
  },
  (handler) => {
    hub.refCount--;
    // đóng websocket khi unsubscribe
    hub.connection.off(methodName, handler);
    if (hub.refCount === 0) {
      hub.connection.stop();
      delete this._hubs[url];
    }
  }
);  // _getHub() returns Hub
  const hub = this._getHub(url);
  return fromEventPattern(
    (handler) => {
      // open websocket
      hub.connection.on(methodName, handler);

      if (hub.refCount === 0) {
        hub.connection.start();
      }

      hub.refCount++;
    },
    (handler) => {
      hub.refCount--;
      // close websocket on unsubscribe
      hub.connection.off(methodName, handler);
      if (hub.refCount === 0);
      delete this._hub[url];
    }
  );
```

- `interval(timeInterval)`
`interval()` is a function to create `Observable` which emit interger from 0 to 1 occasionally, alike `setInterval`

  ```typescript
  // output: 0, 1, 2, 3, 4, ...
  interval(1000) // emit each second
    .subscribe(observer);
  ```

Like `fromtEvent()`, `interval()`does not implicitly implement `complete`, this needs to be handled manually

- `timer()`
`timer()`can be used in 2 ways:
  - `timer(timeInterval)` create `Observable` which emits value after a period time. This will auto implement `complete`
  - `timer(timeInterval, periodInterval)` create `Observable` which emits value after a period time and emits value after each cycle/run. This way of use is similar to `interval()`, however, `timer()` supports delaying before `emit`. This will not auto `complete`

  ```typescript
  // output: after 1 sec → 0
  // complete: 'complete'
  timer(1000).subscribe(observer);

  // output: after 1 sec → 0, 1, 2, 3, 4, 5,...
  timer(1000, 1000).subscribe(observer);

- `throwError()` (`catchAndRethrow`)
  `throwError()` is used to create `Observable`which instead of `emit` value, throw an error after `subscribe`

  ```typescript
  // error: 'an error'
  throwError('an error').subscribe(observer);
  ```

  `throwError()` is commonly used in error handling of an `Observable`, after handling the error, we want to throw error to the next `ErrorHandler`
  When working with `Observable`, there will be `operators`which requires you to provide an `Observable` (`switchMap`, `catchError`), using `throwError`will be a wise choice

- `defer()`
  `defer()` receives an `Observablefactory`and returns this `Observable`. `defer()` will use this `ObservableFactory` to create a new `Observable` for each `subscriber`

  ```typescript
  // of()
  const now$ = of(Math.random());
  // output: 0.4146530439875191
  now$.subscribe(observer);
  // output: 0.4146530439875191
  now$.subscribe(observer);
  // output: 0.4146530439875191
  now$.subscribe(observer);// of()
    const now$ = of(Math.random());
    // output: 0.456498
  ```

  `of()` returns the same value in all 3 times

  ```typescript
  const now$ = defer(() => of(Math.random()));
  // output: 0.27312186273281935
  now$.subscribe(observer);
  // output: 0.7180321390218474
  now$.subscribe(observer);
  // output: 0.9626312890837065
  now$.subscribe(observer);const now$ = defer(() => of(Math.random()))
  ```

  `defer()` returns different values for each `subscribe`
  Get lazy evaluate, run whenever `.subscribe`, `of` runs and create new `Observable`, `Math.random` runs and create new value
  `defer()` (combine with `retry`) will be the solution when we need to `retry` an `Observable` which need to compare with a random value

