import './globals.css'
import MainLayout from '@/components/layout/MainLayout'

export const metadata = {
  title: 'Expense Tracker',
  description: 'Modern Expense Tracker UI',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps){
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
