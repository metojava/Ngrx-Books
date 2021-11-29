import { Book } from '../book-list/books.model';

export interface AppState {
  books: Array<Book>;
  collection: Array<string>;
}