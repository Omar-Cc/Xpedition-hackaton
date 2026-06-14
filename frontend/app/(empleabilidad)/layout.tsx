'use client'

import { useState } from 'react'
import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'

export default function EmpleabilidadLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-soft">
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-50">
            <TopBanner onMenuClick={() => setIsSidebarOpen(true)} />
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
