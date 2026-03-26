"use client"

import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className={cn(
          "flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6",
          className
        )}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
