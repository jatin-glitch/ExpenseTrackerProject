import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps){
  return (
    <div className={clsx('card p-5', className)}>
      {children}
    </div>
  )
}
