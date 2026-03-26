"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import useStore from '../store'

const COLORS = ['#60a5fa','#f97316','#34d399','#f472b6','#a78bfa']

export default function Charts(){
  const expenses = useStore(s => s.expenses)
  const byCategory = expenses.reduce((acc,e)=>{ acc[e.category] = (acc[e.category]||0) + Number(e.amount||0); return acc }, {})
  const pieData = Object.entries(byCategory).map(([k,v])=>({ name:k, value: v }))
  const barData = Object.entries(byCategory).map(([k,v])=>({ name:k, value: v }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card h-64">
        <h3 className="text-sm font-medium mb-2">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={30} paddingAngle={3}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card h-64">
        <h3 className="text-sm font-medium mb-2">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
