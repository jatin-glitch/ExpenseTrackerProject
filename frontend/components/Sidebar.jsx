"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Home, PlusSquare, List, PieChart, Download, UploadCloud } from 'lucide-react'

export default function Sidebar(){
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`h-screen ${collapsed ? 'w-20' : 'w-72'} bg-white border-r p-4 hidden md:block`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-lg font-semibold ${collapsed ? 'hidden' : 'block'}`}>Expense</h2>
        <button onClick={()=>setCollapsed(!collapsed)} className="text-sm text-gray-500">{collapsed ? '>' : '<'}</button>
      </div>

      <nav className="space-y-2">
        <NavItem href="/" icon={<Home />} label="Dashboard" collapsed={collapsed} />
        <NavItem href="/add-expense" icon={<PlusSquare />} label="Add Expense" collapsed={collapsed} />
        <NavItem href="/expenses" icon={<List />} label="All Expenses" collapsed={collapsed} />
        <NavItem href="/insights" icon={<PieChart />} label="Insights" collapsed={collapsed} />
      </nav>

      <div className="mt-6 pt-6 border-t">
        <NavItem href="#" icon={<Download />} label="Save" collapsed={collapsed} />
        <NavItem href="#" icon={<UploadCloud />} label="Load" collapsed={collapsed} />
      </div>
    </aside>
  )
}

function NavItem({ href, icon, label, collapsed }){
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
      <div className="text-gray-600">{icon}</div>
      <span className={`${collapsed ? 'hidden' : 'block'} text-sm`}>{label}</span>
    </Link>
  )
}
