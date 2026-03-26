export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-24 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-24 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}
