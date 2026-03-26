"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useExpenseStore } from "@/store/expense-store"
import { Upload, Download, FileText, CheckCircle, AlertCircle } from "lucide-react"

export function ImportExportPanel() {
  const expenses = useExpenseStore((state) => state.expenses)
  const addExpense = useExpenseStore((state) => state.addExpense)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importMessage, setImportMessage] = useState('')

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate export delay
      
      const dataStr = JSON.stringify(expenses, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportStatus('idle')

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid file format')
      }

      let importedCount = 0
      let skippedCount = 0

      for (const item of data) {
        if (item.date && item.category && item.amount && item.description) {
          addExpense({
            date: item.date,
            category: item.category,
            amount: parseFloat(item.amount),
            description: item.description,
          })
          importedCount++
        } else {
          skippedCount++
        }
      }

      setImportStatus('success')
      setImportMessage(`Successfully imported ${importedCount} expenses${skippedCount > 0 ? ` (skipped ${skippedCount} invalid entries)` : ''}`)
    } catch (error) {
      setImportStatus('error')
      setImportMessage('Failed to import file. Please check the file format.')
      console.error('Import failed:', error)
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleExportCSV = async () => {
    setIsExporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const headers = ['Date', 'Category', 'Amount', 'Description']
      const csvContent = [
        headers.join(','),
        ...expenses.map(expense => [
          expense.date,
          expense.category,
          expense.amount,
          `"${expense.description.replace(/"/g, '""')}"`
        ].join(','))
      ].join('\n')
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('CSV export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const dropZoneVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const statusVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Import & Export</h2>
        <p className="text-muted-foreground">
          Manage your expense data by importing from files or exporting your records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={dropZoneVariants} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Import Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Drop your JSON file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JSON files with date, category, amount, and description fields
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                >
                  {isImporting ? 'Importing...' : 'Choose File'}
                </Button>
              </div>

              {importStatus !== 'idle' && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    importStatus === 'success' 
                      ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' 
                      : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
                  }`}
                >
                  {importStatus === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{importMessage}</span>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={dropZoneVariants} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Export Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Export as JSON</h4>
                      <p className="text-sm text-muted-foreground">
                        Export all your expenses in JSON format for backup or migration
                      </p>
                    </div>
                    <Button
                      onClick={handleExport}
                      disabled={isExporting || expenses.length === 0}
                    >
                      {isExporting ? 'Exporting...' : 'Export JSON'}
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Export as CSV</h4>
                      <p className="text-sm text-muted-foreground">
                        Export your expenses as a CSV file for spreadsheet applications
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleExportCSV}
                      disabled={isExporting || expenses.length === 0}
                    >
                      {isExporting ? 'Exporting...' : 'Export CSV'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground text-center">
                {expenses.length > 0 
                  ? `Ready to export ${expenses.length} expenses`
                  : 'No expenses to export'
                }
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
