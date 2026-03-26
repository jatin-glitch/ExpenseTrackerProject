package com.expensetracker.repository;

import com.expensetracker.model.ExpenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExpenseEntityRepository extends JpaRepository<ExpenseEntity, String> {
    
    List<ExpenseEntity> findByCategory(String category);
    
    List<ExpenseEntity> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<ExpenseEntity> findByDateGreaterThanEqualOrderByDateDesc(LocalDate date);
    
    @Query("SELECT e.category, SUM(e.amount) as total FROM ExpenseEntity e " +
           "WHERE e.date >= :startDate AND e.date <= :endDate " +
           "GROUP BY e.category ORDER BY total DESC")
    List<Object[]> getCategoryTotalsBetweenDates(@Param("startDate") LocalDate startDate, 
                                               @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(e.amount) FROM ExpenseEntity e " +
           "WHERE e.date >= :startDate AND e.date <= :endDate")
    BigDecimal getTotalExpensesBetweenDates(@Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
    
    @Query("SELECT e.category FROM ExpenseEntity e " +
           "GROUP BY e.category ORDER BY SUM(e.amount) DESC LIMIT 1")
    Optional<String> getTopCategory();
    
    @Query("SELECT e FROM ExpenseEntity e WHERE e.createdAt >= :since")
    List<ExpenseEntity> findExpensesCreatedAfter(@Param("since") LocalDateTime since);
    
    boolean existsByDateAndCategoryAndDescription(LocalDate date, String category, String description);
    
    @Query("SELECT e FROM ExpenseEntity e WHERE " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ExpenseEntity> searchExpenses(@Param("keyword") String keyword);
}
