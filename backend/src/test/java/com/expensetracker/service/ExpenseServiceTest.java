package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExpenseServiceTest {
    
    @Mock
    private ExpenseRepository repository;
    
    private ExpenseService expenseService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        expenseService = new ExpenseService(repository);
    }
    
    @Test
    void testAddExpense() {
        // Given
        LocalDate date = LocalDate.now();
        String category = "Food";
        double amount = 50.0;
        String description = "Lunch";
        
        Expense expectedExpense = new Expense(date, category, amount, description);
        
        // When
        Expense result = expenseService.addExpense(date, category, amount, description);
        
        // Then
        assertNotNull(result);
        assertEquals(date, result.getDate());
        assertEquals(category, result.getCategory());
        assertEquals(amount, result.getAmount());
        assertEquals(description, result.getDescription());
        verify(repository).addExpense(any(Expense.class));
    }
    
    @Test
    void testAddExpenseWithFutureDate() {
        // Given
        LocalDate futureDate = LocalDate.now().plusDays(1);
        
        // When & Then
        assertThrows(IllegalArgumentException.class, () -> {
            expenseService.addExpense(futureDate, "Food", 50.0, "Lunch");
        });
    }
    
    @Test
    void testAddExpenseWithNegativeAmount() {
        // Given
        LocalDate date = LocalDate.now();
        
        // When & Then
        assertThrows(IllegalArgumentException.class, () -> {
            expenseService.addExpense(date, "Food", -50.0, "Lunch");
        });
    }
    
    @Test
    void testGetAllExpenses() {
        // Given
        List<Expense> expectedExpenses = List.of(
            new Expense(LocalDate.now(), "Food", 50.0, "Lunch"),
            new Expense(LocalDate.now(), "Transport", 20.0, "Bus ticket")
        );
        when(repository.getAllExpenses()).thenReturn(expectedExpenses);
        
        // When
        List<Expense> result = expenseService.getAllExpenses();
        
        // Then
        assertEquals(expectedExpenses, result);
        verify(repository).getAllExpenses();
    }
    
    @Test
    void testGetExpenseById() {
        // Given
        String id = "test-id";
        Expense expectedExpense = new Expense(id, LocalDate.now(), "Food", 50.0, "Lunch");
        when(repository.getExpenseById(id)).thenReturn(Optional.of(expectedExpense));
        
        // When
        Optional<Expense> result = expenseService.getExpenseById(id);
        
        // Then
        assertTrue(result.isPresent());
        assertEquals(expectedExpense, result.get());
        verify(repository).getExpenseById(id);
    }
    
    @Test
    void testUpdateExpense() {
        // Given
        String id = "test-id";
        LocalDate newDate = LocalDate.now();
        String newCategory = "Transport";
        double newAmount = 30.0;
        String newDescription = "Taxi";
        
        Expense existingExpense = new Expense(id, LocalDate.now().minusDays(1), "Food", 50.0, "Lunch");
        when(repository.getExpenseById(id)).thenReturn(Optional.of(existingExpense));
        when(repository.updateExpense(any(Expense.class))).thenReturn(true);
        
        // When
        boolean result = expenseService.updateExpense(id, newDate, newCategory, newAmount, newDescription);
        
        // Then
        assertTrue(result);
        verify(repository).updateExpense(any(Expense.class));
    }
    
    @Test
    void testUpdateNonExistentExpense() {
        // Given
        String id = "non-existent-id";
        when(repository.getExpenseById(id)).thenReturn(Optional.empty());
        
        // When
        boolean result = expenseService.updateExpense(id, LocalDate.now(), "Food", 50.0, "Lunch");
        
        // Then
        assertFalse(result);
        verify(repository, never()).updateExpense(any(Expense.class));
    }
    
    @Test
    void testDeleteExpense() {
        // Given
        String id = "test-id";
        when(repository.deleteExpense(id)).thenReturn(true);
        
        // When
        boolean result = expenseService.deleteExpense(id);
        
        // Then
        assertTrue(result);
        verify(repository).deleteExpense(id);
    }
    
    @Test
    void testGetSummaryByCategory() {
        // Given
        Map<String, Double> expectedSummary = Map.of(
            "Food", 150.0,
            "Transport", 50.0
        );
        when(repository.getSummaryByCategory()).thenReturn(expectedSummary);
        
        // When
        Map<String, Double> result = expenseService.getSummaryByCategory();
        
        // Then
        assertEquals(expectedSummary, result);
        verify(repository).getSummaryByCategory();
    }
    
    @Test
    void testGetTotalExpenses() {
        // Given
        double expectedTotal = 200.0;
        when(repository.getTotalExpenses()).thenReturn(expectedTotal);
        
        // When
        double result = expenseService.getTotalExpenses();
        
        // Then
        assertEquals(expectedTotal, result);
        verify(repository).getTotalExpenses();
    }
    
    @Test
    void testGetAllCategories() {
        // Given
        List<Expense> expenses = List.of(
            new Expense(LocalDate.now(), "Food", 50.0, "Lunch"),
            new Expense(LocalDate.now(), "Transport", 20.0, "Bus ticket"),
            new Expense(LocalDate.now(), "Food", 30.0, "Dinner")
        );
        when(repository.getAllExpenses()).thenReturn(expenses);
        
        // When
        List<String> result = expenseService.getAllCategories();
        
        // Then
        assertEquals(2, result.size());
        assertTrue(result.contains("Food"));
        assertTrue(result.contains("Transport"));
    }
}
