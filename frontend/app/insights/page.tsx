"use client"
import ExpenseCharts from '@/components/charts/ExpenseCharts'

export default function Insights(){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Analytics & Insights</h1>
      <ExpenseCharts />
    </div>
  )
}
