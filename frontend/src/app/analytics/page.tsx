import { Layout } from "@/components/layout/layout"
import { AnalyticsCharts } from "@/components/features/analytics/analytics-charts"

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your spending patterns and financial insights.
          </p>
        </div>
        
        <AnalyticsCharts />
      </div>
    </Layout>
  )
}
