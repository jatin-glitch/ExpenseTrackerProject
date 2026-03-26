"use client"
import create from 'zustand'

const useStore = create((set, get) => ({
  expenses: [],
  addExpense: (expense) => set(state => ({ expenses: [expense, ...state.expenses] })),
  clear: () => set({ expenses: [] }),
  loadFromJson: (arr) => set({ expenses: arr }),
  getSummary: () => {
    const expenses = get().expenses
    const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0)
    const byCategory = expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category]||0) + Number(e.amount||0); return acc }, {})
    return { total, byCategory }
  }
}))

export default useStore
