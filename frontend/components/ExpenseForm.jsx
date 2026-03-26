"use client"
import { useState } from 'react'
import Button from './Button'
import useStore from '../store'

export default function ExpenseForm(){
  const addExpense = useStore(s => s.addExpense)
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Food')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { id: Date.now(), date, category, amount: Number(amount), description }
    // simple validation
    if(!date || !amount) { setLoading(false); return }
    await new Promise(r => setTimeout(r, 400))
    addExpense(payload)
    setDate(''); setAmount(''); setDescription('')
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 rounded-lg border" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 rounded-lg border">
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="p-2 rounded-lg border" />
      </div>

      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 rounded-lg border" />

      <div className="flex items-center gap-2">
        <Button variant="primary" type="submit">{loading ? 'Saving...' : 'Add Expense'}</Button>
      </div>
    </form>
  )
}
