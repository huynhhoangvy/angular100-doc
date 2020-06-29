import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Author } from './../authors';

@Component({
    selector: 'app-author-details',
    templateUrl: './author-details.component.html',
    styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
    @Input() author: Author;
    @Output() select = new EventEmitter<Author>();
    @Output() delete = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

}
