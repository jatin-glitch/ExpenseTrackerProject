"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function FloatingThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary/90 backdrop-blur-sm hover:bg-primary border-2 border-primary/20"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-yellow-300" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-300" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
