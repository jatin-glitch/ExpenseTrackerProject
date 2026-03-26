package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import com.expensetracker.util.ExpenseValidator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;

public class ExpenseController {
    private final ExpenseService expenseService;
    private final Scanner scanner;

    public ExpenseController() {
        this.expenseService = new ExpenseService();
        this.scanner = new Scanner(System.in);
    }

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        int choice;
        do {
            displayMenu();
            choice = getValidChoice();

            try {
                switch (choice) {
                    case 1 -> addExpense();
                    case 2 -> viewExpenses();
                    case 3 -> viewExpenseById();
                    case 4 -> updateExpense();
                    case 5 -> deleteExpense();
                    case 6 -> viewSummary();
                    case 7 -> viewExpensesByCategory();
                    case 8 -> exportExpenses();
                    case 9 -> System.out.println("Exiting... Goodbye!");
                    default -> System.out.println("Invalid choice. Please try again.");
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }

            if (choice != 9) {
                System.out.println("\nPress Enter to continue...");
                scanner.nextLine();
            }
        } while (choice != 9);
    }

    private void displayMenu() {
        System.out.println("\n=== EXPENSE TRACKER ===");
        System.out.println("1. Add Expense");
        System.out.println("2. View All Expenses");
        System.out.println("3. View Expense by ID");
        System.out.println("4. Update Expense");
        System.out.println("5. Delete Expense");
        System.out.println("6. View Summary by Category");
        System.out.println("7. View Expenses by Category");
        System.out.println("8. Export Expenses");
        System.out.println("9. Exit");
        System.out.println("========================");
    }

    private int getValidChoice() {
        System.out.print("Choose an option (1-9): ");
        while (!scanner.hasNextInt()) {
            System.out.print("Please enter a valid number: ");
            scanner.next();
        }
        int choice = scanner.nextInt();
        scanner.nextLine();
        return choice;
    }

    private void addExpense() {
        System.out.println("\n--- Add New Expense ---");
        
        String date = getValidInput("Enter date (YYYY-MM-DD): ", 
            input -> ExpenseValidator.isValidDate(input), 
            "Invalid date format. Use YYYY-MM-DD.");
        
        String category = getValidInput("Enter category: ", 
            input -> ExpenseValidator.isValidCategory(input), 
            "Category cannot be empty and must be 50 characters or less.");
        
        double amount = ExpenseValidator.parseAmount(
            getValidInput("Enter amount: ", 
                input -> ExpenseValidator.isValidAmount(input), 
                "Amount must be a positive number.")
        );
        
        String description = getValidInput("Enter description: ", 
            input -> ExpenseValidator.isValidDescription(input), 
            "Description cannot be empty and must be 200 characters or less.");

        Expense expense = expenseService.addExpense(
            ExpenseValidator.parseDate(date), 
            category, 
            amount, 
            description
        );
        
        System.out.println("✓ Expense added successfully!");
        System.out.println("ID: " + expense.getId());
    }

    private void viewExpenses() {
        System.out.println("\n--- All Expenses ---");
        List<Expense> expenses = expenseService.getAllExpenses();
        
        if (expenses.isEmpty()) {
            System.out.println("No expenses found.");
            return;
        }
        
        System.out.printf("%-36s %-12s %-15s %-10s %-20s%n", 
            "ID", "Date", "Category", "Amount", "Description");
        System.out.println("-".repeat(90));
        
        for (Expense expense : expenses) {
            System.out.printf("%-36s %-12s %-15s $%-9.2f %-20s%n", 
                expense.getId(), 
                expense.getDate(), 
                expense.getCategory(), 
                expense.getAmount(), 
                expense.getDescription());
        }
        
        System.out.println("\nTotal: $" + String.format("%.2f", expenseService.getTotalExpenses()));
    }

    private void viewExpenseById() {
        System.out.println("\n--- View Expense by ID ---");
        String id = getValidInput("Enter expense ID: ", input -> !input.trim().isEmpty(), "ID cannot be empty.");
        
        Optional<Expense> expense = expenseService.getExpenseById(id);
        if (expense.isPresent()) {
            System.out.println("\nExpense Details:");
            System.out.println("ID: " + expense.get().getId());
            System.out.println("Date: " + expense.get().getDate());
            System.out.println("Category: " + expense.get().getCategory());
            System.out.println("Amount: $" + String.format("%.2f", expense.get().getAmount()));
            System.out.println("Description: " + expense.get().getDescription());
        } else {
            System.out.println("Expense not found.");
        }
    }

