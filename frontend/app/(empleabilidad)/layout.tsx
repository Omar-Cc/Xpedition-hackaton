import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'

export default function EmpleabilidadLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-soft">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBanner />
        {children}
      </div>
    </div>
  )
}
