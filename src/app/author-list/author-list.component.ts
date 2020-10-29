import { Component, OnInit } from '@angular/core';
import { Author, authors } from '../authors';

@Component({
    selector: 'app-author-list',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss'],
})

export class AuthorListComponent implements OnInit {
    authors = authors;
    currentAuthor = authors[0];

    constructor() {
    }

    ngOnInit(): void {
    }

    onSelected(selectedAuthor: Author) {
        this.currentAuthor = selectedAuthor;
    }

    onDelete(id: number) {
        this.authors = this.authors.filter(author => {
            return author.id !== id;
        });
        console.log({ author: this.authors[0].firstName });

        if ( this.currentAuthor.id === id ) {
            this.currentAuthor = this.authors[0];
        }
    }

}
