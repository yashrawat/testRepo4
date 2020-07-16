import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Expenses } from './expenses.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.APIURL + '/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenses: Expenses[] = [];
  private expensesUpdated = new Subject<{ expenses: Expenses[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  addExpense(expenseName: string, expenseAmount: number, expenseDate: Date) {
    const expenseData = {
      expenseName,
      expenseAmount,
      expenseDate
    };

    this.http.post<{ message: string; expense: Expenses; }>(BACKEND_URL, expenseData)
      .subscribe(responseData => {
        console.log(`Expense added ${responseData.expense}`);
        this.router.navigate(['/expenses-list']);
      });
  }

  getAllExpenses() {
    this.http.get<{ message: string; expenses: any; }>(BACKEND_URL)
      .pipe(
        map((expenseData) => {
          return {
            expenses: expenseData.expenses.map(expense => {
              return {
                id: expense._id,
                expenseName: expense.expenseName,
                expenseAmount: expense.expenseAmount,
                expenseDate: expense.expenseDate
              };
            })
          };
        })
      )
      .subscribe((transformedExpenseData) => {
        this.expenses = transformedExpenseData.expenses;
        this.expensesUpdated.next({ expenses: [...this.expenses], });
      });
  }

  getExpenseUpdateListener() {
    return this.expensesUpdated.asObservable();
  }

  getExpense(id: string) {
    return this.http.get<{ message: string,
      expenses: {
        _id: string;
        expenseName: string;
        expenseAmount: number;
        expenseDate: Date;
      }
    }>(`${BACKEND_URL}/${id}`);
  }

  updateExpense(id: string, expenseName: string, expenseAmount: number, expenseDate: Date) {
    let expenseData: Expenses;

    expenseData = {
      id,
      expenseName,
      expenseAmount,
      expenseDate
    };

    this.http.put<{ message: string; expense: Expenses; }>(`${BACKEND_URL}/${id}`, expenseData)
      .subscribe(responseData => {
        console.log(`Expense updated ${responseData.expense}`);
        this.router.navigate(['/expenses-list']);
      });
  }

  deleteExpense(id: string) {
    return this.http.delete(`${BACKEND_URL}/${id}`);
  }
}
