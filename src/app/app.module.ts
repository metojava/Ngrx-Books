import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book-list/book-list.component';

import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import { StoreModule } from '@ngrx/store';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookAuthorsComponent } from './book-authors/book-authors.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { TruncsPipe } from './truncs.pipe';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';

import { EffectsModule } from '@ngrx/effects';
import { BooksSearchEffects } from './state/book-search.effects';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    EffectsModule.forRoot([BooksSearchEffects]),
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent,  BookListComponent, BookCollectionComponent, BookDetailComponent, BookAuthorsComponent, BookSearchComponent, TruncsPipe, RegisterComponent, LoginComponent, BookComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}