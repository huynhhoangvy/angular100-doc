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

- `View`: template that component directly interact with (crud). It is everything inside `templateUrl` or `template` of `@Component`, 
except for `ng-content`. A component's view is a black box for other components (shadow DOM)

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
`addEventListener`and `removeEventListener`APIs are used directly from the DOM to transform into `Observable`. 
`fromtEventPattern()`can be used to transform more complicated API into `Observable`, such as `SignalR Hub`

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
  - `timer(timeInterval, periodInterval)` create `Observable` which emits value after a period time and emits value after each cycle/run. 
  This way of use is similar to `interval()`, however, `timer()` supports delaying before `emit`. This will not auto `complete`

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
  When working with `Observable`, there will be `operators`which requires you to provide an `Observable` (`switchMap`, `catchError`), 
  using `throwError`will be a wise choice

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

## Day #21 RX TRANSFORMATION

Creator operators can be called as normal function. `Pipeable` operators will be called inside `pipe()` method of an `Observable` instance.
-   `Pipeable` operators:
    -   Pure functions that receive an `Observable` and return another `Observable`.
    -   Incoming `Observable` will not be mutated.
    -   Syntax: 
    
    ```typescript
    observableInstance.pipe(
        operator1(),
        operator2()
    )
    ```
    
    -   `observableInstance` will always return another `Observable` regardless the number of executed `pipeable` operator. 
    Hence, reassign or resubscribe is needed:
    
    ```typescript
    const returnedObservable = observableInstance.pipe(
        operator1(),
        operator2(),
    )   
    ``` 
    
    -   `Transformation` operator is one category of `Pipeable` operators.
    
-   `Transformation` operators
    -   The same as JS `map`, `filter`

    ```typescript
    import { Observable } from 'rxjs'; 

    interface User {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
    }

    const source = new Observable<User>((observer) => {
        const users = [
            {id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662', username: 'tiepphan', firstname: 'tiep', lastname: 'phan'},
            {id: '34784716-019b-4868-86cd-02287e49c2d3', username: 'nartc', firstname: 'chau', lastname: 'tran'},
        ];

    setTimeout(() => {
        observer.next(users[0]);
    }, 1000);
    setTimeout(() => {
        observer.next(users[1]);
        observer.complete();
    }, 3000);
    });

    const observer = {
        next: value => console.log(value),
        error: err => console.error(err),
        complete: () => console.log('completed'),
    };
    source.subscribe(observer);
    ```

    -   `map`
    
    `map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>`
     
    -   To display user's full name inside `next`, we can `transform` data along the way.
    -   Always receive outer/parent `observable` or the previous `observable`
    -   Will not loop through every item of a list (use `from` instead of  `of` to do so)
    
    ```typescript
    import { map } from 'rxjs/operator';
    
    source.pipe(
        map(user => {
            return {
            ...user,
            fullName: `${user.firstname} ${user.lastname}`
            };
        })
    ).subscribe(observer);
    ```
    
    -   Or, to return user's id upon emitting.
    
    ```typescript
        source.pipe(
            map(user => user.id)
        ).subscribe(observer);
    ```
    
    -   `pluck`
    
        -    `pluck<T, R>(...properties: string[]): OperatorFunction<T, R>`
    
        -   pluck an attribute from the received data (key from object, item index from array, nested object)
    
    -   `mapTo`
    
        -   `mapTo<T, R>(value: R): OperatorFuntion<T, R>`
    
        -   use `mapTo` to implement mouse hover event, return `true` on `mouseover`, return `false` on `mouseleave`.
    
        ```typescript
        const element = document.querySelector('#hover');
    
        const mouseover$ = fromEvent(element, 'mouseover');
        const mouseleave$ = fromEvent(element, 'mouseleave');
    
        const hover$ = merge(
            mouseover$.pipe(
                mapTo(true),
            ),
            mouseleave$.pipe(
                mapTo(false),
            )
        );
    
        hover$.subscribe(observer);
        ```
    
    -   `scan`
    
        -   `scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: T | R): OperatorFunction<T, R>`
    
        ```typescript
        const button = document.querySelector('#add');
    
        const click$ = fromEvent(button, 'click');
    
        click$.pipe(
            scan((acc, curr) => acc + 1, 0)
        ).subscribe(observer);
        ```
    
        ```typescript
        const users$ = new Observable<User>((observer) => {    
            const users = [
                {id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662', username: 'tiepphan', firstname: 'tiep', lastname: 'phan', postCount: 5},
             {id: '34784716-019b-4868-86cd-02287e49c2d3', username: 'nartc', firstname: 'chau', lastname: 'tran', postCount: 22},
            ];
    
            setTimeout(() => {
                observer.next(users[0]);
            }, 1000);
            setTimeout(() => {
                observer.next(users[1]);
                observer.complete();
            }, 3000);
            });
    
        users$.pipe(
            scan((acc, curr) => acc + curr.postCount, 0)
        ).subscribe(observer);
        ```
    
    -   `reduce`
    
        -    `reduce<T, R>(accumulator: (acc: T | R, value: T, index?: number) => T | R, seed?: T | R): OperatorFunction<T, T | R>`
        -   `reduce` will reduce the value overtime, but it will wait until source completes then emit the value
        -   reduce only run whenever the `observale` completes, won't run with interval (`observable` does not complete)
    
        ```typescript
        users$.pipe(
            reduce((acc, curr) => acc + curr.postCount, 0)
        ).subscribe(observer);
        ```

    -   `toArray`
        -   `toArray<T>(): OperatorFunction<T, T[]>`
        -   `toArray` collects emitted values from the stream to combine an array then emits the array when the stream complete.
    
        ```typescript
        users$.pipe(
            reduce((acc, curr) => [...acc, curr], [])
        ).subscribe(observer);
        ```
    
        ```typescript
        users$.pipe(
            toArray()
        ).subscribe(observer);
        ```
    
    -   `buffer`
    
        -   `buffer<T>(closingNotifier: Observable<any>): OperatorFunction<T, T[]>`
        -   `buffer` saves emitted values and wait until `closingNotifier` to emit the values as an arrray
        -   `buffer` only run under condition (not really sure about the words)
        -   `observable` will still run under the hood, whenever `buffer` run, it emits all values accumulated before

        ```typescript
        const interval$ = interval(1000);
    
        const click$ = fromEvent(document, 'click');
    
        const buffer$ = interval$.pipe(
            buffer(click$)
        );
    
    
        const subscribe = buffer$.subscribe(
            val => console.log('Buffered Values: ', val)
        );
    
        // output có dạng
        "Buffered Values: "
        [0, 1]
        "Buffered Values: "
        [2, 3, 4, 5, 6]
        ```
    
    -   `bufferTime`
    
        -   `bufferTime<T>(bufferTimeSpan: number): OperatorFunction<T, T[]>`
    
        -   Work the same as `buffer`, but emit value every `bufferTimeSpan` ms
    
        ```typescript
        const source = interval(500);

        const bufferTime = source.pipe(
            bufferTime(2000)
        );

        const bufferTimeSub = bufferTime.subscribe(
            val => console.log('Buffered with Time:', val)
        );
        // output
        "Buffered with Time:"
        [0, 1]
        "Buffered with Time:"
        [2, 3]
        "Buffered with Time:"
        [4, 5]
        ...
        ```
## Day #22 RXJS Filtering Operators

-   `filter()`

    -   `filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any) : MonoTypeOperationFunction<T>`
    -   `filter()` takes a function `predicate` which returns `truthy` or `falsy` value. `filter()` will emit the value 
    of the `Observable` at that time, depending on the `truthy/falsy` value.
    
    ```typescript
    from([1, 2, 3, 4, 5, 6])
        .pipe(
            filter(x => x % 2 === 0)
        )
        .subscribe(console.log); // output: 2, 4, 6
    ```
    
-   `first()`

    -   `first<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`
    -   `first()` emits the first value of the `Observable`, then `complete`. `first()` will throw `EmptyError` 
    if the `Observable` `complete` before emitting any value (empty `Observable`, or creator operation which take no value)
    
    ```typescript
    from([1, 2, 3, 4, 5, 6])
        .pipe(
            first()
        )
        .subscribe(console.log, null, () => console.log('complete')); // output: 1 -> complete
    
    of() // empty observable
    .pipe(
        first()
    )
    .subscribe(console.log) // output: Error: EmptyError
    ```
    
    -   `first()` can take 2 optional parameters: `predicate` and `defaultValue`. `first()` will throw `Error` 
    if the `Observable` complete without having any value satisfy the condition from the `predicate`
    -   `first()` will not emit `Error` when we pass both `predicate` and `defaultValue`
    
    ```typescript
    from([1, 2, 3, 4, 5, 6])
        .pipe(
            first(x => x > 3)
        )
        .subscribe(console.log, null, () => console.log('complete')); // output: 4 -> complete
    
    from([1, 2, 3, 4, 5, 6])
        .pipe(
            first(x => x > 6) // without default value
        )
        .subscribe(null, console.log, null) // Error: Error
    
    from([1, 2, 3, 4, 5, 6])
        .pipe(
            first(x => x > 6),
        'default value'
    )   // with default value
    .subscribe(null, console.log, () => console.log('complete'));   // output: 'defaultValue' -> complete
    ```
    
-   `last()`
    
    -   `last<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`
    -   `last()` emits the last value of the `Observable` before it `complete`. `last()` has all the behaviors like `first()` does:
        -   Throw `EmptyError` if `Observable` `complete` before emitting any value
        -   Have 2 optional parameter: `predicate` and `defaultValue`
        -   Throw `Error` if the condition is not be satisfied
        -   Emit `defaultValue` when `predicate` and `defaultValue` are defined but no value satisfy the condition
        
-   `find()`

    -   `find<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, T | undefined>`
    -   `find()` emit the first value satisfying the condition from the `predicate`, then `complete`
    -   `find()` must have `predicate` and will not emit `Error` when the condition is not be satisfied
    
    ```typescript
    from([1, 2, 3, 4, 5, 6])
      .pipe(
        find((x) => x % 2 === 0) // số chẵn
      )
      .subscribe(console.log, null, () => console.log('complete')); // output: 2 -> complete
    ```
    
-   `single()`

    -   `single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): MonoTypeOperatorFunction<T>`
    -   Work like `first()`, but `single()` will throw `Error` when there is MORE THAN ONE value satisfy the condition
    -   `single()` does not have `defaultValue` and will emit `undefined` when the condition is not be satisfied
    -   Often used when `predicate` has a condition need to be satisfied
    -   `single()` throws `Error` when the `Observable` emits more than 1 value
    
    ```typescript
    from([1, 2, 3, 4, 5, 6]).pipe(single()).subscribe(null, console.log,null); // error: Error -> more than 1 value is emitted from from() and single()
    
    from([1, 2, 3])
        .pipe(single(x => x === 2))
        .subscribe(console.log, null, () => console.log('complete')); // output: 2 -> complete
    
    from([1, 2, 3])
        .pipe(single(x => x > 1))
        .subscribe(null, console.log, null); // error: Error -> more than 1 value > 1
    ```

