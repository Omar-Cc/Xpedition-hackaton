import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string | React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  maxWidthClassName?: string
  titleClassName?: string
}

export default function PageHeader({
  title,
  subtitle,
  left,
  right,
  maxWidthClassName = 'max-w-7xl',
  titleClassName
}: PageHeaderProps) {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-2 flex-shrink-0 ${maxWidthClassName}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy text-white p-5 md:p-6 rounded-2xl shadow-sm border border-white/5">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {left}
          <div className="min-w-0">
            <h1 className={titleClassName ?? "text-xl md:text-2xl font-bold tracking-tight transition-all duration-200 truncate"}>{title}</h1>
            {typeof subtitle === 'string' ? (
              <p className="text-xs md:text-sm text-white/60 font-medium mt-1 whitespace-normal sm:truncate">{subtitle}</p>
            ) : (
              subtitle
            )}
          </div>
        </div>
        {right && (
          <div className="flex-shrink-0 w-full md:w-auto overflow-x-auto md:overflow-visible">
            {right}
          </div>
        )}
      </div>
    </div>
  )
}

