"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  Settings, 
  Download,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Import/Export", href: "/import-export", icon: Download },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "hidden md:flex flex-col h-full bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-foreground">
            ExpenseTracker
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto hidden md:flex"
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
