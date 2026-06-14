import { TrendingUp, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import type { WeekImpact } from '../types'

interface WeekImpactCardProps {
  impact: WeekImpact
}

export default function WeekImpactCard({ impact }: WeekImpactCardProps) {
  const doneCount = impact.deliverables.filter((d) => d.done).length
  const totalCount = impact.deliverables.length
  const progressPercent =
    totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl border-l-4 border-l-emerald-500">
      <div className="card-body p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-base-content">
            Resumen del plan
          </h3>
        </div>

        {/* Hero metric */}
        <div className="flex items-center justify-center gap-3 py-3 px-3 rounded-2xl bg-gradient-to-r from-base-200/80 to-emerald-50 mb-3">
          <div className="text-center">
            <span className="text-2xl font-extrabold text-base-content">
              {impact.currentMatch}%
            </span>
            <p className="text-[10px] text-base-content/45 font-semibold mt-0.5">
              Actual
            </p>
          </div>

          <div className="flex flex-col items-center px-2">
            <ArrowRight className="h-4 w-4 text-emerald-500" />
          </div>

          <div className="text-center">
            <span className="text-2xl font-extrabold text-emerald-500">
              {impact.projectedMatch}%
            </span>
            <p className="text-[10px] text-emerald-600/70 font-semibold mt-0.5">
              Proyectado
            </p>
          </div>
        </div>

        {/* Motivational text */}
        <p className="text-xs text-base-content/60 leading-relaxed mb-4">
          Al completar este plan, tu compatibilidad con{' '}
          <span className="font-semibold text-base-content">
            {impact.targetCompany}
          </span>{' '}
          subirá de{' '}
          <span className="font-semibold">{impact.currentMatch}%</span> a{' '}
          <span className="font-semibold text-emerald-600">
            {impact.projectedMatch}%
          </span>
          .
        </p>

        {/* Deliverables checklist */}
        <div className="flex flex-col gap-2 mb-4">
          {impact.deliverables.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-base-300 flex-shrink-0" />
              )}
              <span
                className={`text-xs leading-snug ${
                  item.done
                    ? 'text-base-content/40 line-through font-normal'
                    : 'text-base-content/80 font-medium'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider">
              Avance del plan
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {doneCount}/{totalCount}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-base-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
