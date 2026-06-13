interface PageShellProps {
  children: React.ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {children}
    </div>
  )
}
