
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './books.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=';
  
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }

  retrieveBooks(volumeId: string): Observable<Array<Book>> {
    return this.http.get<{ items: Book[] }>(`${this.API_PATH}${volumeId}`)
    .pipe(map((books) => books.items || []));
  }
}