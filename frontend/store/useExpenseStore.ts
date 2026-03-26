import { create } from 'zustand'
import { Expense } from '@/lib/types'

interface ExpenseState {
  expenses: Expense[]
  loading: boolean
  setLoading: (loading: boolean) => void
  addExpense: (expense: Omit<Expense, 'id'>) => void
  updateExpense: (id: string, data: Partial<Omit<Expense, 'id'>>) => void
  deleteExpense: (id: string) => void
  clearExpenses: () => void
  importExpenses: (items: Expense[]) => void
}

const createInitialExpenses = (): Expense[] => [
  { id: '1', date: '2026-03-15', category: 'Food', amount: 32.4, description: 'Lunch at cafe' },
  { id: '2', date: '2026-03-14', category: 'Transport', amount: 12.0, description: 'Taxi ride' },
  { id: '3', date: '2026-03-12', category: 'Bills', amount: 88.15, description: 'Utilities' },
]

const localStorageKey = 'expense-tracker-data'

function getInitialState() {
  if (typeof window === 'undefined') return createInitialExpenses()
  try {
    const raw = localStorage.getItem(localStorageKey)
    if (!raw) return createInitialExpenses()
    const parsed = JSON.parse(raw) as Expense[]
    if (!Array.isArray(parsed)) return createInitialExpenses()
    return parsed
  } catch {
    return createInitialExpenses()
  }
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: getInitialState(),
  loading: false,
  setLoading: data => set({ loading: data }),
  addExpense: payload => {
    const expense = { id: crypto.randomUUID(), ...payload }
    set(state => ({ expenses: [expense, ...state.expenses] }))
    persist([...get().expenses, expense])
  },
  updateExpense: (id, data) => {
    set(state => {
      const expenses = state.expenses.map(exp => exp.id === id ? { ...exp, ...data } : exp)
      persist(expenses)
      return { expenses }
    })
  },
  deleteExpense: id => {
    set(state => {
      const expenses = state.expenses.filter(exp => exp.id !== id)
      persist(expenses)
      return { expenses }
    })
  },
  clearExpenses: () => {
    set({ expenses: [] })
    persist([])
  },
  importExpenses: (items) => {
    set({ expenses: items })
    persist(items)
  }
}))

function persist(items: Expense[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }
}
