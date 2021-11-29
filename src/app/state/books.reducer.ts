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
  loading: boolean;
}

export const initialState: State = { 
  books: [] as any,
  collection: [] as any,
  term: '' ,
  loading: false
}

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => ({ ...state, books: books})),
  on(searchBooks, (state, { term }) => ({ ...state, books: [],  collection: [], term: term, loading: true})),
  on(searchBooksSuccess, (state, {books}) => ({ ...state, books: books, loading: false}))

);

export const isLoading = (state: State) => state.loading;