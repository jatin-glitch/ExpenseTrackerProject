import { Bell, Search, UserCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Navbar(){
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-[var(--surface)] border-b border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search expenses..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition"><Bell size={18} /></button>
        <button onClick={()=>setOpen(!open)} className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
          <UserCircle size={20} />
          <span className="hidden sm:inline">Acme Admin</span>
          <ChevronDown size={16} className={open ? 'rotate-180 transition' : 'transition'} />
        </button>
      </div>
    </header>
  )
}
