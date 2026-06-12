import Link from 'next/link'
import type { QuickAction } from '../types'

interface ActionCardProps {
  action: QuickAction
}

export default function ActionCard({ action }: ActionCardProps) {
  const Icon = action.icon
  return (
    <Link href={action.href} className="block h-full">
      <div className={`card ${action.bgColorClass} hover:shadow-lg transition-shadow h-full`}>
        <div className="card-body p-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/60 ${action.iconColorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-base-content mt-3 text-sm">{action.title}</h3>
          <p className="text-xs text-base-content/60">{action.description}</p>
        </div>
      </div>
    </Link>
  )
}
