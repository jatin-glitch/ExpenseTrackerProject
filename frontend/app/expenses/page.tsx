"use client"
import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useExpenseStore } from '@/store/useExpenseStore'
import { Expense } from '@/lib/types'

const columns = ['Date', 'Category', 'Amount', 'Description']

export default function ExpensesPage(){
  const expenses = useExpenseStore(state => state.expenses)
  const deleteExpense = useExpenseStore(state => state.deleteExpense)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'date'|'amount'>('date')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    let list = expenses
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(exp => exp.description.toLowerCase().includes(q) || exp.category.toLowerCase().includes(q) || exp.date.includes(q))
    }
    if (sort === 'amount') list = [...list].sort((a,b)=>b.amount-a.amount)
    else list = [...list].sort((a,b)=>a.date.localeCompare(b.date))
    return list
  }, [expenses, search, sort])

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  const deleteSelected = () => {
    selected.forEach(id => deleteExpense(id))
    setSelected([])
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="rounded-xl border border-slate-300 px-3 py-2 w-60" />
        <select value={sort} onChange={e=>setSort(e.target.value as 'date'|'amount')} className="rounded-xl border border-slate-300 px-3 py-2">
          <option value="date">Sort by date</option>
          <option value="amount">Sort by amount</option>
        </select>
        <Button variant="secondary" onClick={deleteSelected} disabled={selected.length === 0}>Delete Selected</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-3 py-2"><input type="checkbox" checked={selected.length===expenses.length && expenses.length>0} onChange={e=>setSelected(e.target.checked ? expenses.map(exp=>exp.id) : [])} /></th>
                {columns.map(col => <th key={col} className="px-3 py-2">{col}</th>)}
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center text-slate-500">No expenses added yet</td></tr>
              ) : filtered.map((exp: Expense) => (
                <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-3 py-2"><input type="checkbox" checked={selected.includes(exp.id)} onChange={()=>toggleSelect(exp.id)} /></td>
                  <td className="px-3 py-2">{exp.date}</td>
                  <td className="px-3 py-2">{exp.category}</td>
                  <td className="px-3 py-2">${exp.amount.toFixed(2)}</td>
                  <td className="px-3 py-2">{exp.description}</td>
                  <td className="px-3 py-2">
                    <Button variant="ghost" onClick={() => deleteExpense(exp.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
