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

-   <app-root> inside index.html
-   module
-   ngModule - angular component
-   a component can be declared in only one module/place

## Day #3 - Data binding

-   interpolation: `{{ data }}`
-   property binding: `[value]="data.value"`
-   event binding: `(click)="handleClick()"`
-   2 way binding: `[(ngModel)]="data.value" // FormsModule needed`

## Day #4 - Structure directive - ngIf

-   if else: `<div *ngIf="data === condition; else someTag" >`
-   ng-template:

```
    <ng-template #someTag>
    <ng-templage [ngIf]="data == condition">

```

## Day #5 - Structure directive - ngForOf

-   `<div *ngFor="let author of authors; idx as index">`
-   local variables: \$implicit: T; index; count; first; last; even; odd
-   `<ng-template ngFor [ngForOf]="authors" let-author let-idx="index">`

-   multiple structure directive:

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

-   class binding: `<div [class.tab-active]="isTabActive">`, `[class]="clasExpr"` with classExpr is string, array string, object
-   style binding: `<div [style.width]="'value'">`
    with unit: `[style.property.unit]="expression"` with expression is `number | undefined | null`
    `[style]="styleExpr"` with styleExpr is string, array string, object
-   font-size & fontSize are both acceptable

## Day #7 - Component interaction

-   ngOnInit: run after component is created, after constructor and input binding
-   validate in ngOnChanges or setter/getter; ngOnChanges is better for multiple input validation
-   ngOnChanges can access to both old & new value
-   have to implement onChanges & override ngOnChanges when using ngOnChanges
-   dynamically component generating: manually call lifecycle → implement side effect in setter
-   `<button (click)="currentProgress = currentProgress + 1">increase</button>`
-   external name/alias is not recommended

## Day #8 - Component interaction - parent listens to children event

-   create: `@Output() delete = new EventEmitter<number>();`
-   emit: `(click)="delete.emit(author.id):`
-   implement handling method: `onDelete(id: number) { //somethimg }`
-   binding: `(delete)="onDelete($event)`

## Day #9 - Custom 2 way binding

-   2 way binding: `<input type="text" [(ngModel)]="name">` === `<input type="text" [ngModel]="name" (ngModelChange)="name = $event">`
-   create input & output:

```
    @Input() checked: boolean;
    @Output() checkedChange = new EventEmitter<boolean>(); // must have `change` suffix
    [(checked)]="isChecked"
```

## Day #10 - Template variable, ViewChild, ViewChildren

-   template variable:

```
<button (click)="toggleComp.toggle()"></button>
<app-toggle #toggleComp></app-toggle>

```

-   `static` grants access of component in ngOnInit; however, childComponent must not be in any structure directive
-   `ViewChildren` subscribe changes will fail if a child is inside a structure directive; in that case, move method to ngAfterViewInit
-   `ViewChildren` does not have `static`

## Day #11 - Typescript data type

-   `interface` is used to define types for an object

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

-   `unknown` is recommended instead of `any`
-   Union type
    `function test () string | number {}`
    `type StringOrNumber = string | number;`
-   Insertion type

```
    function merge<T1, T2>(o1: T1, o2: T2): T1 & T2 {
    return { ...o1, ...o2 };
    }

    merge({ foo: 'bar' }, { bar: 'foo' });
```

-   Conditional type `T extends U ? X : Y`
-   Type alias

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

-   Alternative:

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

-   Type alias + conditional type

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
```
// Exclude/Extract
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

// Exclude: Loại bỏ những types ở T nếu như những types này gán được cho U
type SomeDiff = Exclude<'a' | 'b' | 'c', 'c' | 'd'>; // 'a' | 'b'. 'c' đã bị removed.

// Extract: Loại bỏ những types ở T nếu như những types này KHÔNG gán được cho U
type SomeFilter = Extract<'a' | 'b' | 'c', 'c' | 'd'>; // 'c'. 'a' và 'b' đã bị removed.

// hoặc có thể dùng Exclude để tạo type alias NonNullable
type NonNullable<T> = Exclude<T, null | undefined>; // loại bỏ null và undefined từ T

type Readonly<T> = { readonly [P in keyof T]: T[P] }; // làm tất cả các props trong type thành readonly. Eg: Rất có lợi khi dùng cho Redux State.
type Partial<T> = { [P in keyof T]?: T[P] }; // làm tất cả các props trong type thành optional. Eg: Rất có lợi cho việc type 1 tham số khi cần truyền vào 1 type nào đó mà ko bắt buộc.
type Nullable<T> = { [P in keyof T]: T[P] | null }; // cái này tương tự như Partial, Partial sẽ trả về T[P] | undefined. Còn Nullable sẽ trả về T[P] | null

type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends keyof any, T> = { [P in K]: T };

// Pick: Pick từ trong T những type có key là K
type Person = {
  firstName: string;
  lastName: string;
  password: string;
};

type PersonWithNames = Pick<Person, 'firstName' | 'lastName'>; // {firstName: string, lastName: string}

// Record: Gán type T cho lần lượt từng key P trong K
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;
// { prop1: string, prop2: string, prop3: string }

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// ReturnType: trả về type của giá trị mà function T trả về.
type Result = ReturnType<() => string>; // string

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Omit: loại bỏ type có key là K trong T
type PersonWithoutPassword = Omit<Person, 'password'>; // {firstName: string, lastName: string}
```