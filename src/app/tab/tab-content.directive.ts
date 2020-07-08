import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[tabContent]',
})
export class TabContentDirective {
  // constructor(public templateRef: TemplateRef<unknown>) { }
}
