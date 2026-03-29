"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useExpenseStore } from "@/store/expense-store"
import { formatDate, formatCurrency } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function RecentTransactions() {
  const expenses = useExpenseStore((state) => state.expenses)
  const allCategories = useExpenseStore((state) => state.categories)

  const recentExpenses = expenses
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  const getCategoryIcon = (categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.icon || '📦'
  }

  const getCategoryColor = (categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.color || '#6b7280'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Add your first expense to get started!
              </div>
            ) : (
              recentExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  variants={itemVariants}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: `${getCategoryColor(expense.category)}20` }}
                    >
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {formatDate(expense.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      -{formatCurrency(expense.amount)}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
