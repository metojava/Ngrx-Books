import { Component, OnInit , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  @Output() searchBookEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  searchForBooks(value: string){
    this.searchBookEvent.emit(value);
  }

}
