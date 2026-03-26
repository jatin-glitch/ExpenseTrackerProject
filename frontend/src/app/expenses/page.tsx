import { Layout } from "@/components/layout/layout"
import { ExpenseTable } from "@/components/features/expenses/expense-table"
import { ExpenseForm } from "@/components/features/expenses/expense-form"

export default function ExpensesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">
              Manage and track all your expenses in one place.
            </p>
          </div>
          <ExpenseForm />
        </div>
        
        <ExpenseTable />
      </div>
    </Layout>
  )
}
