interface PageHeaderProps {
  title: string
  subtitle: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export default function PageHeader({ title, subtitle, left, right }: PageHeaderProps) {
  return (
    <div className="bg-navy text-white px-8 py-5 flex items-center gap-6 flex-shrink-0">
      {left}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-tight">{title}</h1>
        <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  )
}
