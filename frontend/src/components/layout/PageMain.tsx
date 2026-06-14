import type { ReactNode } from 'react'
import { cn } from '@/src/lib/utils'

type PageMainProps = {
  children: ReactNode
  className?: string
  maxWidth?: 'none' | '5xl' | '6xl' | '7xl'
}

const maxWidthClasses = {
  none: '',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

export default function PageMain({
  children,
  className,
  maxWidth = '7xl',
}: Readonly<PageMainProps>) {
  return (
    <main className="p-6">
      <div className={cn('mx-auto w-full', maxWidthClasses[maxWidth], className)}>
        {children}
      </div>
    </main>
  )
}