import { Expense, Category } from '@/lib/types'

export const categories: Category[] = ['Food', 'Transport', 'Bills', 'Shopping', 'Other']

export function getAggregates(expenses: Expense[]) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const daily = total / Math.max(1, new Set(expenses.map(x => x.date)).size)

  const byCategory = categories.map(category => ({
    category,
    value: expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0),
  }))

  const topCategory = byCategory.sort((a,b)=>b.value - a.value)[0]?.category || 'Other'

  const monthly = Array.from(new Set(expenses.map(e => e.date.slice(0,7)))).sort().map(month => ({
    month,
    value: expenses
      .filter(e => e.date.startsWith(month))
      .reduce((sum, e) => sum + e.amount, 0),
  }))

  return { total, daily, topCategory, byCategory, monthly }
}
