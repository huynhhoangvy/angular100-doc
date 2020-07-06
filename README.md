# Angular100Doc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Day #1 - Environment setup & installation

## Day #2 - Explore app

- <app-root> inside index.html
- module
- ngModule - angular component
- a component can be declared in only one module/place

## Day #3 - Data binding

- interpolation: `{{ data }}`
- property binding: `[value]="data.value"`
- event binding: `(click)="handleClick()"`
- 2 way binding: `[(ngModel)]="data.value" // FormsModule needed`

## Day #4 - Structure directive - ngIf

- if else: `<div *ngIf="data === condition; else someTag" >`
- ng-template:

```
    <ng-template #someTag>
    <ng-templage [ngIf]="data == condition">

```

## Day #5 - Structure directive - ngForOf

- `<div *ngFor="let author of authors; idx as index">`
- local variables: \$implicit: T; index; count; first; last; even; odd
- `<ng-template ngFor [ngForOf]="authors" let-author let-idx="index">`

- multiple structure directive:

```
    <div *ngFor="”let" item of list”>
        <div *ngIf="”somethingGoood”">
            More code
        </div>
    </div>
```

```
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

## Day #6 - Attribute directive

- class binding: `<div [class.tab-active]="isTabActive">`, `[class]="clasExpr"` with classExpr is string, array string, object
- style binding: `<div [style.width]="'value'">`
  with unit: `[style.property.unit]="expression"` with expression is `number | undefined | null`
  `[style]="styleExpr"` with styleExpr is string, array string, object
- font-size & fontSize are both acceptable

## Day #7 - Component interaction

- ngOnInit: run after component is created, after constructor and input binding
- validate in ngOnChanges or setter/getter; ngOnChanges is better for multiple input validation
- ngOnChanges can access to both old & new value
- have to implement onChanges & override ngOnChanges when using ngOnChanges
- dynamically component generating: manually call lifecycle → implement side effect in setter
- `<button (click)="currentProgress = currentProgress + 1">increase</button>`
- external name/alias is not recommended

## Day #8 - Component interaction - parent listens to children event

- create: `@Output() delete = new EventEmitter<number>();`
- emit: `(click)="delete.emit(author.id):`
- implement handling method: `onDelete(id: number) { //somethimg }`
- binding: `(delete)="onDelete($event)`

## Day #9 - Custom 2 way binding

- 2 way binding: `<input type="text" [(ngModel)]="name">` === `<input type="text" [ngModel]="name" (ngModelChange)="name = $event">`
- create input & output:

```
    @Input() checked: boolean;
    @Output() checkedChange = new EventEmitter<boolean>(); // must have `change` suffix
    [(checked)]="isChecked"
```

## Day #10 - Template variable, ViewChild, ViewChildren

- template variable:

```
<button (click)="toggleComp.toggle()"></button>
<app-toggle #toggleComp></app-toggle>

```

- `static` grants access of component in ngOnInit; however, childComponent must not be in any structure directive
- `ViewChildren` subscribe changes will fail if a child is inside a structure directive; in that case, move method to ngAfterViewInit
- `ViewChildren` does not have `static`

## Day #11 - Typescript data type

- `interface` is used to define types for an object

```
interface User {
    firstName: string;
    lastName: string;
    age: number;
    job?: string; // optional property
}
```

```
type User = {
    firstName: string;
    lastName: string;
    age: number;
    job?: string;
};
```

## Day #12 - Typescript advanced type

- `unknown` is recommended instead of `any`
- Union type: A or B
  `function test () string | number {}`
  `type StringOrNumber = string | number;`
- Intersection type A and B

```
    function merge<T1, T2>(o1: T1, o2: T2): T1 & T2 {
    return { ...o1, ...o2 };
    }

    merge({ foo: 'bar' }, { bar: 'foo' });
```

- Conditional type: `T extends U ? X : Y`
- Type alias

