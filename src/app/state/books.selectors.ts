// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { Book } from '../book-list/books.model';

// export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');

// export const selectCollectionState = createFeatureSelector<
//   ReadonlyArray<string>
// >('collection');

// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id));
//   }
// );

import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { Book } from "../book-list/books.model";
import { State } from './books.reducer';

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

export const selectIsLoading = createFeatureSelector<
  State,
  boolean
>("loading");