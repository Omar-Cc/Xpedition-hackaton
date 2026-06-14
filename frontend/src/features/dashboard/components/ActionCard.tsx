import Link from 'next/link'
import type { QuickAction } from '../types'

interface ActionCardProps {
  action: QuickAction
}

export default function ActionCard({ action }: ActionCardProps) {
  const Icon = action.icon
  return (
    <Link href={action.href} className="block h-full">
      <div className={`card ${action.bgColorClass} hover:shadow-md transition-shadow h-full`}>
        <div className="card-body p-4 flex flex-row items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/60 ${action.iconColorClass} shrink-0`}>
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base-content text-xs leading-tight">{action.title}</h3>
            <p className="text-[10px] text-base-content/60 truncate leading-normal mt-0.5">{action.description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
