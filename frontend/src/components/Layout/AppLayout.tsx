import type { ReactNode } from 'react'
import Header from './Header'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Real Estate Zoning Update Tool" />
      <main className="flex h-screen">
        {children}
      </main>
    </div>
  )
}