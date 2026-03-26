export interface Expense {
  id: string
  date: string
  category: string
  amount: number
  description: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface DashboardStats {
  totalExpenses: number
  monthlySpending: number
  averageDailySpend: number
  topCategory: string
}

export interface MonthlyData {
  month: string
  amount: number
}

export interface CategoryData {
  category: string
  amount: number
  percentage: number
}

export type Theme = 'light' | 'dark'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
}
