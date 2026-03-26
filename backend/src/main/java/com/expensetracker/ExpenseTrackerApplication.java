package com.expensetracker;

import com.expensetracker.controller.ExpenseController;

public class ExpenseTrackerApplication {
    public static void main(String[] args) {
        System.out.println("Welcome to Expense Tracker Application!");
        System.out.println("=====================================");
        
        ExpenseController controller = new ExpenseController();
        controller.start();
    }
}
