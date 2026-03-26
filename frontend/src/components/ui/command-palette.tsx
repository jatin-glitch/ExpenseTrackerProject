"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command } from "cmdk"
import { Modal, ModalContent } from "@/components/ui/modal"
import { useToast } from "@/components/ui/use-toast"
import { useExpenseStore } from "@/store/expense-store"
import { useRouter } from "next/navigation"
import { 
  Search, 
  Plus, 
  FileText, 
  TrendingUp, 
  Download, 
  Settings, 
  Moon, 
  Sun,
  LayoutDashboard,
  Receipt,
  Calculator
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  action: () => void
  keywords?: string[]
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const addExpense = useExpenseStore((state) => state.addExpense)
  const { setTheme, theme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: CommandItem[] = [
    {
      id: "dashboard",
      title: "Go to Dashboard",
      description: "View your expense overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
      action: () => router.push("/"),
      keywords: ["home", "overview", "main"]
    },
    {
      id: "expenses",
      title: "Manage Expenses",
      description: "View and edit your expenses",
      icon: <Receipt className="h-4 w-4" />,
      action: () => router.push("/expenses"),
      keywords: ["transactions", "spending", "records"]
    },
    {
      id: "analytics",
      title: "View Analytics",
      description: "See spending patterns and insights",
      icon: <TrendingUp className="h-4 w-4" />,
      action: () => router.push("/analytics"),
      keywords: ["charts", "reports", "insights", "statistics"]
    },
    {
      id: "import-export",
      title: "Import/Export Data",
      description: "Manage your expense data",
      icon: <Download className="h-4 w-4" />,
      action: () => router.push("/import-export"),
      keywords: ["backup", "data", "csv", "json"]
    },
    {
      id: "add-expense",
      title: "Add New Expense",
      description: "Quickly add a new expense",
      icon: <Plus className="h-4 w-4" />,
      action: () => {
        router.push("/expenses")
        toast({
          title: "Ready to add expense",
          description: "Click the 'Add Expense' button to get started",
        })
      },
      keywords: ["new", "create", "add", "spend"]
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure your preferences",
      icon: <Settings className="h-4 w-4" />,
      action: () => router.push("/settings"),
      keywords: ["preferences", "config", "options"]
    },
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between light and dark mode",
      icon: theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark")
        toast({
          title: "Theme changed",
          description: `Switched to ${theme === "dark" ? "light" : "dark"} mode`,
        })
      },
      keywords: ["theme", "dark", "light", "mode"]
    },
    {
      id: "calculator",
      title: "Quick Calculator",
      description: "Open a simple calculator",
      icon: <Calculator className="h-4 w-4" />,
      action: () => {
        toast({
          title: "Calculator",
          description: "Calculator feature coming soon!",
        })
      },
      keywords: ["calc", "math", "calculate", "sum"]
    }
  ]

  const filteredCommands = commands.filter(command => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
    )
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  }

  return (
    <>
      <Button
        variant="ghost"
        className="relative h-8 w-full justify-start rounded-lg bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search...
        <kbd className="absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <AnimatePresence>
        {open && (
          <Modal open={open} onOpenChange={setOpen}>
            <ModalContent className="overflow-hidden p-0 shadow-2xl md:max-w-2xl">
              <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                <Command className="rounded-xl border bg-background shadow-md">
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Command.Input
                      ref={inputRef}
                      placeholder="Type a command or search..."
                      value={search}
                      onValueChange={setSearch}
                      className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <Command.List className="max-h-[450px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                      No commands found.
                    </Command.Empty>
                    
                    {filteredCommands.map((command) => (
                      <Command.Item
                        key={command.id}
                        onSelect={() => {
                          command.action()
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
                          {command.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{command.title}</div>
                          {command.description && (
                            <div className="text-xs text-muted-foreground">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </Command.Item>
                    ))}
                  </Command.List>
                </Command>
              </motion.div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
