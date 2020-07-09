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
  Pure functions ??

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
