"use client"
import { useState, useMemo } from 'react'
import useStore from '../store'

export default function ExpenseTable(){
  const expenses = useStore(s => s.expenses)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('date')

  const filtered = useMemo(()=>{
    let list = expenses
    if(category !== 'All') list = list.filter(e => e.category === category)
    if(q) list = list.filter(e => [e.description, e.category, e.date].join(' ').toLowerCase().includes(q.toLowerCase()))
    if(sort === 'amount') list = [...list].sort((a,b)=>b.amount - a.amount)
    else list = [...list].sort((a,b)=> (b.date || 0) > (a.date || 0) ? 1 : -1)
    return list
  }, [expenses, q, category, sort])

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} className="p-2 rounded-lg border" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 rounded-lg border">
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="p-2 rounded-lg border">
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(exp => (
              <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm">{exp.date}</td>
                <td className="px-4 py-3 text-sm">{exp.category}</td>
                <td className="px-4 py-3 text-sm">${Number(exp.amount).toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">{exp.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
