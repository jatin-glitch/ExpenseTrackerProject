package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService() {
        this.repository = new ExpenseRepository();
    }

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public Expense addExpense(java.time.LocalDate date, String category, double amount, String description) {
        validateExpenseData(date, category, amount, description);
        
        Expense expense = new Expense(date, category.trim(), amount, description.trim());
        repository.addExpense(expense);
        return expense;
    }

    public List<Expense> getAllExpenses() {
        return repository.getAllExpenses();
    }

    public Optional<Expense> getExpenseById(String id) {
        return repository.getExpenseById(id);
    }

    public boolean updateExpense(String id, java.time.LocalDate date, String category, double amount, String description) {
        validateExpenseData(date, category, amount, description);
        
        Optional<Expense> existingExpense = repository.getExpenseById(id);
        if (existingExpense.isPresent()) {
            Expense updatedExpense = new Expense(id, date, category.trim(), amount, description.trim());
            return repository.updateExpense(updatedExpense);
        }
        return false;
    }

    public boolean deleteExpense(String id) {
        return repository.deleteExpense(id);
    }

    public List<Expense> getExpensesByCategory(String category) {
        return repository.getExpensesByCategory(category);
    }

    public Map<String, Double> getSummaryByCategory() {
        return repository.getSummaryByCategory();
    }

    public double getTotalExpenses() {
        return repository.getTotalExpenses();
    }

    public List<String> getAllCategories() {
        return getAllExpenses().stream()
                .map(Expense::getCategory)
                .distinct()
                .sorted()
                .toList();
    }

    private void validateExpenseData(java.time.LocalDate date, String category, double amount, String description) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }
        if (date.isAfter(java.time.LocalDate.now())) {
            throw new IllegalArgumentException("Date cannot be in the future");
        }
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be empty");
        }
    }
}
