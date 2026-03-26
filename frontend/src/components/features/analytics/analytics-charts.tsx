"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExpenseStore } from "@/store/expense-store"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import { Calendar, TrendingUp, PieChartIcon, BarChart3 } from "lucide-react"

const COLORS = ['#3b82f6', '#ef4444', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#6b7280']

type DateRange = '7d' | '30d' | '90d' | '1y' | 'all'

export function AnalyticsCharts() {
  const expenses = useExpenseStore((state) => state.expenses)
  const categories = useExpenseStore((state) => state.categories)
  const monthlyData = useExpenseStore((state) => state.monthlyData)
  const categoryData = useExpenseStore((state) => state.categoryData)
  const [dateRange, setDateRange] = useState<DateRange>('30d')

  const filteredExpenses = useMemo(() => {
    const now = new Date()
    const filterDate = new Date()

    switch (dateRange) {
      case '7d':
        filterDate.setDate(now.getDate() - 7)
        break
      case '30d':
        filterDate.setDate(now.getDate() - 30)
        break
      case '90d':
        filterDate.setDate(now.getDate() - 90)
        break
      case '1y':
        filterDate.setFullYear(now.getFullYear() - 1)
        break
      case 'all':
        return expenses
      default:
        return expenses
    }

    return expenses.filter(expense => new Date(expense.date) >= filterDate)
  }, [expenses, dateRange])

  const monthlyTrendData = useMemo(() => {
    const monthlyData = filteredExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date)
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      acc[monthKey] = (acc[monthKey] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(monthlyData)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        const dateA = new Date(a.month)
        const dateB = new Date(b.month)
        return dateA.getTime() - dateB.getTime()
      })
  }, [filteredExpenses])

  const categoryBreakdownData = useMemo(() => {
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    })).sort((a, b) => b.amount - a.amount)
  }, [filteredExpenses])

  const dailySpendingData = useMemo(() => {
    const dailyData = filteredExpenses.reduce((acc, expense) => {
      const dateKey = new Date(expense.date).toISOString().split('T')[0]
      acc[dateKey] = (acc[dateKey] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(dailyData)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Last 30 days
  }, [filteredExpenses])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.percentage.toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={dateRange} onValueChange={(value: DateRange) => setDateRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={chartVariants} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={chartVariants} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5" />
                <span>Category Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage.toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryBreakdownData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={categories.find(c => c.name === entry.category)?.color || COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend 
                    verticalAlign="middle" 
                    align="right" 
                    layout="vertical"
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={chartVariants} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Daily Spending Pattern</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySpendingData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        variants={chartVariants} 
        initial="hidden" 
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Category Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryBreakdownData.slice(0, 6).map((category, index) => {
                const categoryInfo = categories.find(c => c.name === category.category)
                return (
                  <div key={category.category} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${categoryInfo?.color || COLORS[index]}20` }}
                    >
                      {categoryInfo?.icon || '📦'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{category.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(category.amount)} ({category.percentage.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
