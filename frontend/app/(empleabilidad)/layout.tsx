import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'

export default function EmpleabilidadLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-bg-soft">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-50">
            <TopBanner />
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
