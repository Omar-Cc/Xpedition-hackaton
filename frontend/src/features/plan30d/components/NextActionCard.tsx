import { Zap } from 'lucide-react'
import type { NextAction } from '../types'

interface NextActionCardProps {
  action: NextAction
}

export default function NextActionCard({ action }: NextActionCardProps) {
  return (
    <div className="relative rounded-2xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
          <Zap className="h-4 w-4 text-emerald-500" />
        </div>
        <h3 className="text-sm font-bold text-base-content">Siguiente mejor acción</h3>
      </div>

      {/* Action title */}
      <p className="text-base font-medium leading-snug text-base-content mb-2">
        {action.title}
      </p>

      {/* Reason */}
      <p className="text-sm text-base-content/55 mb-4 leading-relaxed">
        {action.reason}
      </p>

      {/* Impact + CTA row */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600">
          {action.impact}
        </span>
        <button className="btn btn-outline btn-sm rounded-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-colors duration-200 min-h-0 h-8 text-xs">
          Hacer ahora →
        </button>
      </div>
    </div>
  )
}
