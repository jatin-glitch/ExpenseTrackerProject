package com.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Expense {
    private String id;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    
    private String category;
    private double amount;
    private String description;

    public Expense() {
    }

    public Expense(String id, LocalDate date, String category, double amount, String description) {
        this.id = id;
        this.date = date;
        this.category = category;
        this.amount = amount;
        this.description = description;
    }

    public Expense(LocalDate date, String category, double amount, String description) {
        this(java.util.UUID.randomUUID().toString(), date, category, amount, description);
    }

    // Getters
    public String getId() { return id; }
    public LocalDate getDate() { return date; }
    public String getCategory() { return category; }
    public double getAmount() { return amount; }
    public String getDescription() { return description; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setCategory(String category) { this.category = category; }
    public void setAmount(double amount) { this.amount = amount; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return String.format("%s | %s | $%.2f | %s", date, category, amount, description);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Expense expense = (Expense) o;
        return Objects.equals(id, expense.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