-   `take()`

    -   `take<T>(count: number): MonoTypeOperationFunciton<T>`
    -   `take()` takes a parameter `count` to count the number of values got from the `observable`, then `complete`
    
    ```typescript
    from([1, 2, 3])
        .pipe(take(2))
        .subscribe(console.log, null, () => console.log('complete')); // output: 1, 2 -> complete
    ```
    
    -   special case: `take(1)`
    -   `take(1)` vs `first()`: `take(1)` will not throw any `error` when the `observable` `complete` without emitting any value
    -   When to use `take(1)`:
    
        -   notify where user click when they first go to the page
        -   get snapshot of data at a time
        -   Route Guard which return `Observable`
        
-   `takeLast()`

    -   `takeLast<T>(count: number): MonoTypeOperationFunction<T>`
    -   `takeLast()` will get the last `n` values emitted from the `observable`
    -   `takeLast()` emits only when `Observable` completes
    
    ```typescript
    from([1, 2, 3, 4])
        .pipe(takeLast(2))
        .subscribe(console.log, null, () => console.log('complete')); // output: 3, 4 -> complete
    ```

-   `takeUntil()`

    -   `takeUntil<T>(notifier: Observable<any>): MonoTypeOperationFunction<T>`
    -   `takeUntil()` take an `Observable` as the parameter to work as a `notifier` and will emit the value of the `Observable`
     until `notifier` emits
    
    ```typescript
    interval(1000)
        .pipe(takeUntil(fromEvent(document, 'click')))
        .subscribe(console.log, null, () => console.log('complete')); // output: 0, 1, 2, 3, 4 -- click --> 'complete'
    ```
    
    -   Use case in Angular:
        -   `takeUntil()` is used to unsubscribe `Observable` in `ngOnDestroy`
        -   Các bạn suy nghĩ mình có 1 destroySubject: Subject<void> tượng trưng cho notifier. 
        Khi ngOnDestroy() thực thi, chúng ta sẽ cho destroySubject.next() (emit) và sử dụng takeUntil(this.destroySubject)
         thì Observable trong Component sẽ được unsubscribe khi ngOnDestroy() thực thi -> khi Component unmount.

-   `takeWhile()`

    -   `takeWhile<T>(predicate: (value: T, index: number) => boolean, inclusive: boolean = false): MonoTypeOperatorFunction<T>`
    -   `takeWhile()` takes a parameter `predicate`
    
    ```typescript
    interval(1000)
        .pipe(takeWhile(x => x < 6))
        .subscribe(console.log, null, () => console.log('complete')); // output: 0, 1, 2, 3, 4, 5 -> complete
    ```
    
    -   Use `takeWhile()` to `unsubscribe` from the value `Observable` emits
    -   Use `takeUntil()` when there is an external `notifier`
    
-   `skip()`

    -   `skip<T>(count: number): MonoTypeOperationFunction<T>`
    -   `skip()` is opposite to `take()`, `skip()` will skip the first `n` value
    
    ```typescript
    from([1, 2, 3])
        .pipe(skip(1))
        .subscribe(console.log, null, () => console.log('complete')); // output: 2, 3, 4 -> complete
    ```
    
-   `skipUntil()`

    -   `skipUntil<T>(notifier: Observable<any>): MonoTypeOperationFunction<T>`
    -   Similar to `skip()` and `takeUntil()`
    
    ```typescript
    interval(1000)
        .pipe(skipUntil(fromEvent(document, 'click')))
        .subscribe(console.log) // output: click at 5 second -> 5, 6, 7, 8 ...
    ```
    
-   `skipWhile()`

    -   `skipWhile<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperationFunction<T>`
    -   Similar to `takeWhile()` and `skip()`
    
    ```typescript
    interval(1000)
        .pipe(skipWhile(x => x < 5))
        .subscribe(console.log) // output: 6, 7, 8 ...
    ```
    
-   `distinct()`

    -   `distinct<T, K>(keySelector?: (value: T) => K, flushes?: Observable<any>): MonoTypeOperationFunction<T>`
    -   `distinct()` compares emitted values from `Observable` and will only emit new value (not yet been emitted)
    
    ```typescript
    from([1, 2, 3, 4, 5, 6, 1])
        .pipe(distinct())
        .subscribe(console.log, null, () => console.log('complete')); // output: 1, 2, 3, 4, 5, 6 -> complete
    ```
    
    -   `distinct()` has an optional parameter `keySelector` function to decide which property need to be compared when `Observable`
        emits a complex `Object`
        
    ```typescript
    of({age: 4, name: 'Foo'}, {age: 7, name: 'Bar'}, {age: 5, name: 'Foo'})
        .pipe(distinct(p => p.name))
        .subscribe(console.log, null, () => console.log('complete')); // output: {age: 4, name: 'Foo'}, {age: 7, name: 'Bar'} -> complete
    ```
    
-   `distinctUnchanged()`

    -   `distinctUnchange<T, K>(compare?: (x: K, y: K) => boolean, keySelector?: (x: T) => K): MonoTypeOperation Function<T>`
    -   Similar to `distinct()`, `distinctUnchange()` compare value which is going to be emitted with the last emitted value from the `Observable`
    
    ```typescript
    from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4])
        .pipe(distinctUntilChanged())
        .subscribe(console.log, null, () => console.log('complete')); // output: 1, 2, 1, 2, 3, 4 -> complete
    ```
    
    -   `distiinctUnchange()` has 2 optional paramters `compare` and `keySelector` function
    -   Without `compare`, `distinctUnchange()` uses `===` operator to compare, or `distinctUnchange()` will skip the value when `compare` function return `true`
    
    ```typescript
    of(
        {age: 4, name: 'Foo'},
        {age: 6, name: 'Foo'},
        {age: 7, name: 'Bar'},
        {age: 5, name: 'Foo'},
    )
        .pipe(distinctUnchanged((a, b) => a.name === b.name))
        .subscribe(console.log, null, () => console.log('complete')); // output: {age: 4, name: 'Foo'}, {age: 7, name: 'Bar'}, {age: 5, name: 'Foo'} -> complete
    ```

-   `distinctUntilKeyChanged()`

    -   `distinctUntilKeyUnchanged<T, K extends keyof T>(key: K, compare?: (x: T[K], y: T[K] => boolean): MonoTypeOperationFunction<T>`
    -   `distinctUntilKeyChanged()` = `distinctUntilChanged()` + `keySelector`
    
    ```typescript
    of(
        {age: 4, name: 'Foo'},
        {age: 6, name: 'Foo'},
        {age: 7, name: 'Bar'},
        {age: 5, name: 'Foo'}, 
    )
        .pipe(distinctUntilKeyChanged('name'))
        .subscribe(console.log, null, () => console.log('complete')); // output: {age: 4, name: 'Foo'}, {age: 7, name: 'Bar'}, {age: 5, name: 'Foo'} -> complete
    ```

#### Rate limiting operators
-   `throttle()/throttleTime()`

    -   `throttle<T>(durationSelector: (value: T) => SubscribableOrPromise<any>, config: ThrottleConfig = defaultThrottleConfig): MonoTypeOperatorFunction<T>`
    -   `throttleTime<T>(duration: number, scheduler: SchedulerLike = async, config: ThrottleConfig = defaultThrottleConfig): MonoTypeOperatorFunction<T>`

    -   `throttleTime()` take a parameter `duration` (millisecond). When `Observable` emit the first value, `throttleTime()` will emit this value, then run timer with the `duration`.
        When the timer is running, all values emitted from the `Observable` are skipped. When the timer is over, `throttleTime()` wait for the next value from the `Observable`
        
    -   `throttle()` is similar to `throttleTime()`; however, `throttle()` takes an `Observable` as `durationSelector`. When the `durationSelector` emits value or `complete`, the timer will stop,
        then `throttle()` wait for the next value emitted from the `Observable`

    ```typescript
    fromEvent(document, 'mousemove')
        .pipe(throttleTime(1000))
        .subscribe(console.log, null, () => console.log('complete')); // output: MouseEvent {} - wait 1s -> MouseEvent { } - wait 1s -> MouseEvent { }
    ```
    
    -   `throttleTime()` can take a parameter `throttleConfig: {leading: boolean, trailing: boolean}` to decide whether 
        `throttleTime()` should emit the first or the last value when the `timer` is over. Default: `{leading: true, trailing: false}`

    -   `throttleTime()` is used to handle DOM `event` (`mousemove`) without emitting too many `event`

-   `debounce()/debounceTime()`

    -   `debounce<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>`
    -   `debounceTime<T>(dueTime: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`
    -   `debounceTime()` takes a parameter `dueTime`. `debounceTime()` will skip value emitting from the `Observable`
        and will run the `timer` with `dueTime`
    -   `debounceTime()` will emit the last value emitted from the `Observable` when the `timer` is over

    -   `debounce()` takes an `Observable` as `durationSelector`. The `timer` will run depend on `durationSelector`, instead of `dueTime`

    ```typescript
    this.filterControl.valueChanges.pipe(debounceTime(500)).subscribe(console.log); // output: type 'abcd' -> stop 500ms -> 'abcd'
    ```
    -   `debounceTime()` is a good use for implementing input to filter a list

-   `audit()/auditTime()`

    -   `audit<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>`
    -   `auditTime<T>(duration: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`
    
    -   `auditTime()` will run when the first value is emitted from the `Observable`
    -   skip all value in the duration time
    -   emit the latest value from the `Observable` when the timer is disabled/over
    -   timer will run again when the next value is emitted from the `Observable`
    
    -   `auditTime()` takes a parameter `duration` and is similar to `throttleTime()` with `{trailing: true}`. When the `timer` is over,
        `auditTime()` will emit the latest value emitted from the `Observable`
    
    ```typescript
    fromEvent(document, 'click').pipe(auditTime(1000)).subscribe(console.log); // output: click -> wait 1s -> MouseEvent {} -click  wait 1s (trong 1s, click 10 times) -> MouseEvent {} -> click wait 1s -> MouseEvent {}
    ```
    
-   `sample()/sampleTime()`

    -   `sample<T>(notifier: Observable<any>): MonoTypeOperationFunction<T>`
    -   `sampleTime<T>(period: number, scheduler: SchedulerLike = async): MonoTypeOperationFunction<T>`
    
    -   `timer` will run immediately without having to wait for the first value emitted from the `Observable`
    -   `timer` will run continuously without having to wait for the value from the `Observable`
    
    -   `sampleTime()` takes a parameter `period`. When the `Observable` is `subscribed`, the `timer` will run immediately and emit the latest value
        from the `Observable` after each `period`
    
    ```typescript
    fromEvent(document, 'click').pipe(sampleTime(1000)).subscribe(console.log); // output: click -> wait 1s -> MouseEvent {}
    ``` 
####4 Time Operators:
 
