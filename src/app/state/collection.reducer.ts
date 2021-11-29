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

// import { createReducer, on } from '@ngrx/store';
// import { addBook, removeBook } from './books.actions';
// import { Book } from '../book-list/books.model';

// export const initialState: Array<Book> = [];

// export const collectionReducer = createReducer(
//   initialState,

//   on(removeBook, (state, { book }) => state.filter((booka) => booka.id !== book.id)),

//   on(addBook, (state, { book }) => {
//     if (state.indexOf(book) > -1) return state;
//     return [...state, book];
    
//   })

// );