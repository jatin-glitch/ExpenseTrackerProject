package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import java.util.*;
import java.util.stream.Collectors;

public class ExpenseRepository {
    private List<Expense> expenses;
    private final String filePath = "expenses.txt";

    public ExpenseRepository() {
        this.expenses = new ArrayList<>();
        loadFromFile();
    }

    public void addExpense(Expense expense) {
        expenses.add(expense);
        saveToFile();
    }

    public List<Expense> getAllExpenses() {
        return new ArrayList<>(expenses);
    }

    public Optional<Expense> getExpenseById(String id) {
        return expenses.stream()
                .filter(expense -> expense.getId().equals(id))
                .findFirst();
    }

    public boolean updateExpense(Expense updatedExpense) {
        for (int i = 0; i < expenses.size(); i++) {
            if (expenses.get(i).getId().equals(updatedExpense.getId())) {
                expenses.set(i, updatedExpense);
                saveToFile();
                return true;
            }
        }
        return false;
    }

    public boolean deleteExpense(String id) {
        boolean removed = expenses.removeIf(expense -> expense.getId().equals(id));
        if (removed) {
            saveToFile();
        }
        return removed;
    }

    public List<Expense> getExpensesByCategory(String category) {
        return expenses.stream()
                .filter(expense -> expense.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    public Map<String, Double> getSummaryByCategory() {
        return expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));
    }

    public double getTotalExpenses() {
        return expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    private void saveToFile() {
        try (java.io.BufferedWriter writer = new java.io.BufferedWriter(new java.io.FileWriter(filePath))) {
            for (Expense expense : expenses) {
                String line = String.format("%s,%s,%s,%.2f,%s",
                        expense.getId(),
                        expense.getDate(),
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getDescription());
                writer.write(line);
                writer.newLine();
            }
        } catch (java.io.IOException e) {
            System.err.println("Error saving to file: " + e.getMessage());
        }
    }

    private void loadFromFile() {
        expenses.clear();
        try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",", 5);
                if (parts.length == 5) {
                    String id = parts[0];
                    java.time.LocalDate date = java.time.LocalDate.parse(parts[1]);
                    String category = parts[2];
                    double amount = Double.parseDouble(parts[3]);
                    String description = parts[4];

                    Expense expense = new Expense(id, date, category, amount, description);
                    expenses.add(expense);
                }
            }
        } catch (java.io.IOException e) {
            System.out.println("No existing expense file found. Starting with empty list.");
        } catch (Exception e) {
            System.err.println("Error loading from file: " + e.getMessage());
        }
    }
}