![Difference](src/assets/image/rxjs-debounce-audit-sample-throttle.png)
[Reference: Dev.to](https://dev.to/kosich/debounce-vs-throttle-vs-audit-vs-sample-difference-you-should-know-1f21)

## Day #23 RXJS Combination Operators

-   `forkJoin()`

    -   `forkJoin(...source: any[]): Observable<any>`
    -   `forkJoin()` is similar to `Promise.all()`
    -   `forkJoin()` takes a list of `Observable` (`Array` or `Dictionary`). When all the children `Observable` `complete`,
        `forkJoin()` emits children `Observable` values as `Array` or `Dictionary`, then `complete`
    -   The oder does matters

    ```typescript
    forkJoin([of(1), of('hello'), of({foo: 'bar'})]).subscribe(observer);
    // output: [1, 'hello', {foo: 'bar'}] -> complete
    ```
    -   `forkJoin()` will only emit values when all the children `Observable` `complete`, otherwise it will never emit
    -   `forkJoin()` will throw `error` when a child `Observable` throw `error`, not correctly handling `error` might
        lead to the loss of other complete `Observable` values
    
    -   `forkJoin()` is commonly used to request multiple `Dropdown/Select`
    
    ```typescript
    forkJoin([
        this.apiService.getAccountDropdown(),
        this.apiService.getUserDropdown(),
        this.apiService.getHomeDropdown()
    ]).subscribe(observer);
    // output: [accountList, userList, homeList] -> complete
    ```
    
    -   `forkJoin()` can take an optional parameter `projectFunction` when the children `Observable` is an `Array`
    -   `projectFunction` will run with the parameter is child `Observable` value, the returned value from `projectFunction`
        will be the result of `forkJoin()`
    -   `projectFunction` will only be executed only when `forkJoin()` will be running (all children `Observable` `complete`)
    
    ```typescript
    forkJoin(
        [
            this.apiServices.getAccountDropdown(),
            this.apiServices.getDepartmentDropdown(),
            this.apiServices.getStoreDropdown()
        ],
        (accountList, departmentList, storeList) => {
            return {
                accounts: accountList,
                departments: departmentList,
                stores: storeList
            }
        }
    ).subscribe(observer);
    // output: {account: [...], departments: [...], stores: [...]} -> complete
    ```
    
-   `combineLatest()`

    -   `combineLatest<O extends ObservableInput<any>, R>(...observables: (SchedulerLike | O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<R>`
    -   Similar to `forkJoin()`, `combineLatest()` takes an `Array<Observable>`
    -   `combineLatest()` does not take a `Dictionary` and will emit all children `Observable` emitting at least one time, means that
        child `Observable` does not need to `complete` but emit one value to have `combineLatest()` emit the `Array` of emitted values from
        the children `Observable` in the right order
    -   `combineLatest()` emits the first value when all the children `Observable` have emitted at least one time
    -   `combineLatest()` will next emit value whenever a child `Observable` emits value
    -   `combineLatest([obs1, obs2]) === combineLatest(obs1, obs2)`
    ```typescript
    combineLatest([
        interval(2000).pipe(map(x => `First${x}`)), // {1}
        interval(1000).pipe(map(x => `Second${x}`)), // {2}
        interval(3000).pipe(map(x => `Third${x}`)) // {3}
    ]).subscribe(observer);
    
    // output:
    // After 3s, because interval(3000) has the longest time:
    // [First 0, Second 2, Third 0] -> At the third second, {2} has already emitted 3 times (3 seconds, 1 second each 0 -> 1 -> 2)
    
    // After 1s (4s in total):
    // [First 1, Second 2, Third 0] -> At 4th second, {1} emitted 2 times (4 seconds, 2 seconds each 0 -> 1)
    // [First 1, Second 3, Thrid 0] -> At the 4th second, {2} emiited 4 times (0 -> 1 -> 2 -> 3)
    
    // After 1s (5s in total):
    // [First 1, Second 4, Third 0] -> {2} emitted 5 times
    
    // After 1s (6s in total):
    // [First 2, Second 4, Third 0] -> {1} emitted 3 times
    // [First 2, Second 5, Third 0] -> {2} emitted 6 times
    // [First 2, Second 5, Third 1] -> {3} emitted 2 times
    ```
    
    -   Note: 
        -   After the first time emitting value of childred `Observable`, `combineLatest()` emits the newest value of child
            `Observable` which is currently emitting value, and the latest value of other children `Observable` emitted
        -   The 2nd `Observable` `{2}` lost 2 first emitted values `0` and `1` because `{2}` emit rate was faster than the
            longest emit duration `Observable`, `{3}`. Be careful to avoid `racing condition`
        -   `combineLatest()` will `complete` when all children `Observable` `complete`
        -   `combineLatest()` will never `complete` when one child `Observable` does not `complete`
        -   `combineLatest()` will throw an `error` when a child `Observable` throw an `error`. Emitted values from children
            `Observable` will be lost (similar to `forkJoin()`)
            
    -   Use-case:
    
    Commonly used to combine state when using `Service` in `Angular`. Due to `long-lived`, will not `complete` after
        emitting (use with `AsyncPipe`)
    
    ```typescript
    this.vm$ = combineLatest([
        this.paginationService.currentPage$,
        this.paginationService.currentSize$,
        this.paginationService.totalCount$,
        this.paginationService.currentOffset$
    ]).pipe(
        map((currentPage, currentSize, totalCount, currentOffset) => {
            return {
                currentPage,
                currentSize,
                totalCount,
                currentOffset
            };        
        })
    );
    
    onSizeChange(newSize: number) {
        this.paginationService.updateSize(newSize);
    }
    
    onPageChanged(newPage: number) {
        this.paginationService.updatePage(newPage);
    }
    ```
    
    ```typescript
    <ng-container *ngIf="vm$ | async as vm">
        <app-show-total
            [offset]="vm.currentOffset"
            [total]="vm.totalCount"
            [size]="vm.currentSize"
        ></app-show-total>
    <!-- Display: 1 - 20 of 100 -->
        <app-paginator
            [current]="vm.currentPage"
            [total]="vm.totalCount"
            [size]="vm.currentSize"
            (sizeChanged)="vm.onSizeChanged($event)"
            (pageChanged)="vm.onPageChanged($event)"
        ></app-paginator>
    </ng-container>    
    ```
    
    When `updateSize()` and `updatePage()` are executed, `currentSize$` and `currentPage$` emit new value, causing `combineLatest()`
    `vm$` emit new value and the `template` will be updated (`vm$ | async`)
    
    Like `forkJoin()`, when the parameter is an `Array<Observable>`, `combineLatest()` can take another parameter `projectFunction`.
    `projectFunction` will be executed with the parameter is the value of children `Observable`, the result of `projectFunction` will be
        emitted result of `combineLatest()`
        
    ```typescript
    this.vm$ = combineLatest([
        this.paginationService.currentPage$,
        this.paginationService.currentSize$,
        this.paginationService.totalCount$,
        this.paginationService.currentOffset$
    ],
        (currentPage, currentSize, totalCount, currentOffset) => {
            return { currentPage, currentSize, totalCount, currentOffset };
        }
    );
    ```
    
-   `zip()`
    -   `zip<O extends ObservableInput<any>, R>(...observables: (O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<ObservedValueOf<O>[] | R>`
    -   `zip()` takes parameters `...(Observables | Function)` which is child `Observable` passed in one by one
    -   `zip()` gathers emitted values from the children `Observable` as groups
    -   Example: `Obs1 emits 1 - 2 - 3`, `obs2 emits 4 - 5 - 6`, `obs3 emits 7 - 8 - 9`
        -   `combineLatest()`
        ```typescript
        combineLatest(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
        // [1, 4, 7], // all three 3 observables emit
        // [2, 4, 7], // obs1 emits 2, combineLatest() emits the value of obs1 and 2 latest values of obs2 and obs3
        // ...
        // [3, 6, 9]
        ```
        -   `zip()`
        ```typescript
        zip(of(1, 2, 3, 99), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
        // [1, 4, 7], // 3 first numbers of 3 observables
        // [2, 5, 8], // 3 next numbers
        // [3, 6, 9], // 3 last numbers
        ```
    -   `zip()` will `complete` when one of the children `Observable` `complete`, we can only get the grouped values of `zip`
    ```typescript
        zip(of(1, 2, 3, 99), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);
        // [1, 4, 7], // 3 first numbers of 3 observables
        // [2, 5, 8], // 3 next numbers
        // [3, 6, 9], // 3 last numbers
        // 99 was skipped due to that obs2 and obs3 were completed
    ```
    -   `zip()` will throw `error` when a child `Observable` throw error
    -   `zip()` will treats the last parameter as `projectFunction` if it is a `function`. `projectFunction` works the same as
        one in `forkJoin()` and `combineLatest()`
    -   Use-case:
        -   When the final values are provided by many different `Observable`
        ```typescript
        const age$ = of<number>(29, 28, 30);
        const name$ = of<string>('Chau', 'Trung', 'Tiep');
        const isAdmin$ = of<boolean>(true, false, true);
        
        zip(age$, name$, isAdmin$).pipe(
            map(([name, age, isAdmin]) => ({age, name, isAdmin}))
        );
        // output
        // { age: 29, name: 'Chau', isAdmin: true }
        // { age: 28, name: 'Trung', isAdmin: false }
        // { age: 30, name: 'Tiep', isAdmin: true }
        
        // using with projectFunction
        zip(age$, name$, isAdmin$, (age, name, isAdmin) => ({
            age, name, isAdmin
        })).subscribe(observer);
        ```
        
        -   Need to combine values of 2 different `Observables` at different time (get mouse position from `mousedown` to `mouseup`,
            or get the time duration using `new Date()` in stead of `getCoords()`)
        ```typescript
        cosnt log = (event, val) => `${event}: ${JSON.stringify((val))}`;
        const getCoords = pipe(
            map((e: MouseEvent) => ({ x: e.clientX, y: e.clientX }))
        );
        const documentEvent = (eventName) => {
            fromEvent(document, eventName).pipe(getCoords);
        };
        
        zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e => console.log(`${log('start', e[0])} ${log('end', e[1])}`));
        // output
        // start: { "x": 291, "y": 136 } end: { "x": 143, "y": 168 }
        // start: { "x": 33, "y": 284 } end: { "x": 503, "y": 74 }
        ```
        
-   `concat()`

    -   `concat<O extends ObservableInput<any>, R>(...observables: (SchedulerLike | O)[]): Observable<ObservedValueOf<O> | R>`
    -   `concat()` takes parameter `...Observables` as children `Observables` passed in respectively, in stead of an `Array<Observable>`
    -   `concat()` subscribes to children `Observables` in the order they were passed in
    -   `concat()` will emit when the currently subscribed `Observable` `complete` ({1})
        -   `{1}` emits and completes, `concat()` will emit the emitted value from `{1}`, then subscribe to the next `Observable`
        -   `{1}` throws error, `concat()` throw will error and skipp all the next `Observables`
        -   `{1}` complets without emitting any value,  `concat()` will skip and subscribe to the next `Observable`
        -   `{1}` emits value but never `complete`, `concat()` emit that value and WILL NOT SUBSCRIBE to the next `Observable`

    -   `concat()` will complete when there is no next `Observable`
    
    ```typescript
    concat(of(4, 5, 6).pipe(delay(1000)), of(1, 2, 3)).subscribe(observer);
    // output
    // after 1s:
    // 4-5-6-1-2-3
    // complete
    ```
    -   `concat()` waits until `of(4, 5, 6).pipe(delay(1000))` emit and `complete` that it will emit `4-5-6`, then subscribe to `of(1, 2, 3)`
    -   Pass the same `Observable` many times to `concat()`
    
    ```typescript
    const fiveSecondsTimer = interval(1000).pipe(take(5));
    
    concat(fiveSecondsTimer, fiveSecondsTimer, fiveSecondsTimer).subscribe(observer);
    // output: 0, 1, 2, 3, 4 - 0, 1, 2, 3, 4 - 0, 1, 2, 3, 4
    // output: 'complete'
    
    // using with repeat()
    concat(fiveSecondsTimer.pipe(repeat(3))).subscribe(observer);
    // output: 0, 1, 2, 3, 4 - 0, 1, 2, 3, 4 - 0, 1, 2, 3, 4
    // output: 'complete'
    ```

-   `merge()`

    -   `merge<T, R>(...Observables: any[]): Observable<R>`
    -   `merge()` takes parameter `...Observables` as children `Observables` passed in respectively, in stead of an `Array<Observable>`
    -   `merge()` will not be affected by the order of children `Observables`, causing `merge()` not being stopped subscribing to the
        next `Observable` wehen the current one never `comoplete`
    -   The last parameter of `merge()` will be treated as the ` concurrent` when it is a `number`
    -   `concurrent` defines the number of children `Observables` that `merge()` will subscribe concurrently
    -   By default, `merge()` will subscribe to all children `Observables` concurrently
        -   emit any value emitted from any `Observable`
        -   throw `error` when any of the `Observable` throw `error`
        -   `complete` only when all the children `Observable` `complete`
        
    ```typescript
    merge(of(4, 5, 6).pipe(delay(1000)), of(1, 2, 3)).subscribe(observer);
    // output:
    // 1, 2, 3
    // after 1s: 4 , 5, 6
    // complete
    ```
    
    -   `merge()` will emit `1, 2, 3` right away regardless the children `Observables` order
    
    ```typescript
    merge(
        interval(2000).pipe(mapTo('emit every 2s'), take(3)),
        interval(1000).pipe(mapTo('emit every second'), take(3))
    ).subscribe(observer);
    
    // output
    // after 1s: 
    // "emit every second"
    // after 2s: 
    // "emit every 2s"
    // "emit every second"
    // after 3s:
    // "emit every second" -> complete due to emit 3 times
    // after 4s:
    // "emit every 2s"
    // after 6s:
    // "emit every 2s" -> complete
    // output: 'complete'
    ```
    
    -   Using with `concurrent`
    
    ```typescript
    merge(
        interval(1000).pipe(mapTo('first'), take(5)), // will take 5s to complete
        interval(2000).pipe(mapTo('second'), take(3)), // will take 6s to complete
        interval(3000).pipe(mapTo('third'), take(2)), // will take 6s to complete
        2
    ).subscribe(observer);
    
    // output
    // after 1s:
    // first
    // after 2s:
    // first
    // second
    // after 3s:
    // first
    // after 4s:
    // first
    // second
    // after 5s:
    // first -> complete, then third will be subscribed
    // after 6s:
    // second -> complete
    // after 8s: 
    // third
    // after 11s:
    // third -> complete
    ```
    
    -   `concat()` is the shorthand of `merge()` with `concurrent = 1`
    
    -   Use-case:
        -   When there are many `FormGroup` and we need to listen to every `FormControl.valueChanges` and the order does not matter
        
        ```typescript
        const formControlValueChanges = Object.keys(this.formGroup.value).map(key => (
            this.formGroup.get(key).valueChanges.pipe(map(value => ({key, value})))
        )); // { firstName: 'Chau', lasName: 'Tran' } -> [Observable<{key, value}>, Observable<{key, value}>]
        merge(...formControlValueChanges).subscribe(({key, value}) => {
            if (key === 'firstName') {...}
            if (key === 'lasName') {...}
        });
        ```
        
-   `race()`

    -   `race<T>(...observables: any[]): Observable<T>`
    -   `race()` has the same parameters as `merge()` and `concat()`
    -   `race()` will emit the first emiited value from the child `Observable`, repeats until one child `Observable` `complete`
    -   `race()` will throw `error` when a child `Observable` throw `error`

    ```typescript
    race(
        interval(1000).pipe(mapTo('fast')),
        interval(2000).pipe(mapTo('medium')),
        interval(3000).pipe(mapTo('slow'))
    ).subscribe(observer);
    // output: 1s -> fast -> 1s -> fast -> 1s -> fast ...
    ```

    -   Use-case:
        -   To display a banner according to user's action (user submits a form -> display the success notification 
            banner/ or error. Objective: Hide the banner when 1 condition out of 3 is satisfied):
            -   After 10s displaying
            -   User closes the banner
            -   User navigates to another page

        ```typescript
        race(
            timer(10000), // timer 10s
            this.userClick$, // user click event
            this.componentDestroy$, // navigate -> destroy
        )
            .pipe(takeUntil(this.componentDestroy$)) // do not listen to race anymore when the commponent destroy
            .subscribe(() => this.closeBanner());
        ```

    -   These above operators are `static function`. The next operators are `pipeable operator`, meaning they can be used
        with `pipe()` and will be wrapped by an `Observable`, called `Outer Observable`

