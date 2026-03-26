package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpenseRestController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseRestController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        try {
            List<Expense> expenses = expenseService.getAllExpenses();
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable String id) {
        try {
            Optional<Expense> expense = expenseService.getExpenseById(id);
            return expense.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        try {
            Expense createdExpense = expenseService.addExpense(
                expense.getDate(),
                expense.getCategory(),
                expense.getAmount(),
                expense.getDescription()
            );
            return ResponseEntity.ok(createdExpense);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable String id,
            @RequestBody Expense expense) {
        try {
            boolean updated = expenseService.updateExpense(
                id,
                expense.getDate(),
                expense.getCategory(),
                expense.getAmount(),
                expense.getDescription()
            );
            
            if (updated) {
                Optional<Expense> updatedExpense = expenseService.getExpenseById(id);
                return updatedExpense.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        try {
            boolean deleted = expenseService.deleteExpense(id);
            return deleted ? ResponseEntity.noContent().build()
                           : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Double>> getExpenseSummary() {
        try {
            Map<String, Double> summary = expenseService.getSummaryByCategory();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getTotalExpenses() {
        try {
            double total = expenseService.getTotalExpenses();
            return ResponseEntity.ok(total);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        try {
            List<String> categories = expenseService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String category) {
        try {
            List<Expense> expenses = expenseService.getExpensesByCategory(category);
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
