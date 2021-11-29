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

    // loadBooks$ = createEffect(() => this.actions$.pipe(
    //     ofType(fromBookSearch.searchBooks),
    //         mergeMap(() => this.http.get(`${this.API_PATH}${action.term}`).pipe(
    //             //tap(console.log),
    //             //map((books: Book[]) => fromSearch.searchSuccess({ books })),
    //             map((books: Book[]) => ({type: '[Book List/API] Found Books Success',
    //                 payload: books}))
    //         ))
    //     )
    // );


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