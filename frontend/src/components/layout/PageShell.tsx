interface PageShellProps {
  children: React.ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  )
}
