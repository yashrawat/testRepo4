import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { ExpensesCreateComponent } from './expenses/expenses-create/expenses-create.component';
import { PagenotfoundComponent } from './utils/pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'expenses-list', component: ExpensesListComponent, canActivate: [AuthGuard] },
  { path: 'expenses-create', component: ExpensesCreateComponent, canActivate: [AuthGuard] },
  { path: 'expense-edit/:id', component: ExpensesCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '/expenses-list', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
