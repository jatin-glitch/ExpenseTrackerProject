'use client'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const actions = [
  { key: '/', label: 'Go to Dashboard' },
  { key: '/add-expense', label: 'Add Expense' },
  { key: '/expenses', label: 'View Expenses' },
  { key: '/insights', label: 'View Insights' },
  { key: '/data-management', label: 'Data Management' },
]

export default function CommandPalette(){
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(()=>{
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30" onClick={()=>setOpen(false)}>
      <div className="w-full max-w-xl rounded-xl bg-[var(--surface)] p-4" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-2">
          <Search size={16} />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Type a command..." className="w-full p-2 bg-transparent outline-none" />
        </div>
        <ul className="space-y-1 max-h-72 overflow-y-auto">
          {filtered.map(item => (
            <li key={item.key} className="cursor-pointer rounded-lg px-3 py-2 hover:bg-slate-100" onClick={()=>{router.push(item.key); setOpen(false)}}>
              {item.label}
            </li>
          ))}
          {filtered.length === 0 && <li className="text-sm text-slate-500">No commands found</li>}
        </ul>
      </div>
    </div>
  )
}
