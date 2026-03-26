import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Expense, Category, DashboardStats } from '@/types'

interface ExpenseStore {
  expenses: Expense[]
  categories: Category[]
  dashboardStats: DashboardStats
  monthlyData: { month: string; amount: number }[]
  categoryData: { category: string; amount: number; percentage: number }[]
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#ef4444', icon: '🍔' },
  { id: '2', name: 'Transportation', color: '#3b82f6', icon: '🚗' },
  { id: '3', name: 'Shopping', color: '#8b5cf6', icon: '🛍️' },
  { id: '4', name: 'Entertainment', color: '#f59e0b', icon: '🎬' },
  { id: '5', name: 'Bills & Utilities', color: '#10b981', icon: '💡' },
  { id: '6', name: 'Healthcare', color: '#ec4899', icon: '🏥' },
  { id: '7', name: 'Other', color: '#6b7280', icon: '📦' },
]

const sampleExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-01-15',
    category: 'Food & Dining',
    amount: 45.50,
    description: 'Lunch at restaurant',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '2',
    date: '2024-01-14',
    category: 'Transportation',
    amount: 25.00,
    description: 'Gas refill',
    createdAt: '2024-01-14T08:00:00Z',
    updatedAt: '2024-01-14T08:00:00Z',
  },
  {
    id: '3',
    date: '2024-01-13',
    category: 'Shopping',
    amount: 120.00,
    description: 'New shoes',
    createdAt: '2024-01-13T15:00:00Z',
    updatedAt: '2024-01-13T15:00:00Z',
  },
  {
    id: '4',
    date: '2024-01-12',
    category: 'Entertainment',
    amount: 35.00,
    description: 'Movie tickets',
    createdAt: '2024-01-12T19:00:00Z',
    updatedAt: '2024-01-12T19:00:00Z',
  },
  {
    id: '5',
    date: '2024-01-11',
    category: 'Bills & Utilities',
    amount: 150.00,
    description: 'Electric bill',
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z',
  },
]

const calculateDashboardStats = (expenses: Expense[]): DashboardStats => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyExpenses = expenses.filter(
    (expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    }
  )
  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const averageDailySpend = monthlySpending / daysInMonth
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
  
  const topCategory = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
    { category: 'None', amount: 0 }
  ).category
  
  return {
    totalExpenses,
    monthlySpending,
    averageDailySpend,
    topCategory,
  }
}

const calculateMonthlyData = (expenses: Expense[]): { month: string; amount: number }[] => {
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date)
    const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    acc[monthKey] = (acc[monthKey] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  })).sort((a, b) => {
    const dateA = new Date(a.month)
    const dateB = new Date(b.month)
    return dateA.getTime() - dateB.getTime()
  })
}

const calculateCategoryData = (expenses: Expense[]): { category: string; amount: number; percentage: number }[] => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: total > 0 ? (amount / total) * 100 : 0,
  })).sort((a, b) => b.amount - a.amount)
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: sampleExpenses,
      categories: defaultCategories,
      dashboardStats: calculateDashboardStats(sampleExpenses),
      monthlyData: calculateMonthlyData(sampleExpenses),
      categoryData: calculateCategoryData(sampleExpenses),
      
      addExpense: (expense) => {
        const newExpense: Expense = {
          ...expense,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const newExpenses = [newExpense, ...get().expenses]
        set((state) => ({
          expenses: newExpenses,
          dashboardStats: calculateDashboardStats(newExpenses),
          monthlyData: calculateMonthlyData(newExpenses),
          categoryData: calculateCategoryData(newExpenses),
        }))
      },
      
      updateExpense: (id, updatedExpense) => {
        const newExpenses = get().expenses.map((expense) =>
          expense.id === id
            ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
            : expense
        )
        set((state) => ({
          expenses: newExpenses,
          dashboardStats: calculateDashboardStats(newExpenses),
          monthlyData: calculateMonthlyData(newExpenses),
          categoryData: calculateCategoryData(newExpenses),
        }))
      },
      
      deleteExpense: (id) => {
        const newExpenses = get().expenses.filter((expense) => expense.id !== id)
        set((state) => ({
          expenses: newExpenses,
          dashboardStats: calculateDashboardStats(newExpenses),
          monthlyData: calculateMonthlyData(newExpenses),
          categoryData: calculateCategoryData(newExpenses),
        }))
      },
    }),
    {
      name: 'expense-storage',
    }
  )
)