```
    @Component({
    selector: 'flex-container',
    template: `<ng-content></ng-content>`,
    })
    export class FlexComponent {
    @Input() flexDirection: string = 'row';

    @HostBinding('style.display') get display() {
        return 'flex';
    }

    @HostBinding('style.flex-direction') get direction() {
        return this.flexDirection;
    }
    }
```

- Alternative:

```
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

```
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

```
    type ObjectDictionary<T> = { [key: string]: T };
    type ArrayDictionary<T> = { [key: string]: T[] };
    export type Dictionary<T> = T extends []
    ? ArrayDictionary<T[number]>
    : ObjectDictionary<T>;

    type StringDictionary = Dictionary<string>; // {[key: string]: string}
    type NumberArrayDictionary = Dictionary<number[]>; // {[key: string]: number[]}
    type UserEntity = Dictionary<User>; // {[key: string]: User}
```

## Day #13 - Content projection

- `<ng-content></ng-content>` work the same as React's `{children}`
- multiple `ng-content` is not allowed (without selector)
- Tag selector: `<ng-content select="some-component-selector-or-html-tag"><ng-content>`
- CSS class selector: `<ng-content select=".some-class"></ng-content>`
- Attribute selector: `<ng-content select="[some-attr]"></ng-content>`
- Selectors combination: `<ng-content select="some-component-selector-or-html-tag[some-attr]"></ng-content>`
- Selector: the same as CSS selector `select="label, span, app-label"`
- ngProjectAs: `<span ngProjectAs="label">` `<ng-container ngProjectAs="label">`
- `ng-container` works the same as React `<>`

## Day #14 - `ng-template`, `ngTemplateOutlet` and `ng-container`

- `ng-template`: a template that render with some conditions
- `ng-container`: avoid unnecessary wrapper

```
<ng-container [ngTemplateOutlet]="counterTmpl"></ng-container> items.
<ng-template #counterTmpl>
	<span class="badge badge-primary">{{ counter }}</span> items
</ng-template>
```

```
<ng-container
    *ngTemplateOutlet="linkTemplate; context: { $implicit: link }"
    <!-- *ngTemplateOutlet="linkTemplate; context: { link: link }" -->
>
    <!-- <ng-container
    [ngTemplateOutlet]="linkTemplate"
    [ngTemplateOutletContext]="{ link: link }"
> -->
</ng-container>
```

```
<ng-template #linkTemplate let-l>
<!-- <ng-template #linkTemplate let-l="link"> -->
	<h4>
		{{l}}
	</h4>
</ng-template>
```

## Day #15 - Dependency injection

- `@Injectable()`, `NgModule()`, `@Component()`

```
    @Injectable({
      providedIn: "root",
    })
    export class CartService {
      // properties and methods
    }
```

```
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

## Day #16 - Dependency injection in Angular

- Inject parent component to child component
- Provide another component with the same API

```
@Component({
  selector: 'app-bs-tab-group',
  templateUrl: './bs-tab-group.component.html',
  styleUrls: ['./bs-tab-group.component.css'],
  providers: [
    {
      provide: TabGroupComponent,
      useExisting: BsTabGroupComponent
    }
  ]
})
export class BsTabGroupComponent extends TabGroupComponent {
}
```

- Forward reference

```
const BsTabGroupProvider = {
  provide: TabGroupComponent,
  useExisting: forwardRef(() => BsTabGroupComponent)
}

@Component({
  selector: 'app-bs-tab-group',
  templateUrl: './bs-tab-group.component.html',
  styleUrls: ['./bs-tab-group.component.css'],
  providers: [
    BsTabGroupProvider
  ]
})
export class BsTabGroupComponent extends TabGroupComponent {
}
```

- Provider syntax
  `useClass`

```
@NgModule({
  providers: [SomeClass]
})
```

```
@NgModule({
  providers: [{ provide: SomeClass, useClass: SomeClass}]
})
```

`useExisting`

```
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

```
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

```
@Component({
  providers: [
    {
      provide: SomeToken,
      useValue: someValue
    }
  ]
})
```
