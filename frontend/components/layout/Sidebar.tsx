import Link from 'next/link'
import { useState } from 'react'
import { Home, PlusSquare, List, PieChart, Upload, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/layout/ThemeContext'

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/add-expense', label: 'Add Expense', icon: PlusSquare },
  { href: '/expenses', label: 'Expenses', icon: List },
  { href: '/insights', label: 'Insights', icon: PieChart },
  { href: '/data-management', label: 'Data', icon: Upload },
]

export default function Sidebar(){
  const [collapsed, setCollapsed] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className={`transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} min-h-screen border-r border-slate-200 dark:border-slate-700 bg-[var(--surface)] p-4`}> 
      <div className="flex items-center justify-between mb-8">
        <span className={`font-semibold text-lg ${collapsed ? 'hidden' : 'block'}`} >Expense SaaS</span>
        <button onClick={() => setCollapsed(!collapsed)} className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-slate-700">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="space-y-2">
        {links.map(link=>{
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition">
              <Icon size={18} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button onClick={toggleTheme} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm border border-slate-200 dark:border-slate-700">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} 
          {!collapsed && <span>Theme</span>}
        </button>
      </div>
    </aside>
  )
}
