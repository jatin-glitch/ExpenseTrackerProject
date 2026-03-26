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

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-foreground">
                ExpenseTracker
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
