package com.expensetracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@EntityListeners(AuditingEntityListener.class)
public class ExpenseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @NotNull(message = "Date is required")
    @Column(name = "expense_date", nullable = false)
    private java.time.LocalDate date;
    
    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must be 50 characters or less")
    @Column(nullable = false, length = 50)
    private String category;
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Amount must have at most 2 decimal places")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;
    
    @NotBlank(message = "Description is required")
    @Size(max = 200, message = "Description must be 200 characters or less")
    @Column(nullable = false, length = 200)
    private String description;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Default constructor
    public ExpenseEntity() {}
    
    // Constructor with required fields
    public ExpenseEntity(java.time.LocalDate date, String category, BigDecimal amount, String description) {
        this.date = date;
        this.category = category;
        this.amount = amount;
        this.description = description;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public java.time.LocalDate getDate() {
        return date;
    }
    
    public void setDate(java.time.LocalDate date) {
        this.date = date;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExpenseEntity that = (ExpenseEntity) o;
        return id != null && id.equals(that.id);
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
    
    @Override
    public String toString() {
        return "ExpenseEntity{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", category='" + category + '\'' +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
