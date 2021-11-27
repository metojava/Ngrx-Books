# Ngrx-Books
Ngrx 8+ books app

I copied code from Ngrx walkthrough tutorial and into  ng new books app
but faced some errors.
here are solutions , in case you decide to build app yourself , hope it helps:


app.component.html:

<h2>Books</h2>
<app-book-list class="book-list" [books]="books$ | async" (add)="onAdd($event)"></app-book-list>

<h2>My Collection</h2>
<app-book-collection class="book-collection" [books]="bookCollection$ | async" (remove)="onRemove($event)">
</app-book-collection>


gives error:

Error: src/app/app.component.html:2:35 - error TS2322: Type 'readonly Book[] | null' is not assignable to type 'readonly Book[]'.
  Type 'null' is not assignable to type 'readonly Book[]'.

2 <app-book-list class="book-list" [books]="books$ | async" (add)="onAdd($event)"></app-book-list>
                                    ~~~~~

  src/app/app.component.ts:14:16
    14   templateUrl: './app.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AppComponent.
	
	
	
Solution:

surround "books$ | async" with parentheses : "(books$ | async)!"
same as "bookCollection$ | async" :  "(bookCollection$ | async)!"



-----------------


book-collection.component.ts :

export class BookCollectionComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() remove = new EventEmitter<string>();
}

gives error:


Error: src/app/app.component.html:5:47 - error TS2322: Type '(Book | undefined)[]' is not assignable to type 'readonly Book[]'.
  Type 'Book | undefined' is not assignable to type 'Book'.
    Type 'undefined' is not assignable to type 'Book'.

5 <app-book-collection class="book-collection" [books]="(bookCollection$ | async)!" (remove)="onRemove($event)">
                                                ~~~~~

  src/app/app.component.ts:14:16
    14   templateUrl: './app.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AppComponent.
	
	

	
Solution:

change first line to :

 @Input() books: any | unknown ;//ReadonlyArray<Book> = [];
 
 
 
---