-   `withLatestFrom()`

    -   `withLatestFrom<T, R>(...args: any[]): OperatorFunction<T, R>`
    -   `withLatestFrom()` take an `Observable` parameter
    -   `withLatestFrom()` combine emitted values from `Outer Observable` with the latest value emitted from the parameter 
        `Observable` to an `Array`, then emits the `Array`
        
    ```typescript
    fromEvent(document, 'click')
        .pipe(withLatestFrom(interval(1000)))
        .subscribe(observer);
    // output
    // click before 1s --- wait until 1s -> [MouseEvent, 0]
    // click after 1s -> [MouseEvent, 0];
    // click at 5.5s -> [MouseEvent, 4]; // after 5s, the latest value of interval(1000) is 4 (0, 1, 2, 3, 4)
    ```
    
    -   `withLatestFrom()` has an optional parameter `projectFunction`

    -   Use-case:
        -   Because `withLatestFrom()` only emits when `Outer Observable` emits, it will be used to listen to one `Observable`
            (the `Outer Observable`) and the latest value from another `Observable`. `combineLatest()` will emit every time
            the other `Observable` emit, which is not needed
    
        ```typescript
        this.apiService.getSomething().pipe(withLatestFrom(this.currentLoggedInUser$));
        // make an api request -> use the request result + logged in user information to implement some logic        
        ```

-   `startWith()`

    -   `startWith<T, D>(...array: (SchedulerLike | T)[]): OperatorFunction<T, T | D>`
    -   `startWith()` take `list` parameter
    -   The first value be emitted will the the value of `startWith()`, then the value of `Outer Observable`
    -   `startWith()` will emit the value right away without depending on whether `Outer Observable` has emitted value or not

    ```typescript
    of('world').pipe(startWith('Hello')).subscribe(observer);
    // output:
    // 'Hello'
    // 'world'
    // 'complete'
    ```
    
    -   Use-case:
        -   Use `startWith()` to provide intial value for api request
        
        `this.book$ = this.apiService.getBooks().pipe(startWith([]));`
        
        ```typescript
        <ng-container *ngIf="book$ | async as books">
            <!-- books$ === [] -> truthy -> content inside ng-container will be rendered -->
        </ng-container>
        ```

-   `endWith()`

    -   `endWith<T>(...array: (SchedulerLike | T)[]): OperatorFunction<T>`
    -   `endWith()` takes a `list` as parameter and works against `startWith()`
    -   `endWith()` will emit value whenever `Outer Observable` `complete`
    
    ```typescript
    of('hi', 'how are you?', 'sorry, I have to go')
        .pipe(endWith('goodbye!'))
        .subscribe(observer);
    // ouput: 
    // hi
    // how are you?
    // sorry, I have to go
    // goodbye!
    ```

-   `pairwise()`

    -   `pairwise<T>(): OperatorFunction<T, [T, T]>`
    -   `pairwise()` combine latest values and the currently being emitted value of the `Outer Observable` to an `Array` and emit that `Arrau`
    
    ```typescript
    from([1, 2, 3, 4, 5])
        .pipe(
            pairwise(),
            .map((prev, cur) => prev + cur)
        ).subscribe(observer);
    // ouput: 
    // 3 (1 + 2)
    // 5 (2 + 3)
    // 7 (3 + 4)
    // 9 (4 + 5)
    ```

## DAY 24 - RXJS ERROR HANDLING & CONDITIONAL OPERATORS

#### RxJS error handling operators

-   `catchError`

    -   Use `catchError` to catch the `error` and handle it (e.g. to transform the `error` to a value) without terminate
        the `stream`
    -   `catchError<T, O extends ObservableInput<any>>(selector: (err: any, caught: Observable<T>) => O): OperatorFunction
        <T, T | ObservedValueOf<O>>`
        
    ```typescript
    const observer = {
        next: val => console.log(val),
        error: err => console.error(err),
        complete: () => console.log('complete')
    };
    import {of} from 'rxjs';
    import {map, catchError} from 'rxjs/operators';
    const cached = [4, 5];
    of(1, 2, 3, 4, 5)
        .pipe(
            map(n => {
                if (cached.includes(n)) {
                    throw new Error('Duplicated: ' + n);
                }   
                return n;
            }),
            catchError((err, caught) => of(err))
        ).subscribe(observer);
    
    // output:
    // --1--2--3--(next: Error)
    ```
    
    -   By default, `observer.error` will be responsible for handling `Error`, however, `next: Error` is returned, this
        `error` will be handled by `observer.next`

    -   Use `catchError` to prevent `forkJoin` from emitting `error` from child `Observable`, split the `error` in the next
        `pipe` by using `catchError`

    ```typescript
    forkJoin([
        of(1),
        of(2),
        throwError(new Error('401')),
    ]).subscribe(observer);
    // output:
    // --(x: Error 401)
    
    //with catchError
    forkJoin([
        of(1),
        of(2),
    throwError(newError('401')).pipe(catchError(err => of(err))
    ),
    ]).subscribe(observer);
    
    // output: 
    // (next: [1, 2, Error 401])
    ```

    -   `retry` can be used if we return to the previous `Observable` (source `Observable`), but be careful of infinity loop
    -   Use `take` to `retry` with number of time limit
    
    ```typescript
    of(1, 2, 3, 4, 5)
        pipe(
            map(n => {
                if (cached.includes(n)) {
                    throw new Error('Duplicate: ' + n)
                }
                return n;
            }),
            catchError((err, caught) => caught),
            take(10)
        ).subscribe(observer);
    // output:
    // --1--2--3--1--2--3--1|
    ```
    
    -   In `catchError`, we can throw `error` to the next `pipe` to handle it

