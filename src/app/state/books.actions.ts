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
