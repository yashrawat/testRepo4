import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  expenses: Expenses[] = [];
  private expensesSub: Subscription;

  constructor(public expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesService.getAllExpenses();
    this.expensesSub = this.expensesService.getExpenseUpdateListener()
      .subscribe((expenseData: { expenses: Expenses[] }) => {
        this.expenses = expenseData.expenses;
      });
  }

  onDelete(id: string) {
    this.expensesService.deleteExpense(id)
      .subscribe(() => {
        this.expensesService.getAllExpenses();
      });
  }

  ngOnDestroy() {
    this.expensesSub.unsubscribe();
  }

}