-   `retry`

    -   Return an `Observable` that mirors the source `Observable` with the exception of an `error`. If the source `Observable`
        calls error, this method will resubscribe to the source `Observable` for a maximum of count resubscription 
        (given as a number parameter) rather than propagating the error call
    
    -   `retry<T>(count: number = -1): MonoTypeOperatorFunction<T>`
    -   This operator will resubscribe to the source `Observable` when there is `error` emitted from the source
    -   When there is no `count` parameter, there will be no limit for `retry` time and vice versa
    
    -   Commonly use to retry `HTTP request` (only for getting data, not for creating, updating or deleting to prevent race condition)
    
    ```typescript
    const cached = [4, 5];
    of(1, 2, 3, 4, 5)
        .pipe(
            map(n => {
                if (cached,includes(n)) {
                    throw new Error('Duplicated ' + n);
                }        
                return n;
            }),
            retry(3)
        ).subscribe(observer);
    // ouput:
    // --1--2--3--1--2--3--1--2--3--1--2--3--(x: Error)
    ```

    -   `retryWhen` can be used to control when to `retry`
    -   Use-case: `retryBackoff` operator - which will increase time after each `retry`
    
    ```typescript
    export function retryBackoff(
      config: number | RetryBackoffConfig
    ): <T>(source: Observable<T>) => Observable<T> {
      const {
        initialInterval,
        maxRetries = Infinity,
        maxInterval = Infinity,
        shouldRetry = () => true,
        resetOnSuccess = false,
        backoffDelay = exponentialBackoffDelay,
      } = typeof config === 'number' ? { initialInterval: config } : config;
      return <T>(source: Observable<T>) =>
        defer(() => {
          let index = 0;
          return source.pipe(
            retryWhen<T>(errors =>
              errors.pipe(
                concatMap(error => {
                  const attempt = index++;
                  return iif(
                    () => attempt < maxRetries && shouldRetry(error),
                    timer(
                      getDelay(backoffDelay(attempt, initialInterval), maxInterval)
                    ),
                    throwError(error)
                  );
                })
              )
            ),
            tap(() => {
              if (resetOnSuccess) {
                index = 0;
              }
            })
          );
        });
    }
    ```

#### RxJS Error Conditional Operators

-   `defaultIfEmpty/throwIfEmpty`
    -   `defaultIfEmpty<T, R>(defaultValue: R = null): OperatorFunction<T, T | R>`
    -   `throwIfEmpty<T>(errorFactory: () => any = defaultErrorFactory): MonoTypeOperatorFunction<T>`
    -   These 2 operators return corresponding values (default value or `Error`) when the source stream is empty (complete
        without emitting any value)
        
    -   E.g. Create a transaction that will be cancelled and throw error if there is no confirmation after 1s
    
    ```typescript
    const click$ = fromEvent(document, 'click');
    
    click$.pipe(
        takeUntil(timer(1000)),
        throwIfEmpty(
            () => new Error('the document was not click within 1s')
        ),
    ).subscribe(observer);
    ```

-   `every`

    -   Returns an `Observable` that emits whether or not every item of the source satisfies the specified condition
    -   `every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, boolean>`
    -   This operator will return true when all the source's emitted values satisfy the `predicate`
    -   There will be nothing emitted when the source does not `complete`
    
    ```typescript
    of(1, 2, 3, 4, 5, 6).pipe(
        every(x => x < 5),
    ).subscribe(observer);
    // output: ---false
    ```
    
    -   Use first with `predicate` to get the behavior like `some`
    
    ```typescript
    of(1, 2, 3, 4, 5, 6).pipe(
        first(x => x > 10, false),
        map(v => Boolean(v))
    ).subscribe(observer);
    // output: --- true
    ```
    
-   `iif`

    -   Decides at subscription time which Observable will actually be subscribed
    -   `iif<T = never, F = never>(condition: () => boolean, trueResult: SubscribableOrPromise<T> = EMPTY, 
        falseResult: SubscribableOrPromise<F> = Empty): Observable<T | F>`
    -   This operator is use to select which `Observable` to subscribe under condition
    -   `iif` accepts a condition function and two `Observables`. When an `Observable` returned by the operator is subscribed, 
        condition function will be called. Based on what boolean it returns at that moment, consumer will subscribe either 
        to the first `Observable` (if condition was true) or to the second (else false). Condition function may also not 
        return anything - in that case condition will be evaluated as false and second `Observable` will be subsribed
    -   Note that `Observable` for both cases (true and false) are optional. If condition points to an `Observable` that 
        was left undefined, resulting stream will simply complete immediately. That allows you to, rather than controlling
        which `Observable` will be subscribed, decide at runtime if consumer should have access to given `Observable` or not
    -   If you have more complex logic that requires decision between more than two `Observables`, `defer` will probably 
        be a better choice. Actually `iif` can be easily implemented with `defer` and exists only for convenience and readability reasons
        
    ```typescript
    let subscribeToFirst;
    const firstOrSecond = iif(
        () => subscribeToFirst,
        of('first'),
        of('second'))
    )
    
    subscribeToFirst = true;
    firstOrSecond.subscribe(value => console.log(value));
    
    // Logs:
    // 'first'
    
    subscribeToFirst = false;
    firstOrSecond.subscribe(value => console.log(value));
    
    // Logs:
    // 'second'
    ```
    
## DAY 25 RXJS HIGHER ORDER OBSERVABLES AND UTILITY OPERATORS

