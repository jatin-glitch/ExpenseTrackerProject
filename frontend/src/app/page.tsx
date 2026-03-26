import { Layout } from "@/components/layout/layout"
import { KpiCards } from "@/components/features/dashboard/kpi-cards"
import { Charts } from "@/components/features/dashboard/charts"
import { RecentTransactions } from "@/components/features/dashboard/recent-transactions"

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your expenses and monitor your spending patterns.
          </p>
        </div>
        
        <KpiCards />
        <Charts />
        <RecentTransactions />
      </div>
    </Layout>
  )
}
