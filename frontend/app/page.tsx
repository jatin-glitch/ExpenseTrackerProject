"use client"
import Link from 'next/link'
import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import ExpenseCharts from '@/components/charts/ExpenseCharts'
import { useExpenseStore } from '@/store/useExpenseStore'
import { getAggregates } from '@/lib/analytics'

export default function Dashboard() {
  const expenses = useExpenseStore(state => state.expenses)
  const { total, daily, topCategory } = useMemo(() => getAggregates(expenses), [expenses])
  const recent = useMemo(() => expenses.slice(0, 8), [expenses])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Total Expenses</p>
          <p className="mt-2 text-3xl font-semibold">${total.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Average Daily</p>
          <p className="mt-2 text-3xl font-semibold">${daily.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Top Category</p>
          <p className="mt-2 text-3xl font-semibold">{topCategory}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Transactions</p>
          <p className="mt-2 text-3xl font-semibold">{expenses.length}</p>
        </Card>
      </div>

      <ExpenseCharts />

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Link href="/expenses" className="text-sm text-brand">View all</Link>
        </div>
        <div className="space-y-2">
          {recent.length === 0 && (
            <Card className="text-center">No transactions yet. <Link href="/add-expense" className="text-brand">Add expense</Link></Card>
          )}
          {recent.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 rounded-xl border border-slate-200 bg-[var(--surface)] shadow-sm">
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-xs text-slate-500">{item.date} • {item.description}</p>
              </div>
              <div className="font-semibold">${item.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
