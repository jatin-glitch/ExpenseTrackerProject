'use client'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { ThemeProvider } from './ThemeContext'
import PageTransition from '../ui/PageTransition'
import CommandPalette from '@/components/ui/CommandPalette'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <CommandPalette />
      <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-4 md:p-6 lg:p-8">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
