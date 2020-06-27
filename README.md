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
