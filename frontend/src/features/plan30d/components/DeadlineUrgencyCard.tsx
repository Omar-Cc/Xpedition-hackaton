'use client'

import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react'

interface DeadlineUrgencyCardProps {
  daysLeft: number
  position: string
  company: string
}

export default function DeadlineUrgencyCard({
  daysLeft,
  position,
  company,
}: DeadlineUrgencyCardProps) {
  const isHighUrgency = daysLeft <= 7

  return (
    <div
      className={`card shadow-sm border-2 rounded-2xl transition-all duration-200 ${
        isHighUrgency
          ? 'bg-rose-50/50 border-rose-200 text-rose-950'
          : 'bg-base-100 border-base-200 text-base-content'
      }`}
    >
      <div className="card-body p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isHighUrgency ? 'bg-rose-100 text-rose-600' : 'bg-base-200 text-base-content/60'
            }`}
          >
            {isHighUrgency ? (
              <ShieldAlert className="h-4.5 w-4.5" />
            ) : (
              <Clock className="h-4.5 w-4.5" />
            )}
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Fecha límite / Urgencia
          </h3>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="text-sm font-extrabold">
            {isHighUrgency ? (
              <span>
                ¡Urgencia alta! Faltan{' '}
                <span className="text-rose-600 underline font-black">{daysLeft} días</span>
              </span>
            ) : (
              <span>Quedan {daysLeft} días para postular</span>
            )}
          </p>
          <p className="text-xs text-base-content/60 leading-relaxed">
            La oferta para <span className="font-semibold">{position}</span> en{' '}
            <span className="font-semibold">{company}</span> cierra pronto.
          </p>
        </div>

        {/* Priority nudge */}
        <div
          className={`p-3 rounded-xl text-[11px] leading-relaxed border ${
            isHighUrgency
              ? 'bg-rose-100/30 border-rose-200/50'
              : 'bg-base-200/40 border-base-300/40 text-base-content/70'
          }`}
        >
          <div className="flex gap-2">
            <AlertTriangle className={`w-4 h-4 shrink-0 ${isHighUrgency ? 'text-rose-600' : 'text-base-content/50'}`} />
            <div>
              <span className="font-bold">Prioridad recomendada:</span>{' '}
              {isHighUrgency
                ? 'Enfócate en los "Quick Wins" de CV, completa la simulación de entrevista y envía tu postulación antes del cierre.'
                : 'Dedica tiempo a cerrar brechas técnicas (Python/SQL) y agenda una sesión de mentoría con egresados.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