    private void updateExpense() {
        System.out.println("\n--- Update Expense ---");
        String id = getValidInput("Enter expense ID to update: ", input -> !input.trim().isEmpty(), "ID cannot be empty.");
        
        if (!expenseService.getExpenseById(id).isPresent()) {
            System.out.println("Expense not found.");
            return;
        }
        
        System.out.println("Enter new details (leave empty to keep current value):");
        
        String dateInput = getInput("Enter new date (YYYY-MM-DD): ");
        String categoryInput = getInput("Enter new category: ");
        String amountInput = getInput("Enter new amount: ");
        String descriptionInput = getInput("Enter new description: ");
        
        Optional<Expense> currentExpense = expenseService.getExpenseById(id);
        if (currentExpense.isPresent()) {
            Expense current = currentExpense.get();
            
            java.time.LocalDate newDate = dateInput.isEmpty() ? current.getDate() : ExpenseValidator.parseDate(dateInput);
            String newCategory = categoryInput.isEmpty() ? current.getCategory() : categoryInput;
            double newAmount = amountInput.isEmpty() ? current.getAmount() : ExpenseValidator.parseAmount(amountInput);
            String newDescription = descriptionInput.isEmpty() ? current.getDescription() : descriptionInput;
            
            if (expenseService.updateExpense(id, newDate, newCategory, newAmount, newDescription)) {
                System.out.println("✓ Expense updated successfully!");
            } else {
                System.out.println("Failed to update expense.");
            }
        }
    }

    private void deleteExpense() {
        System.out.println("\n--- Delete Expense ---");
        String id = getValidInput("Enter expense ID to delete: ", input -> !input.trim().isEmpty(), "ID cannot be empty.");
        
        Optional<Expense> expense = expenseService.getExpenseById(id);
        if (expense.isPresent()) {
            System.out.println("Expense to delete:");
            System.out.println(expense.get());
            
            String confirm = getValidInput("Are you sure? (y/N): ", 
                input -> input.equalsIgnoreCase("y") || input.equalsIgnoreCase("n") || input.isEmpty(), 
                "Enter 'y' or 'n'.");
            
            if (confirm.equalsIgnoreCase("y")) {
                if (expenseService.deleteExpense(id)) {
                    System.out.println("✓ Expense deleted successfully!");
                } else {
                    System.out.println("Failed to delete expense.");
                }
            } else {
                System.out.println("Deletion cancelled.");
            }
        } else {
            System.out.println("Expense not found.");
        }
    }

    private void viewSummary() {
        System.out.println("\n--- Summary by Category ---");
        Map<String, Double> summary = expenseService.getSummaryByCategory();
        
        if (summary.isEmpty()) {
            System.out.println("No expenses to summarize.");
            return;
        }
        
        System.out.printf("%-15s %-10s%n", "Category", "Amount");
        System.out.println("-".repeat(25));
        
        for (Map.Entry<String, Double> entry : summary.entrySet()) {
            System.out.printf("%-15s $%-9.2f%n", entry.getKey(), entry.getValue());
        }
        
        System.out.println("-".repeat(25));
        System.out.printf("Total: $%.2f%n", expenseService.getTotalExpenses());
    }

    private void viewExpensesByCategory() {
        System.out.println("\n--- Expenses by Category ---");
        List<String> categories = expenseService.getAllCategories();
        
        if (categories.isEmpty()) {
            System.out.println("No categories found.");
            return;
        }
        
        System.out.println("Available categories:");
        for (int i = 0; i < categories.size(); i++) {
            System.out.println((i + 1) + ". " + categories.get(i));
        }
        
        int categoryChoice = getValidChoice();
        if (categoryChoice < 1 || categoryChoice > categories.size()) {
            System.out.println("Invalid category choice.");
            return;
        }
        
        String selectedCategory = categories.get(categoryChoice - 1);
        List<Expense> expenses = expenseService.getExpensesByCategory(selectedCategory);
        
        System.out.println("\nExpenses in category: " + selectedCategory);
        for (Expense expense : expenses) {
            System.out.println(expense);
        }
        
        double categoryTotal = expenses.stream().mapToDouble(Expense::getAmount).sum();
        System.out.println("Category total: $" + String.format("%.2f", categoryTotal));
    }

    private void exportExpenses() {
        System.out.println("\n--- Export Expenses ---");
        System.out.println("Expenses are automatically saved to expenses.txt file.");
        System.out.println("Total expenses exported: " + expenseService.getAllExpenses().size());
    }

    private String getValidInput(String prompt, java.util.function.Predicate<String> validator, String errorMessage) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            if (validator.test(input)) {
                return input;
            }
            System.out.println(errorMessage);
        }
    }

    private String getInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }
}
