import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpensesCreateComponent } from './expenses/expenses-create/expenses-create.component';
import { PagenotfoundComponent } from './utils/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'expenses-list', component: ExpensesListComponent },
  { path: 'expenses-create', component: ExpensesCreateComponent },
  { path: 'expense-edit/:id', component: ExpensesCreateComponent },
  { path: '', redirectTo: '/expenses-list', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
