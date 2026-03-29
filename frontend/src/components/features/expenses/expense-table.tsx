"use client"

import { useState, useMemo, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { useExpenseStore } from "@/store/expense-store"
import { formatDate, formatCurrency } from "@/lib/utils"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  ChevronDown,
  ChevronUp
} from "lucide-react"

type SortField = 'date' | 'category' | 'amount' | 'description'
type SortDirection = 'asc' | 'desc'

const ExpenseRow = memo(({ expense, index, allCategories, deleteExpense }: { 
  expense: any, 
  index: number, 
  allCategories: any[], 
  deleteExpense: (id: string) => void 
}) => {
  const getCategoryIcon = useCallback((categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.icon || '📦'
  }, [allCategories])

  const getCategoryColor = useCallback((categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.color || '#6b7280'
  }, [allCategories])

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.1) }}
      className="border-b hover:bg-muted/50 transition-colors"
    >
      <td className="p-4 align-middle">
        <div className="text-sm">
          {formatDate(expense.date)}
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
            style={{ backgroundColor: `${getCategoryColor(expense.category)}20` }}
          >
            {getCategoryIcon(expense.category)}
          </div>
          <span className="text-sm font-medium">{expense.category}</span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="text-sm">{expense.description}</div>
      </td>
      <td className="p-4 align-middle">
        <div className="text-sm font-semibold text-red-600">
          -{formatCurrency(expense.amount)}
        </div>
      </td>
      <td className="p-4 align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => deleteExpense(expense.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </motion.tr>
  )
})

ExpenseRow.displayName = 'ExpenseRow'

export function ExpenseTable() {
  const expenses = useExpenseStore((state) => state.expenses)
  const deleteExpense = useExpenseStore((state) => state.deleteExpense)
  const allCategories = useExpenseStore((state) => state.categories)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'date') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === 'amount') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      } else {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [expenses, searchTerm, selectedCategory, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getCategoryIcon = useCallback((categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.icon || '📦'
  }, [allCategories])

  const getCategoryColor = useCallback((categoryName: string) => {
    const category = allCategories.find(c => c.name === categoryName)
    return category?.color || '#6b7280'
  }, [allCategories])

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Expense Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                  All Categories
                </DropdownMenuItem>
                {allCategories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id} 
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon} {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort('date')}>
                    <div className="flex items-center space-x-2">
                      <span>Date</span>
                      <SortIcon field="date" />
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort('category')}>
                    <div className="flex items-center space-x-2">
                      <span>Category</span>
                      <SortIcon field="category" />
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort('description')}>
                    <div className="flex items-center space-x-2">
                      <span>Description</span>
                      <SortIcon field="description" />
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort('amount')}>
                    <div className="flex items-center space-x-2">
                      <span>Amount</span>
                      <SortIcon field="amount" />
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p>No expenses found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedExpenses.map((expense, index) => (
                    <ExpenseRow 
                      key={expense.id}
                      expense={expense}
                      index={index}
                      allCategories={allCategories}
                      deleteExpense={deleteExpense}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {filteredAndSortedExpenses.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredAndSortedExpenses.length} of {expenses.length} expenses
          </div>
        )}
      </CardContent>
    </Card>
  )
}
