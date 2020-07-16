import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './utils/error/error.component';
import { HeaderComponent } from './utils/header/header.component';
import { PagenotfoundComponent } from './utils/pagenotfound/pagenotfound.component';
import { AngularMaterialModule } from './utils/angular-material/angular-material.module';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpensesCreateComponent } from './expenses/expenses-create/expenses-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    PagenotfoundComponent,
    ExpensesListComponent,
    ExpensesCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
