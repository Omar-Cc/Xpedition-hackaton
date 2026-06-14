'use client'

import { AlertTriangle, ShieldAlert, Clock, Sparkles } from 'lucide-react'

interface PlanStatusBarProps {
  duration: number
  currentMatch: number
  projectedMatch: number
  daysLeft: number
  deadlineDate: string
  position: string
  company: string
}

export default function PlanStatusBar({
  duration,
  currentMatch,
  projectedMatch,
  daysLeft,
  deadlineDate,
  position,
  company,
}: PlanStatusBarProps) {
  const isHighUrgency = daysLeft <= 7

  // Contextual "Enfoque recomendado" text based on urgency
  const recommendationText = isHighUrgency
    ? 'Enfócate en los "Quick Wins" de CV, completa la simulación de entrevista y envía tu postulación antes del cierre.'
    : 'Dedica tiempo a cerrar brechas técnicas (Python/SQL) y agenda una sesión de mentoría con egresados.'

  return (
    <div
      className={`card shadow-sm border transition-all duration-200 rounded-2xl ${
        isHighUrgency
          ? 'bg-rose-50/60 border-rose-200 text-rose-950'
          : 'bg-base-100 border-base-200 text-base-content'
      }`}
    >
      <div className="card-body p-4 md:p-5 space-y-3">
        {/* Upper row: Compact stats summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-dashed border-base-content/10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm font-bold">
            <span className="flex items-center gap-1.5 text-base-content/70">
              <Clock className="w-4 h-4 text-emerald-500" />
              Día 7 de {duration}
            </span>
            <span className="text-base-content/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-base-content">
              Match: <span className="text-base-content/60 font-semibold">{currentMatch}%</span>
              <span className="text-emerald-500">→</span>
              <span className="text-emerald-500 font-extrabold">{projectedMatch}%</span>
            </span>
            <span className="text-base-content/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              {isHighUrgency ? (
                <span className="text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-lg border border-rose-200 font-black animate-pulse">
                  Urgencia alta
                </span>
              ) : (
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-bold">
                  Urgencia baja
                </span>
              )}
            </span>
          </div>

          <div className="text-[11px] font-semibold text-base-content/60">
            Próximo hito: <span className="text-violet-600 font-bold">Simulación de entrevista</span>
          </div>
        </div>

        {/* Lower row: Recommended Focus nudge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed">
          <div className="flex items-start gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0 mt-0.5 sm:mt-0 ${
                isHighUrgency ? 'bg-rose-100 text-rose-600' : 'bg-base-200 text-base-content/60'
              }`}
            >
              {isHighUrgency ? (
                <ShieldAlert className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </div>
            <div>
              <span className="font-extrabold text-base-content">Enfoque recomendado:</span>{' '}
              <span className="text-base-content/85">{recommendationText}</span>
            </div>
          </div>

          {isHighUrgency && (
            <div className="flex-shrink-0 text-[10px] font-bold text-rose-600/80 bg-rose-100/40 px-2.5 py-1 rounded-lg border border-rose-200/50 self-end sm:self-auto">
              Límite: {deadlineDate} ({daysLeft} días)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
