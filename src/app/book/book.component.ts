import { Component, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { Store , select } from '@ngrx/store';

import { selectBookCollection, selectBooks } from '../state/books.selectors';

import {
  retrievedBookList,
  addBook,
  removeBook,
  searchBooks
} from '../state/books.actions';
import { GoogleBooksService } from '../book-list/books.service';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnChanges {

   //books$ = this.store.select(selectBooks);
   //bookCollection$ = this.store.select(selectBookCollection);

  books$ = this.store.pipe(select('books'));
  bookCollection$ = this.store.pipe(select('collection'));

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }

  constructor(
    private booksService: GoogleBooksService,
    private store: Store<AppState>
  ) {this.books$ = this.store.pipe(select('books')); // EMPTY; 
}

ngOnChanges(changes: SimpleChanges): void {
  this.books$ = this.store.pipe(select('books'));
}
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) => {
        //console.log("from ngOnInit:" + books);
        this.store.dispatch(retrievedBookList({ books }))
      });
  }

  searchBook(term: string){
    this.store.dispatch(searchBooks({ term }));
  }

}
