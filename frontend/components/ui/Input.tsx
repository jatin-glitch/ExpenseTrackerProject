import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className="block space-y-1 text-sm">
      {label && <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>}
      <input className={clsx('w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:ring-2 focus:ring-brand/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white', className)} {...props} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
