import Sidebar from './Sidebar'

interface PageShellProps {
  children: React.ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-bg-soft">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
