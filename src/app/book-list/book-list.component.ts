import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Book } from './books.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../state/books.reducer';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnChanges{
  @Input() books: any; //ReadonlyArray<Book> = [];
  //@Input() loading!: boolean;
  @Output() add = new EventEmitter<string>();

  loading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.loading$ = this.store.pipe(select('loading'));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.store.pipe(select('loading'));
  }

  ngOnInit() {
    //this.loading$ = this.store.pipe(select('loading'));
  }
}