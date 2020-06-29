import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
    // @Input() checked: boolean;
    @Input() checked = false;
    @Output() checkedChange = new EventEmitter<boolean>();
    constructor() { }

    ngOnInit(): void {
    }

    toggle() {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
    }

}
