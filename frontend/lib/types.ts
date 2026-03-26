export type Category = 'Food' | 'Transport' | 'Bills' | 'Shopping' | 'Other'

export interface Expense {
  id: string
  date: string
  category: Category
  amount: number
  description: string
}

export type SortKey = 'date' | 'amount'
