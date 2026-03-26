package com.expensetracker.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class ExpenseValidator {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    public static boolean isValidDate(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) {
            return false;
        }
        try {
            LocalDate date = LocalDate.parse(dateStr.trim(), DATE_FORMATTER);
            return !date.isAfter(LocalDate.now());
        } catch (DateTimeParseException e) {
            return false;
        }
    }
    
    public static LocalDate parseDate(String dateStr) {
        if (!isValidDate(dateStr)) {
            throw new IllegalArgumentException("Invalid date format. Use YYYY-MM-DD and date cannot be in the future.");
        }
        return LocalDate.parse(dateStr.trim(), DATE_FORMATTER);
    }
    
    public static boolean isValidAmount(String amountStr) {
        if (amountStr == null || amountStr.trim().isEmpty()) {
            return false;
        }
        try {
            double amount = Double.parseDouble(amountStr.trim());
            return amount > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    
    public static double parseAmount(String amountStr) {
        if (!isValidAmount(amountStr)) {
            throw new IllegalArgumentException("Invalid amount. Enter a positive number.");
        }
        return Double.parseDouble(amountStr.trim());
    }
    
    public static boolean isValidCategory(String category) {
        return category != null && !category.trim().isEmpty() && category.trim().length() <= 50;
    }
    
    public static boolean isValidDescription(String description) {
        return description != null && !description.trim().isEmpty() && description.trim().length() <= 200;
    }
}
