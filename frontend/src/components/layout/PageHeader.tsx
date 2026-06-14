interface PageHeaderProps {
  title: string
  subtitle: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export default function PageHeader({ title, subtitle, left, right }: PageHeaderProps) {
  return (
    <div className="bg-navy text-white px-4 sm:px-6 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {left}
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold leading-tight truncate">{title}</h1>
          <p className="text-xs md:text-sm text-white/60 mt-0.5 whitespace-normal sm:truncate">{subtitle}</p>
        </div>
      </div>
      {right && (
        <div className="flex-shrink-0 w-full sm:w-auto overflow-x-auto sm:overflow-visible">
          {right}
        </div>
      )}
    </div>
  )
}
