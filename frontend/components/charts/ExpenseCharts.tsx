import { useMemo } from 'react'
import { useExpenseStore } from '@/store/useExpenseStore'
import { getAggregates } from '@/lib/analytics'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'

const colors = ['#4f46e5', '#f97316', '#10b981', '#ec4899', '#eab308']

export default function ExpenseCharts() {
  const expenses = useExpenseStore(state => state.expenses)
  const aggregates = useMemo(() => getAggregates(expenses), [expenses])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="text-sm font-semibold mb-3">Monthly Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregates.monthly}>
              <XAxis dataKey="month" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--primary)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3 className="text-sm font-semibold mb-3">Category Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={aggregates.byCategory} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {aggregates.byCategory.map((entry, idx) => (
                  <Cell key={entry.category} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
