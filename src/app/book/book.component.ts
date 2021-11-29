import { Component, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { Store , select } from '@ngrx/store';

import { selectBookCollection, selectBooks, selectIsLoading } from '../state/books.selectors';

import {
  retrievedBookList,
  addBook,
  removeBook,
  searchBooks
} from '../state/books.actions';
import { GoogleBooksService } from '../book-list/books.service';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';

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
  //loading$: Observable<boolean>;

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }

  constructor(
    private booksService: GoogleBooksService,
    private store: Store<AppState>
  ) {
    this.books$ = this.store.pipe(select('books')); // EMPTY; 
    //this.loading$ = this.store.pipe(select('loading'));
    //this.loading$ = this.store.pipe(select('loading'));
}

ngOnChanges(changes: SimpleChanges): void {
  this.books$ = this.store.pipe(select('books'));
  //this.loading$ = this.store.pipe(select('loading'));
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
   // this.loading$.subscribe(loading => console.log("searchBook loading : " + loading));
    this.store.dispatch(searchBooks({ term }));
  }

}
