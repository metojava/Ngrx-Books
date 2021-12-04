to run application :

git clone https://github.com/metojava/Ngrx-Books.git
cd Ngrx-Books
git checkout -b material-addition
git pull origin  material-addition
npm i & ng s



Problems and Solutions:

# Ngrx-Books
Ngrx 8+ books app

I copied code from Ngrx walkthrough tutorial and into  ng new books app
but faced some errors.
here are solutions , in case you decide to build app yourself , hope it helps:


app.component.html:

<h2>Books</h2>
<app-book-list class="book-list" [books]="books$ | async" (add)="onAdd($event)"></app-book-list>

<h2>My Collection</h2>
<app-book-collection class="book-collection" [books]="bookCollection$ | async" (remove)="onRemove($event)">
</app-book-collection>


gives error:

Error: src/app/app.component.html:2:35 - error TS2322: Type 'readonly Book[] | null' is not assignable to type 'readonly Book[]'.
  Type 'null' is not assignable to type 'readonly Book[]'.

2 <app-book-list class="book-list" [books]="books$ | async" (add)="onAdd($event)"></app-book-list>
                                    ~~~~~

  src/app/app.component.ts:14:16
    14   templateUrl: './app.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AppComponent.
	
	
	
Solution:

surround "books$ | async" with parentheses : "(books$ | async)!"
same as "bookCollection$ | async" :  "(bookCollection$ | async)!"



-----------------


book-collection.component.ts :

export class BookCollectionComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() remove = new EventEmitter<string>();
}

gives error:


Error: src/app/app.component.html:5:47 - error TS2322: Type '(Book | undefined)[]' is not assignable to type 'readonly Book[]'.
  Type 'Book | undefined' is not assignable to type 'Book'.
    Type 'undefined' is not assignable to type 'Book'.

5 <app-book-collection class="book-collection" [books]="(bookCollection$ | async)!" (remove)="onRemove($event)">
                                                ~~~~~

  src/app/app.component.ts:14:16
    14   templateUrl: './app.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AppComponent.
	
	

	
Solution:

change first line to :

 @Input() books: any | unknown ;//ReadonlyArray<Book> = [];
 
 
 
---

was getting on chrome console:

ERROR Error: Cannot find a differ supporting object '[object Object]' of type 'object'. NgFor only supports binding to Iterables such as Arrays.

in book-list.component.html had :

<div
  class="book-item"
  *ngFor="let book of books"
>

changed books to books.books , as state now has books itself 

after got error on npm console:

Error: src/app/book-list/book-list.component.html:3:29 - error TS2339: Property 'books' does not exist on type 'readonly Book[]'.

3   *ngFor="let book of books.books"
                              ~~~~~

  src/app/book-list/book-list.component.ts:6:16
    6   templateUrl: './book-list.component.html',
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component BookListComponent.


in BookListComponent :

export class BookListComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() add = new EventEmitter<string>();
}



change  ReadonlyArray<Book> = [];  to any
and it resolved:

export class BookListComponent {
  @Input() books: any; //ReadonlyArray<Book> = [];
  @Output() add = new EventEmitter<string>();
}


after this changes search functionality worked 


--


files in state folder:

app.state.ts:

import { Book } from '../book-list/books.model';

export interface AppState {
  books: Array<Book>;
  collection: Array<string>;
}

--

book-search.effects.ts:  //  always register effect in app.modules.ts file with EffectsModule...

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromBookSearch from './books.actions';
import { catchError, mergeMap, map, tap, take} from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Book } from '../book-list/books.model';
import { GoogleBooksService } from '../book-list/books.service';

@Injectable()
export class BooksSearchEffects {

    private API_PATH = 'https://www.googleapis.com/books/v1/volumes?maxResults=7&orderBy=relevance&q=';

    constructor(private actions$: Actions, private http: HttpClient, private googleBooksService: GoogleBooksService) {}


    books$ = createEffect(() => this.actions$.pipe(
        ofType(fromBookSearch.searchBooks),
        mergeMap(action => this.googleBooksService.retrieveBooks(action.term).pipe(
          //map(data => fromBookSearch.searchBooksSuccess({data}))
          tap(console.log),
          map(books  => fromBookSearch.searchBooksSuccess({ books })),

         //map(searchBooks => ({ type: '[Book List/API] Found Books Success', payload: searchBooks })), 
         catchError(() => EMPTY)

        )),
      ));

}


--

books.actions.ts:

import { createAction, props } from '@ngrx/store';
import { Book } from '../book-list/books.model';

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);

export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ books: Array<Book> }>()
);

export const searchBooks = createAction(
  '[Book List/API] Search Books',
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  '[Book List/API] Found Books Success',
  props<{ books: Array<Book> }>()
);


--

books.reducer.ts:

import { createReducer, on } from '@ngrx/store';

import { retrievedBookList, searchBooks, searchBooksSuccess } from './books.actions';
import { Book } from '../book-list/books.model';

export interface State {
  books: Array<Book>;
  collection: Array<Book>;
  term: string;
}

export const initialState: State = { 
  books: [] as any,
  collection: [] as any,
  term: '' 
}

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => ({ ...state, books: books})),
  on(searchBooks, (state, { term }) => ({ state, books: [],  term,  collection: []})),
  on(searchBooksSuccess, (state, {books}) => ({ ...state, books: books}))

);


--

books.selectors.ts:

import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { Book } from "../book-list/books.model";

export const selectBooks = createSelector(
  (state: AppState) => state.books,
  (books: Book[]) => books
);

export const selectCollectionState = createFeatureSelector<
  AppState,
  string[]
>("collection");

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Book[], collection: string[]) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);


--

collection.reducer.ts:

import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from './books.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
  on(addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);



--

but adding to collection is not working. on chrome console :

TypeError: books.find is not a function ...

in BookComponent.ts:

 //books$ = this.store.select(selectBooks);
   //bookCollection$ = this.store.select(selectBookCollection);

  books$ = this.store.pipe(select('books'));
  bookCollection$ = this.store.pipe(select('collection'));

now it working

--


ERROR TypeError: Cannot read properties of undefined (reading 'title')

in book-list.component.html canged book.id to book , what is emitted:

<div
  class="book-item"
  *ngFor="let book of books.books"
>
  <!-- <p>{{book.volumeInfo.title}}</p><span> by {{book.volumeInfo.authors}}</span> -->

  <app-book-detail [book]="book"></app-book-detail>
  <button mat-raised-button color="primary"
    (click)="add.emit(book.id)"
    data-test="add-button"
  >Add to Collection</button>
</div>

(click)="add.emit(book.id)"  change to  (click)="add.emit(book)"