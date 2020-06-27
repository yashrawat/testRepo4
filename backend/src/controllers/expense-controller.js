const Expense = require('../models/expense-model');

exports.createExpense = (req, res, next) => {
    const expense = new Expense({
        expenseName: req.body.expenseName,
        expenseAmount: req.body.expenseAmount,
        expenseDate: req.body.expenseDate
    });

    //debugging
    console.log(req.body);

    expense.save()
        .then(createdExpense => {
            res.status(201).json({
                message: 'Expense added successfully',
                expense: {
                    id: createdExpense._id,
                    expenseName: createdExpense.expenseName,
                    expenseAmount: createdExpense.expenseAmount,
                    expenseDate: createdExpense.expenseDate
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: `Creation of expense failed. ${error}`
            });
        });
};

exports.fetchAllExpenses = (req, res, next) => {
    const expense = Expense.find();

    expense
        .then(fetchedExpenses => {
            res.status(200).json({
                message: 'Expenses fetched successfully',
                expenses: fetchedExpenses
            });
        })
        .catch(error => {
            res.status(500).json({
                message: `Fetching expenses failed. ${error}`
            });
        });
};

exports.fetchOneExpense = (req, res, next) => {
    Expense.findById(req.params.id)
        .then(expense => {
            if (expense) {
                res.status(200).json({
                    message: 'Expense fetched successfully',
                    expenses: expense
                });
            } else {
                res.status(404).json({
                    message: 'Expense not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Fetching expense failed ${error}`
            });
        });
};

exports.updateExpense = (req, res, next) => {
    Expense.findById(req.params.id, (error, expenseLoaded) => {
        if (!expenseLoaded) {
            return next(new Error(`Could not load document ${error}`));
        } else {
            expenseLoaded.expenseName = req.body.expenseName;
            expenseLoaded.expenseAmount = req.body.expenseAmount;
            expenseLoaded.expenseDate = req.body.expenseDate;

            expenseLoaded.save()
                .then(updatedExpense => {
                    res.status(200).json({
                        message: `Expense updated successfully. ${updatedExpense}`
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: `Expense could not be updated. ${error}`
                    });
                });
        }
    });
};

exports.deleteExpense = (req, res, next) => {
    Expense.findByIdAndRemove({  _id: req.params.id }, (error, expenseLoaded) => {
        if (error) {
            return res.status(500).json({
                message: `Expense could not be deleted. ${error}`
            });
        } else {
            return res.status(200).json({
                message: `Expense deleted successfully. ${expenseLoaded}`
            });
        }
    });
};