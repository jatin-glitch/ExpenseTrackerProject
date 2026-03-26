"use client"
import { useState } from 'react'
import { Search, Bell } from 'lucide-react'

export default function Navbar(){
  const [q, setQ] = useState('')

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search expenses..." className="pl-9 pr-3 py-2 rounded-lg border bg-gray-50 text-sm w-72" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100"><Bell /></button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
          <div className="text-sm">Demo User</div>
        </div>
      </div>
    </header>
  )
}
