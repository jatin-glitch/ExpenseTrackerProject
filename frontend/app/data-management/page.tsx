"use client"
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useExpenseStore } from '@/store/useExpenseStore'
import { Expense } from '@/lib/types'

const sampleData: Expense[] = [
  { id: '101', date: '2026-03-12', category: 'Food', amount: 50, description: 'Sample import transaction' },
  { id: '102', date: '2026-03-13', category: 'Bills', amount: 90.5, description: 'Sample import transaction' },
]

export default function DataManagementPage() {
  const { importExpenses, expenses } = useExpenseStore(state => ({ importExpenses: state.importExpenses, expenses: state.expenses }))
  const [status, setStatus] = useState<string | null>(null)

  const exportData = () => {
    const blob = new Blob([JSON.stringify(expenses, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'expenses.json'
    link.click()
    setStatus('Exported data successfully')
    setTimeout(() => setStatus(null), 2000)
  }

  const importSample = () => {
    importExpenses(sampleData)
    setStatus('Imported sample data succesfully')
    setTimeout(() => setStatus(null), 2000)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Data Management</h1>
      <Card>
        <div className="space-y-3">
          <Button variant="secondary" onClick={exportData}>Export JSON</Button>
          <Button variant="secondary" onClick={importSample}>Import Sample JSON</Button>
          <p className="text-sm text-slate-500">Current entries: {expenses.length}</p>
          {status && <div className="rounded-lg bg-green-50 p-2 text-green-700 text-sm">{status}</div>}
        </div>
      </Card>
    </div>
  )
}
