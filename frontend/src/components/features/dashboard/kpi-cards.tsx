"use client"

import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useExpenseStore } from "@/store/expense-store"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, DollarSign, Calendar, Tag, ArrowUp, ArrowDown } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function KpiCards() {
  const stats = useExpenseStore((state) => state.dashboardStats)

  const kpiData = [
    {
      title: "Total Expenses",
      value: formatCurrency(stats.totalExpenses),
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      trend: "up",
      trendValue: "+12%",
    },
    {
      title: "Monthly Spending",
      value: formatCurrency(stats.monthlySpending),
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      trend: "down",
      trendValue: "-8%",
    },
    {
      title: "Average Daily Spend",
      value: formatCurrency(stats.averageDailySpend),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      trend: "up",
      trendValue: "+5%",
    },
    {
      title: "Top Category",
      value: stats.topCategory,
      icon: Tag,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      trend: "neutral",
      trendValue: "Food",
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {kpiData.map((kpi, index) => (
        <motion.div key={kpi.title} variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor} transition-transform duration-200 hover:scale-110`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                {kpi.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                {kpi.trend === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-green-500' : 
                  kpi.trend === 'down' ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {kpi.trendValue}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
