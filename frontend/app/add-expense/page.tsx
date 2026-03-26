"use client"
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useExpenseStore } from '@/store/useExpenseStore'
import type { Category } from '@/lib/types'

const categories: Category[] = ['Food', 'Transport', 'Bills', 'Shopping', 'Other']

export default function AddExpensePage() {
  const addExpense = useExpenseStore(state => state.addExpense)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [category, setCategory] = useState<Category>('Food')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !amount || Number(amount) <= 0) return
    addExpense({ date, category, amount: Number(amount), description })
    setModalOpen(true)
    setTimeout(() => setModalOpen(false), 1100)
    setDate(new Date().toISOString().slice(0, 10)); setAmount(''); setDescription('')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1500)
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Add Expense</h1>
      <Card>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <Select label="Category" value={category} onChange={e => setCategory(e.target.value as Category)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <Input label="Amount" type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
          <label className="block text-sm">
            <span className="text-sm text-slate-700 dark:text-slate-200">Description</span>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700 dark:bg-slate-800" rows={3} />
          </label>
          <Button type="submit" className="mt-2">Save Expense</Button>
        </form>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Success">
        Expense added successfully.
      </Modal>
      {showToast && (
        <div className="fixed right-4 bottom-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 shadow-lg">Expense saved successfully</div>
      )}
    </div>
  )
}
