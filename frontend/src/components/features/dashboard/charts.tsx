"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"
import { formatCurrency } from "@/lib/utils"

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const COLORS = ['#3b82f6', '#ef4444', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#6b7280']

export function Charts() {
  const monthlyData = useExpenseStore((state) => state.monthlyData)
  const categoryData = useExpenseStore((state) => state.categoryData)
  const categories = useExpenseStore((state) => state.categories)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
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
        <div className="bg-background border rounded-lg p-2 shadow-lg">
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <motion.div variants={chartVariants} initial="hidden" animate="visible">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
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
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
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
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `${percentage.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
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
    </div>
  )
}