-   Higher Order Observables
    -   HOOs are operators which take `Outer Observable` (`Source`) and return an `Inner Observable` (`Destination`)
    
    ```typescript
    interval(1000)
    .pipe(map(val => val * 2))
    .subscribe(observer);
    // output: 0 -- 2-- 4 -- 6 -- 8
    ```
    
    ```typescript
    fromEvent(document, 'click')
        .pipe(map(() =>  interval(1000)))
        .subscribe(observer);
    // click
    // output: Observable {}
    // click
    // output: Observable {}
    // click
    // output: Observable {}
    ```

    ```typescript
    const source = fromEvent(document, 'click').pipe(map(() => interval(1000)));

    source.pipe(mergeAll()).subscribe(console.log);
    source.pipe(switchAll()).subscribe(console.log);
    source.pipe(concatAll()).subscribe(console.log);
    ```

    -   `mergeAll/switchAll/concatAll` transform `Higher Order Observable` into `First Order Observable` by subscribing to
        `Observables` returned from `map()`
    -   `Higher Order Observable === mergeAll/switchAll/concatAll + map()`

    ```typescript
    this.queryInput.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
        this.apiService.filterData(query).subscribe(data => {
            ...
            return;
        });
    });
    ```

    -   Use-case: `FormControl` with `queryInput` used to handle a `Text Input`. We listen to `valueChanges` to make api request
        with new `query`. However, the above codes is an example of `Nested Subscription`
        -   User types `"abc"` in `queryInput` and stop
        -   After 500ms, (`debounceTime()`), `valueChanges` emits `abc` and we subscribe to `valueChanges` with the 
            `observer`: `query => {...}`
        -   Make api request by calling `apiService.filterData(query)`, which is also an `Observable, and subscribe to it
        -   After some time, we get the `data` and display it on the template
    
        Things work fine, until:
        
        -   User deletes `abc`, types `xyz`, make api request `apiService.filterData(query)` with `xyz` {1}
        -   User changes `query` from `xyz` to `abcxyz`
        -   After 500ms, call `apiService.filterData(query)` with `abcxyz` {2}
        -   {1} finished and returned `data`. `data` from {1} should be the `data` with `xyz`, not `abcxyz` --> racing condition
    
    -   We should avoid `Nested Subscription` due to that we cannot handle both the 2 `Observable` synchronously. The solution is using `HOOs`

-   `switchMap()`
    -   `switchMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: 
        (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`
    -   `switchMap()` takes a `projectFunction` which will take emitted values from the `Outer Observable` and will return 
        an `Observable` (`Inner Observable`)
    -   The final value of the `Outer Observable` using with `switchMap()` will be the emitted value from the `Inner Observable`

    ```typescript
    fromEvent(document, 'click').pipe(
        switchMap(() => interval(1000).pipe(take(10)))
    );
    ```
    -   `fromEvent(document, 'click')`: create an `Observable` from `click` event on `document`. A value will be emitted after `click`
    -   `interval(1000).pipe(take(10))`: return an `Observable` emitting 1 value each second and will complete after 10 seconds
    -   When the `Outer Observable` emits a new value, an `Inner Observable` is returned, then `switchMap()` will subscribe to the `Inner Observable`
    -   `switchMap()` will `unsubscribe` to the `Inner Observable` when a new `Inner Observable` is returned. `switchMap()`
        will only have 1 `subscription` at a time

    1.  `click` on the Document -> `Outer` emits -> `interval()` is returned to `switchMap()` ({1})
    2.  `switchMap()` subscribes to {1}
    3.  console.log from {1} `00 -- 1 -- 2 -- 3 -- 4...`. This `interval()` takes 10 seconds to complete
    4.  At 5-6sec, `click` on the Document again -> `Outer` emits the second time, a new `interval()` is returned to `switchMap()` {2}
    5. `switchMap()` `unsubscribes` to {1} and `subscribes` to {2}
    6.  console.log `0 -- 1 -- 2 -- 3...` from {2}

    -   `switchMap()` will `unsubscribe` to `Inner Observable` when the `Inner Observable` has not completed and the
        `Outer Observable` emits value. `switchMap()` can be used to implement `queryInput` mentioned aboved

    ```typescript
    this.queryInput.valueChanges
        .pipe(
            debounceTime(500),
            switchMap(query => this.apiService.filterData(query))
        ).subscribe(data => {
        ...
        });
    ```

    -   Note:
        -   `switchMap = switch + map`. However, the behavior will be different when using with `Promise` due to its `non-cancellable`
        -   Only use `switchMap` for `GET` data when using `HTTP Client` in `Angular`
        -   Use `mergeMap` or `concatMap` for `Create`, `Update`, `Delete` to avoid `race condition`
        
-   `mergeMap()`
    
    -    `mergeMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: number |
        ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R), concurrent: number
        = Number.POSITIVE_INFINITY): OperatorFunction<T, ObservedValueOf<O> | R>`
    -   `mergeMap()` takes a `projectFunction` which will take emitted value from the `Outer Observable` and return an `Inner Observable`.
        Then, `mergeMap()` will `subscribe` to this `Inner Observable`
    -   `Outer Observable` + `mergeMap()` will finally emit the value emitted from the `Inner Observable`
    -   `mergeMap()` will not unsubscribe to the old `Inner Observable` when there is a new one. `mergeMap()` will have 
        multiple `subscription`
    -   `mergeMap()` will be useful when there is no need to stop/cancel the `Inner Observable` when the `Outer Observable`
        emit a new value

    ```typescript
    fromEvent(document, 'click').pipe(
        mergeMap(() => interval(1000).pipe(take(10)))
    );
    // click -> subscribe {1}
    // {1}: 0 -- 1 -- 2 -- 3 -- 4
    // click -> subscribe {2}
    // {1}: 5 -- 6 -- 7 -- 8
    // {2}: 0 -- 1 -- 2 -- 3
    // click -> subscribe {3}
    // {1}: 9 -- complete {1}
    // {2}: 4 -- 5 -- 6 -- 7 -- 8 -- 9 -- complete {2}
    // {3}: 0 -- 1 -- 2 -- 3 -- 4 -- 5 -- 6 -- 7 -- 8 -- 9 -- complete {3}
    ```

    -   `mergeMap()` can take a parameter `concurrent` to control the number of running `Inner Observable` at a time
    -   `mergeMap()` + `concurrent = 1` `===` `concatMap()`

-   `concatMap()`

    -   `concatMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: 
        (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`
    -   `concatMap()` takes a `projectFunction` which return an `Inner Observable`
    -   `concatMap()` will `subscribe` to the next `Inner Observable` (when there is one)

    ```typescript
    fromEvent(document, 'click').pipe(
        concatMap(() => interval(1000).pipe(take(5)))
    );
    // click -> subscribe {1}
    // click -> nothing
    // {1}: 3 -- 4 -- complete {1}
    // subscribe {2}
    // {2}: 0 -- 1
    // click -> nothing
    // {2}: 2 -- 3 -- 4 -- complete {2}
    // subscribe {3}
    // {3}: 0 -- 1 -- 2 -- 3 -- 4 -- complete {2}
    ```

    -   `concatMap()` will wait until `{1}` complete that it subscribe to `{2}`, and then `{3}`
    -   `concatMap()` will be usefull to implement task which the order matters

    ```typescript
    from([image1, image2, image3]).pipe(
        // img1, img2, img3 are file type
        concatMap(singleImage => this.apiService.upload(singleImage)) // upload images in order
    );
    ```

    -   Note:
        -   `concatMap = concatAll + map`. However, the behavior will be different when using with `Promise` due to its `eager`
        
        ```typescript
        fromEvent(document, 'click').pipe(
            map(() => axios('...')),
            concatAll()
        );
        ```

        -   The request will be sent right when it is being invoked, making `concatAll()` useless. This sometimes causes `raceing condition`

-   `exhaustMap()`

    -   `exhaustMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue:
        T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`
    -   `exhaustMap()` takes a `projectFunction` which will return an `Inner Observable`
    -   `exhaustMap()` will then `subscribe` to this `Inner Observable` . While the `Inner Observable` is emitting 
        value (not yet complete) and there is no new `Inner Observable` (emitted from the `Outer Observable`), this `Inner Observable`
        will be completely `skipped` when the old `Inner Observable` has not yet completed

    ```typescript
    function log(val) {
        console.log(val + 'emitted');
        console.log('----------------');
    }
    
    concat(
        timer(1000).pipe(mapTo('first timer'), tap(log)), // emit 'first timer' after 1s
        timer(5000).pipe(mapTo('second timer')), tap(log)), // emit 'second timer' after 5s
        timer(3000).pipe(mapTo('last timer')), tap(log)) // emit 'last timer' after 3s
    )
        .pipe(
            exhaustMap(c => 
                interval(1000).pipe(
                    map(v => `${c}: ${v}`),
                    take(4)
                )
            ) // interval(1000) takes 4s to complete
        ).subscribe(console.log);
    // after 1s:
    // first timer emitted!! -- from log()
    // first timer: 0
    // first timer: 1
    // first timer: 2
    // first timer: 3 -- complete -- 5 seconds passed
    
    // second timer emitted -- from log()
    // second timer: 0
    // second timer: 1
    // second timer: 2 -- 3 next seconds passed
    // last timer emitted -- from log()
    // second timer: 3 -- complete
    // NOTHING
    ```

    -   When `exhaustMap()` is running the `Inner Observable` of the `second timer`, the `Inner Observable` of `last timer` 
        is skipped and everything is stopped after the `Inner Observable` of `second timer` complete
    -   `Rate Limiting HOO`

-   `switchMapTo()/concatMapTo()/mergeMapTo()`

    -   These operators take an `Inner Observable` instead of a `projectFunction`
    -   Use these operators when we do not care about the `Outer Observable` value

    ```typescript
    fromEvent(document, 'click').pipe(switchMapTo(interval(1000).pipe(take(10))));
    
    fromEvent(document, 'click').pipe(mergeMapTo(interval(1000).pipe(take(10))));
    
    fromEvent(document, 'click').pipe(concatMapTo(interval(1000).pipe(take(10))));
    ```

-   `partition()`

    -   `partition<T>(source: any, predicate: (value: T, index: number) => boolean, thisArg?: any): [Observable<T>, Observable<T>]`
    -   `partition()` is not a `HOO`, but a `Higher Order Function`
    -   `partition()` takes a `Source` and returns 2 `Destinations`
    -   `partition()` takes 2 parameters:
        -   `Source Observable`
        -   `predicateFunction`: invoke for every value emitted from the `Source Observable`. For each `predicateFunction`
            parameter, `parition()` will split `Source Observable` into 2 `Destination Observables`: 1 `Observable` with the 
            value satisfied the `predicateFunction` condition, the othere `Observable` has the value which does not satisfy the condition
    
    ```typescript
    const [even$, odd$] = partition(interval(1000), x => x % 2 === 1);
    merge(
        even$.pipe(map(x => `even - ${x}`)),
        odd$.pipe(map(x => `odd - ${x}`))
    ).subscribe(observer);
    // even - 0
    // odd - 1
    // even - 2
    // odd - 3
    // ...
    ```

    -   `partition()` is useful when there is a `notification` `WebSocket` from the server and we want to split the data into
        `readNotification$` and `unreadNotification$` to handle the 2 `Observables` differently

#### Utility Operators

-   `tap()`

    -   `tap<T>(nextOrObserver?: NextObserver<T> | ErrorObserver<T> | CompleteionObserver<T> | ((x: T) => void), error?: 
        (e: any) => void, complete?: () => void): MonoTYpeOperatorFunction<T>`
    -   `tap()` takes a parameter like `subscribe`, `observer`, or 3 functions `nextFunction`, `errorFunction` and `completeFunction`
    -   `tap()` does not return any value and does not mutate the `Observable`
    -   Use-case:
    
        a.  Log the emitted value at any time in the `Observable`
        
        ```typescript
        interval(1000)
            .pipe(
                tap(val => console.log('before map: ', val)),
                map(val => val * 2),
                tap(val => console.log('after map: ', val))
            ).subscribe(observer);
        // before map: 0
        // after map: 0
        
        // before map: 1
        // after map: 2
        
        // before map: 2
        // after map: 4
        // ...
        ```

        b.  Use the emitted value from the `Observale` and mutate that value (`side effect`)
        c.  Perform a task that has nothing to do with the `Observable` (to `start/stop` the loader)

-   `delay()/delayWhen()`

    -   `delay<T>(delay: number | Date, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`
    -   `delay()` emits the value of an `Observable` depending on the parameter. When the parameter is a `number`, `delay()` will
        run a `timer` and then emit the `Observable` value. When the parameter is a `Date`, `delay()` will postpone until that `Date` time
        that `delay()` emit the `Observable` value

    ```typescript
    fromEvent(document, 'click').pipe(delay(1000)).subscribe(console.log);
    
    // click
    // 1s -- MouseEvent
    // click
    // 1s -- MouseEvent
    ```
    
    -   `delayWhen<T>(delayDurationSelector: (value: T, index: number) => Observable<any>, subscriptionDelay?: Observable<any>): 
        MonoTypeOperationFunction<T>`
    -   `delayWhen()` takes a `function` and returns an `Observable`
    -   `delayWhen()` will delay emitting the `Source Observable` value until the passed `Observable` emits value
    
    ```typescript
    fromEvent(document, 'click')
        .pipe(delayWhen(() => timer(1000)))
        .subscribe(console.log);
    // click
    // 1s - MouseEvent
    // click
    // 1s - MouseEvent
    ```

-   `finalize()`

    -   `finalize<T>(callback: () => void): MonoTypeOperatorFunction<T>`
    -   `finalize()` takes a `callback` as parameter
    -   The `callback` will execute when the `Observable` `complete` or `error`
    -   `finalize()` is often use to stop the loading spinner
    
    ```typescript
    this.loading = true;
    this.apiService
        .get()
        .pipe(finalize(() => this.loading = false))
        .subscribe();
    ```

-   `repeat()`

    -   `repeat<T>(count: number = -1): MonoTypeOperatorFunction<T>`
    -   `repeat()` takes a `count` parameter and will `repeat` the `Source Observable` witn `count` times
    
    ```typescript
    of('repeated data').pipe(repeat(3)).subscribe(console.log);
    // 'repeated data'
    // 'repeated data'
    // 'repeated data'
    ```

-   `timeInterval()`

    -   `timeInterval<T>(scheduler: SchedulerLike = async): OperatorFunction<T, TimeInterval<T>>`
    -   `timerInterval()` is used to calculate the time duration between emitting value time of the `Source Observable`
    -   `timeInterval()` will run at soon as the `Observable` is `subscribed`, `timeInterval()` can calculate the duration from `subscribing` until the first emission
    
    ```typescript
    fromEvent(document, 'click').pipe(timeInterval()).subscribe(console.log);
    // click
    // TimeInterval {value: MouseEvent, interval: 1000} // it takes 1s from subscribing to the first click
    ```

-   `timeout()`

    -   `timeout<T>(due: number | Date, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`
    -   `timeout()` takes a `number` or `Date` as parameter
    -   `timeout()` will throw an error when the `Source Observable` does not emit any value during the mentioned time
        (when the parameter is a `number`), or until the `Date` time (parameter is a `Date`)
    
        ```typescript
        interval(2000).pipe(timeout(1000)).subscribe(console.log, console.error);
        // Error { name: "TimeoutError" }
        ```
    
-   `timeoutWith()`
    
    -   `timeoutWith<T, R>(due: number | Date, withObservable: any, scheduler: SchedulerLike = async): OperatorFunction<T, T | R>`
    -   `timeoutWith()` has another parameter `Observable`. When the `Source Observable` emit the value too late compared to `due`,
        `timeoutWith()` will subscribe to the other `Observable` instead of throw an `error`
        
-   `toPromise()`
    
    -   `toPromise()` will be `deprecated` in `RxJS v7`
    
    ```typescript
    async function test() {
        const helloWorld = await of('hello')
            .pipe(map(val => val + 'world'))
            .toPromise();
        console.log(helloWorld); // hello world
    }
    ```

## Day 26: RxJS Subjeect and Multicasting

-   Observable Execution

    -   There will be a new `execution` created for each `subscribe`

    ```typescript
    const observbvable = interval(500).pipe(
        take(5)
    );
    
    const observerA = {
        next: val => console.log(`Observer A: ${val}`),
        error: err => console.log(`Observer A error: ${err}`),
        complete: () => console.log(`Observer A complete`)
    };
    
    observable.subscribe(observerA);
    /** output
    Observer A: 0
    Observer A: 1
    Observer A: 2
    Observer A: 3
    Observer A: 4
    Observer A complete
    */
    ```
 
    Subscribe to another observer after 2s

    ```typescript
    const observable = interval(500).pipe(
        take(5)
    );

    const observerA = {
        next: val => console.log(`Observer A: ${val}`),
        error: err => console.log(`Observer A error: ${err}`),
        complete: () => cosnole.log(`Observer A complete`)
    };
    
    observable.subscribe(observerA);
    
    const observerB = {
        next: val => console.log(`Observer B: ${val}`),
        error: err => console.log(`Observer B error: ${err}`),
        complete: () => console.log('Observer B complete')
    };
    
    setTimeout(() => {
        observable.subscribe(observerB);
    }, 2000);
    
    /**
    Output
    Observer A: 0
    Observer A: 1
    Observer A: 2
    Observer A: 3
    Observer A: 4
    Observer A complete
    Observer B: 0
    Observer B: 1
    Observer B: 2
    Observer B: 3
    Observer B: 4
    Observer B complete
    */
    ```

    -   Hybrid observer to share execution for new `subscribe`

    ```typescript
    const hybridObserver = {
        observers: [],
        registerObserver(observer) {
            this.observers.push(observer);
        },
        next(value) {
            this.observers.forEach(observer => observer.next(value));
        },
        error(err) {
            this.observers.forEach(observer => observer.error(err));
        },
        complete() {
            this.observers.forEach(observer => observer.complete());
        }
    }
    
    hybridObserver.registerObserver(observerA);
    
    observable.subscribe(hybridObserver);
    
    setTimeout(() => {
        hybridObserver.registerObserver(observerB);
    }, 2000);
    /**
    Output
    Observable A: 0
    Observable A: 1
    Observable A: 2
    Observable A: 3
    Observable A: 4
    Observable B: 4
    Observable A complete
    Observable B complete
    */
    ```

    ```typescript
    const hybridObserver = {
        observers: [],
        subscribe(observer) {
            this.observers.push(observer);
        },
        next(value) {
            this.observers.forEach(observer => observer.next(value));
        },
        error(err) {
            this.observers.forEach(observer => observer.error(err));
        },
        complete() {
            this.observers.forEach(observer => observer.complete());
        }
    }
    
    hybridObserver.subscribe(observerA);
    
    observable.subscribe(hybridObserver);
    
    setTimeout(() => {
        hybridObserver.subscribe(observer);
    }, 2000);
    ```

    -   `hybridObserver` is similar to an `Observable` as well as an `observer`
    -   `hybridObserver` is a `Subject` in `RxJS`
    -   A `Subject` is a special type of `Observable` that allows values to be multicasted to many `Observers`. `Subjects` are like `EventEmitters`
    -   Every `Subject` is an `Observable` and an `Observer`. You can subscribe to a `Subject`, and you can call next to feed values as well as error and complete

    ```typescript
    const subject = new Subject();
    subject.subscribe(observerA);
    observable.subscribe(subject);
    
    setTimeout(() => {
        subject.subscribe(observerB);
    }, 2000);
    ```

    -   We have just transformed an univast `Observable` execution to a `multicast` one, by using `Subject`
        -   `unicast`: normal Youtube video, each person watch the whole video
        -   `multicast`: Youtube live, all people watch the same video, at the same time

-   `Subject`

    -   type ahead example
    ```typescript
    @Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        
        searchTerm$ = new Subject<string>();
    
        ngOnInit() {
            this.searchTerm$.asObservable().pipe(
                throttleTime(250, undefined, {
                    leading: true,
                    trailing: true,
                }),
                distinctUntilChanged(),
            ).subscribe(
                next: value => console.log(value)
            )       
        };
    }
    
    onInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.searchTerm$.next(target.value);
    }
    ```

-   `BehaviorSubject`

    -   When working with `Subject`, late subscriber will not receive emitted values in the past
    -   `behaviorSubject` does store the last valuee as current value
    
    ```typescriptgg
    const subject = new Subject();
    
    subject.subscribbe({
        next: v => console.log('observerA: ', v)
    });
    
    subject.next(1);
    subject.next(2);
    
    subject.subscribe({
        next: v => console.log('observerB: ', v)
    });
    
    subject.next(3);
    /**
    Output
    observerA: 1
    observerA: 2
    observerA: 3
    observerB: 3
    */
    ```

    -   `BehaviorSubject` stores emitted values and will emit those values to the latest `Observable` when a new `observer` `subscribe`
    -   A variant of `Subject` that requires an initial value and emits its current value whenever it is subscribed to
    -   `BehaviorSubject` are useful for representing 'value over time'. For instance, an event stream of birthday is a `Subject`,
        but the stream of a person's age would be a `BehaviorSubject`
    -   Note: `BehaviorSubject` requires initial value when initialize the subject

    ```typescript
    const subject = new BehaviorSubject(0): // 0 is the initial value
    
    subject.subscribe({
        next: v => console.log('observerB: ', v)
    });
    
    subject.next(3);
    /**
    Output
    observerA: 0
    observerA: 1
    observerA: 2
    observerB: 2
    observerA: 3
    observerB: 3
    */
    ```

-   `ReplaySubject`

    -   `ReplaySubject` can send emitted values to new `Observer`, `replaySubject` can also stores many values (even all values)
    -   Parameters:
        -   `buffer`: the number of items to store
        -   `windowTIme`: (ms) maximum time duration from the latest value emitting
    -   A variant of `Subject` that 'replays' or emits old values to new subscribers. It buffers a set of number of values 
        and will emit those values immediately to any new subscribers in addition to emitting new values to existing subscribers

    ```typescript
    cosnt subject = new ReplaySubject(3); // buffer 3 valeus for new subscribers
    
    subject.subscribe({
        next: v => console.log('observerA: ', v)
    });
    
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    
    subject.subscribe({
        next: v => console.log('observerB: ', v)
    });
    
    subject.next(3);
    
    /**
    Output
    observerA: 1
    observerA: 2
    observerA: 3
    observerA: 4
    observerB: 2
    observerB: 3
    observerB: 4
    observerA: 5
    observerB: 5
    */
    ```

    -   Or, using with `windowTime`

    ```typescript
    const subject = new ReplaySubject(100, 500); // windowTime
    
    subject.subscribe({
        next: v => console.log('observerA: ', v)
    });
    
    let i = 1;
    const id = setInterval(() => subject.next(i++), 200);
    
    setTimeout(() => {
        subject.subscribe({
            next: v => console.log('observerB: ', v)
        });
    }, 1000);
    
    setTimeout(() => {
        subject.complete();
        clearInterval(id);
    }, 2000);
    
    /**
    Output
    observerA: 1
    observerA: 2
    observerA: 3
    observerA: 4
    observerA: 5
    observerB: 3
    observerB: 4
    observerB: 5
    observerA: 6
    observerB: 6
    ...
    */
    ```

-   `AsyncSubject`

    -   Emits the last value of the `Observable` execution to the `observers`, only when execution complete
    -   A variant of `Subject` that only emits a value when it completes. It will emits its latest value to all its observers on completion
    -   There will be no emission if the stream does not complete

    ```typescript
    const subject = new AsyncSubject();
    
    subject.subscribe({
        next: v => console.log('observerA: ', v)
    });
    
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    
    subject.subscribe({
        next: v => console.log('observerB: ', v)
    });
    
    subject.next(5);
    subject.complete();
    
    /**
    Output
    observerA: 5
    observerB: 5
    */
    ```

-   `Subject Completion`

    -   When `BehaviorSubject` completes, `observers` that subscribe to it later will only receive complete signal
    -   When `ReplaySubject` complete, `observers` that subscribe to it will then get all the values stored from `buffer`, then execute the observers `complete`
    -   When `AsyncSubject` complete, `observer` can still subscribe to it and receive the last value

    ```typescript
    const subject = new BehaviorSubject(0); // 0 is the initial value
    
    subject.subscribe({
        next: v => console.log('observerA: ', v),
        complete: () => console.log('observerA complete')
    });
    
    subject.next(1);
    subject.next(2);
    
    subject.subscribe({
        next: v => console.log('observerB: ', v),
        complete: () => console.log('observerB complete')
    });
    
    subject.next(3);
    sdubject.complete();
    
    subject.subscribe({
        next: v => console.log('observerC: ', v),
        complete: () => console.log('observerC complete')
    });
    /**
    Output
    observerA: 0
    observerA: 1
    observerA: 2
    observerB: 2
    observerA: 3
    observerB: 3
    observerA complete
    observerB complete
    observerC complete
    */
    ```

    ```typescript
    const subject = new ReplaySubject(3);
    
    subject.subscribe({
        next: v => console.log('observerA: ', v),
        complete: () => console.log('observerA complete')
    });
    
    let i = 1;
    const id = setInterval(() => subject.next(i++), 200);
    
    setTimeout(() => {
        subject.complete();
        clearInterval(id);
        subject.subscribe({
            next: v => console.log('observerB: ', v),
            complete: () => console.log('observerB complete')
        });
    }, 1000);
    /**
    Output
    observerA: 1
    observerA: 2
    observerA: 3
    observerA: 4
    observerA: 5
    observerA complete
    observerB: 3
    observerB: 4
    observerB: 5
    observerB complete
    */
    ```

    ```typescript
    const subject = new AsyncSubject();
    
    subject.subscribe({
        next: v => console.log('observerA: ', v),
        complete: () => console.log('observerA complete')
    });
    
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.next(5);
    
    subject.complete();
    
    subject.subscribe({
        next: v => console.log('observerB: ', v),
        complete: () => console.log('observerB complete')
    });
    
    /**
    observerA: 5
    observerA complete
    observerB: 5
    observerB complete
    */
    ```

-   `Multicasting`

    -   Two or more `observers` have the same execution

    ```typescript
    const observable = interval(500).pipe(
        take(5)
    );
    
    const subject = new Subject();
    
    const observerA = {
        next: val => console.log('observerA: ', val),
        error: err => console.log('observerA error: ', err),
        complete: () => console.log('observerA complete'),
    };
    
    const observerB = {
        next: val => console.log('observerB: ', val),
        error: err => console.log('observerB error: ', err),
        complete: () => console.log('observerB complete'),
    };
    
    subject.subscribe(observerA);
    
    observable.subscribe(subject);
    
    setTimeout(() => {
        subject.subscribe(observerB);
    }, 2000);
    ```

-   `multicast`

    -   `multicast<T, R>(subjectOrSubjectFactory: Subject<T> | () => Subject<T>), selector?: (source: Observable<T>) =>
        Observable<R>): OperatorFunction<T, R>`
    -   Returns an `Observable` that emits the reulst of invoking a specicied selector on items emitted by a `ConnectableObservable`
        that shares a single subscription to the underlying stream
    -   This operator will return an `Observable`, especially `ConnectableObservable` which can share the same `execution`

    ```typescript
    const subject = new Subject();
    
    const connectableObservable = interval(500).pipe(
        take(5),
        multicast(subject)
    ) as ConnectableObservable<number>;
    
    const observerA = { 
        next: val => console.log('observerA: ', val),
        error: err => console.log('observerA error: ', err),
        complete: () => console.log('observerA complete')
    };
    
    
    const observerB = { 
        next: val => console.log('observerB: ', val),
        error: err => console.log('observerB error: ', err),
        complete: () => console.log('observerB complete')
    };   
    
    connectableObservable.subscribe(observerA);
    connectableObservable.connect();
    
    setTimeout(() => {
        connectableObservable.subscribe(observerB);
    }, 2000);
    
    /**
    Ouput
    observerA: 0
    observerA: 1
    observerA: 2
    observerA: 3
    observerA: 4
    observerB: 4
    observerA complete
    observerB complete
    */
     ```

    -   `multicast` takes a `subjectOrSubjectFactory` as a parameter (`Subject` in the example). Then, it will return a 
        `ConnectableObservable` which has some special methods
    -   `ConnectableObservable` is an `Observable`. We can `subscribe` to it, however, we need to call `connect` to execute the `Observable`
    `connectableObservable.connect() === observable.subscribe(observer)`

    ```typescript
    const subject = new Subject();
    
    const connectableObservable = interval(500).pipe(
        tap(x => console.log('log.info: ', x)),
        multicast(subject)
    ) as ConnectableObservable<number>;
    
    const observerA = {
        next: val => console.log('observerA: ', val),
        error: err => console.log('observerA error: ', err),
        complete: () => console.log('observerA complete')
    };
    
    const observerB = {
           next: val => console.log('observerB: ', val),
           error: err => console.log('observerB error: ', err),
           complete: () => console.log('observerB complete')
    };
    
    const sub = connectableObservable.subscribe(observerA);
    connectableObservable.connect();
    
    setTimeout(() => {
        sub.add(connectableObservable.subscribe(observerB));
    }, 2000);
    
    setTimeout(() => {
        sub.unsubscribe();
    }, 3000);
    
    /**
    Ouput
    log.info: 0
    observerA: 0
    log.info: 1
    observerA: 1
    log.info: 2
    observerA: 2
    log.info: 3
    observerA: 3
    log.info: 4
    observerA: 4
    observerB: 4
    log.info: 5
    observerA: 5
    observerB: 5
    log.info: 6
    log.info: 7
    log.info: 8
    log.info: 9
    log.info.10
    ...
    */
    ```

    -   Returned `subscription` need to be stored for the `connect()` to be able to `unsubscribe`

    ```typescript
    const sub = connectableObservable.subscribe(observerA);
    const connectSub = connectableObservable.connect();
    
    setTimout(() => {
        sub.add(connectableObservable.subscribe(observerB));
    }, 2000);
    
    setTimeout(() => {
        sub.unsubscribe();
        connectSub.unsubscribe();
    }, 3000);
    ```

    -   Just execute `connectSub.unsubscribe()`, no need to call `sub.unsubscribe()`

-   `refCount`

    -   Manually `connecting` and `disconnecting` is not a good practice
    -   `connectableObservable` has a protocol: when the number of `Observable` changes from `0` to `1`, `connect` will be invoked automatically,
    `unsubscribe` will be called when the number changes from `1` to `0`

    ```typescript
    const subject = new Subject();
    
    const connectableObservable = interval(500).pipe(
        tap(x => console.log('log.info ', x)),
        multicast(subject)
    ) as ConnectableObservable<number>;
    
    const observerA = {
        next: val => console.log('observerA: ', val),
        error: err => console.log('observerA error: ', err),
        complete: () => console.log('observerA complete')
    };
        
    const observerB = {
        next: val => console.log('observerB: ', val),
        error: err => console.log('observerB error: ', err),
        complete: () => console.log('observerB complete')
    };
    
    cosnt observable = connectableObservable.refCount();
    
    const subA = observable.subscribe(observableA); // ref from 0 -> 1
    
    let subB;
    setTimeout(() => {
        subB = observable.subscribe(observerB); // ref from 1 -> 2
    }, 2000);
    
    setTimeout(() => {
        subA.unsubscribe(); // ref from 2 -> 1
    }, 3000);
    
    setTimeout(() => {
        subB.unsubscribe(); // ref from 1 -> 0
    }, 5000);
    ```

-   `subjectFactory`

    -   When the `Subject` `complete` and `next` is not allowed, we cannot have `execution` triggered anymore

    ```typescript
    const connectableObservable = interval(500).pipe(
        take(10),
        tap(x => console.log('log.info: ', x)),
        multicast(new Subject())
    ) as ConnectableObservable<number>;
    
    const observerA = {
        next: val => console.log('observerA: ', val),
        error: err => console.log('observerA error: ', err),
        complete: () => console.log('observerA complete')
    };
            
    const observerB = {
        next: val => console.log('observerB: ', val),
        error: err => console.log('observerB error: ', err),
        complete: () => console.log('observerB complete')
    };
    
    const sharedObservable = connectableObservable.refCount();
    
    const subA = sharedObservable.subscribe(observerA);
    
    let subB;
    setTimeout(() => {
        subB = sharedObservable.subscribe(observerB);
    }, 2000);
    
    setTimeout(() => {
        const subA2 = sharedObservable.subscribe(observerA);
    }, 6000);
    ```

    -   After 5s, `sharedObservable` did emit `complete`. At 6s, after subscribing, the `Observable` cannot receive value
    -   We have to create a new `Subject`

    ```typescript
    const connectableObservable = interval(500).pipe(
        take(10),
        tap(x => console.log('log.info: ', x)),
        multicast(() => new Subject())
    ) as ConnectableObservable<number>;
    ```

    -   `SubjectFactory` is a function which returns a new `Subject` on execution
    -   Will be called when `refCount` changes from `0` to `1`

    ```typescript
    const sharedObservable = connectableObservable.refCount();
    
    const subA = sharedObservable.subscribe(observerA);
    
    let subB;
    setTimeout(() => {
      subB = sharedObservable.subscribe(observerB);
    }, 2000);
    
    setTimeout(() => {
      const subA2 = sharedObservable.subscribe(observerA);
    }, 6000);
    ```

-   `publish`

    -   `publish<T, R>(selector?: OperatorFunction<T, R>): MonoTypeOperatorFunction<T> | OperationFunction<T, R>`
    -   Returns a ConnectableObservable, which is a variety of `Observable` that waits until its conenct method is called 
        before it begins emitting items to thoes `Observers` that have subscribed to its

    ```typescript
    const connectableObservable = interval(500).pipe(
      tap(x => console.log('log.info: ' + x)),
      publish(),
    ) as ConnectableObservable<number>;
    
    const observerA = {
      next: (val) => console.log(`Observer A: ${val}`),
      error: (err) => console.log(`Observer A Error: ${err}`),
      complete: () => console.log(`Observer A complete`),
    };
    
    const observerB = {
      next: (val) => console.log(`Observer B: ${val}`),
      error: (err) => console.log(`Observer B Error: ${err}`),
      complete: () => console.log(`Observer B complete`),
    };
    
    const sharedObservable = connectableObservable.refCount();
    
    const subA = sharedObservable.subscribe(observerA); // ref from 0 -> 1
    
    let subB;
    setTimeout(() => {
        subB = sharedObseravble.subscribe(observerB); // ref from 1 -> 2
    }, 2000);
    
    setTimeout(() => {
        subA.unsubscribe(); // ref from 2 -> 1
    }, 3000);
    
    setTimeout(() => {
        subB.unsubscribe(); // ref from 1 -> 0
    }, 5000);
    ```

    -   `BehaviorSubject` => `publishBehavior`
    -   `ReplaySubject` => `publishReplay`
    -   `AsyncSubject` => `publishLast`

-   `share`

    -   `share<T>(): MonoTypeOperatorFunction<T>`
    -   Returns a new `Observable` that multicast (shares) the original `Observable`. As long as there is at least one `subscriber`
        this `observable` will be subscribed and emitting data. When all subscribers have unsubscribed it will unsubscribe from
        the source `observable`. Because the `Observable` is multicasting it makes the stream hot. This is an alias for 
        `multicast(() => new Subject()), refCOunt()`
    
    ```typescript
    const sharedObservable = interval(500).pipe(
      tap(x => console.log('log.info: ' + x)),
      share(),
    );
    
    const observerA = {
      next: (val) => console.log(`Observer A: ${val}`),
      error: (err) => console.log(`Observer A Error: ${err}`),
      complete: () => console.log(`Observer A complete`),
    };
    
    const observerB = {
      next: (val) => console.log(`Observer B: ${val}`),
      error: (err) => console.log(`Observer B Error: ${err}`),
      complete: () => console.log(`Observer B complete`),
    };
    
    const subA = sharedObservable.subscribe(observerA); // ref from 0 => 1
    
    let subB;
    setTimeout(() => {
      subB = sharedObservable.subscribe(observerB); // ref from 1 => 2
    }, 2000);
    
    setTimeout(() => {
      subA.unsubscribe(); // ref from 2 => 1
    }, 3000);
    
    setTimeout(() => {
      subB.unsubscribe(); // ref from 1 => 0
    }, 5000);
    ```

-   `shareReplay`

    -   `shareReplay<T>(configOrBufferSize?: number | ShareReplayConfig, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>`
    -   Shares source and replay specified number of emissions on subscription
    -   This operator is a specialization of `replay` that connects to a source `observable` and multicasts throgh a `ReplaySubject`
        constructed with the specified arguments. A successfully completed source will stay cached in the `shareReplay` `observable` forever, 
        but an errored source can be retied

    -   You generally want to use `shareReplay` when you have side-effects or taxing computations that you do not wish to be executed
        amongst multiple subscribers. It may also be valuable in situations where you know you will have the late subscribers to 
        a stream that need access to previously emitted values. This ability to replay values on subscription is what differentiates `share` and `shareReplay`

    ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs/Observable';
    import { Subject } from 'rxjs/Subject';
    import { timer } from 'rxjs/observable/timer';
    import { switchMap, shareReplay, map, takeUntil } from 'rxjs/operators';
    
    export interface Joke {
      id: number;
      joke: string;
      categories: Array<string>;
    }
    
    export interface JokeResponse {
      type: string;
      value: Array<Joke>;
    }
    
    const API_ENDPOINT = 'https://api.icndb.com/jokes/random/5?limitTo=[nerdy]';
    const REFRESH_INTERVAL = 10000;
    const CACHE_SIZE = 1;
    
    @Injectable()
    export class JokeService {
      private cache$: Observable<Array<Joke>>;
      private reload$ = new Subject<void>();
    
      constructor(private http: HttpClient) { }
    
      // This method is responsible for fetching the data.
      // The first one who calls this function will initiate 
      // the process of fetching data.
      get jokes() {
        if (!this.cache$) {
          // Set up timer that ticks every X milliseconds
          const timer$ = timer(0, REFRESH_INTERVAL);
              
          // For each timer tick make an http request to fetch new data
          // We use shareReplay(X) to multicast the cache so that all 
          // subscribers share one underlying source and don't re-create 
          // the source over and over again. We use takeUntil to complete
          // this stream when the user forces an update.
          this.cache$ = timer$.pipe(
            switchMap(() => this.requestJokes()),
            takeUntil(this.reload$),
            shareReplay(CACHE_SIZE)
          );
        }
    
        return this.cache$;
      }
    
      // Public facing API to force the cache to reload the data
      forceReload() {
        this.reload$.next();
        this.cache$ = null;
      }
    
      // Helper method to actually fetch the jokes
      private requestJokes() {
        return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
          map(response => response.value)
        );
      }
    }
    ```


