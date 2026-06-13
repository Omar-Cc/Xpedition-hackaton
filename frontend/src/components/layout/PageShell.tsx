import Sidebar from './Sidebar'

interface PageShellProps {
  children: React.ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-soft">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
