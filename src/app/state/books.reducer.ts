// import { createReducer, on } from '@ngrx/store';

// import { retrievedBookList } from './books.actions';
// import { Book } from '../book-list/books.model';

// export const initialState: ReadonlyArray<Book> = [];

// export const booksReducer = createReducer(
//   initialState,
//   on(retrievedBookList, (state, { books }) => books)
// );

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