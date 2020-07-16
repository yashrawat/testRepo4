import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-expenses-create',
  templateUrl: './expenses-create.component.html',
  styleUrls: ['./expenses-create.component.css']
})
export class ExpensesCreateComponent implements OnInit {

  createForm: FormGroup;
  expense: Expenses;
  mode = 'create';
  private expenseId: string;

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, public expensesService: ExpensesService) { }

  ngOnInit() {
    console.log('Create form initialisation');
    this.createForm = this.fb.group({
      expenseName: ['', Validators.required],
      expenseAmount: [null, Validators.required],
      expenseDate: [null, Validators.required]
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        console.log('Edit mode activated');
        this.mode = 'edit';
        this.expenseId = paramMap.get('id');
        this.expensesService.getExpense(this.expenseId)
          .subscribe(expenseData => {
            this.expense = {
              id: expenseData.expenses._id,
              expenseName: expenseData.expenses.expenseName,
              expenseAmount: expenseData.expenses.expenseAmount,
              expenseDate: expenseData.expenses.expenseDate
            };
            console.log(expenseData.expenses.expenseDate);
            this.createForm.patchValue({
              expenseName: this.expense.expenseName,
              expenseAmount: this.expense.expenseAmount,
              expenseDate: this.expense.expenseDate
            });
          });
      } else {
        console.log('Create mode activated');
        this.mode = 'create';
        this.expenseId = null;
      }
    });
  }

  onSaveExpense() {
    if (this.createForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      console.log('create mode');
      this.expensesService.addExpense(
        this.createForm.value.expenseName,
        this.createForm.value.expenseAmount,
        this.createForm.value.expenseDate
      );
    } else {
      console.log('Update mode');
      this.expensesService.updateExpense(
        this.expenseId,
        this.createForm.value.expenseName,
        this.createForm.value.expenseAmount,
        this.createForm.value.expenseDate
      );
    }
    this.createForm.reset();
  }

}
