import { Bell } from 'lucide-react'
import { studentProfile } from '@/src/features/dashboard/data/mock-data'

export default function TopBanner() {
  const firstName = studentProfile.name.split(' ')[0]
  const pct = studentProfile.completionPercent

  return (
    <div className="bg-navy text-white px-8 py-6 flex items-center gap-6">
      <div
        className="radial-progress text-white flex-shrink-0"
        style={
          {
            '--value': String(pct),
            '--size': '5rem',
            '--thickness': '5px',
          } as React.CSSProperties
        }
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        aria-label={`Perfil completado al ${pct}%`}
      >
        <span className="text-sm font-bold">{pct}%</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
          Bienvenido de vuelta
        </p>
        <h2 className="text-2xl font-bold mb-1">
          Hola, {firstName} 👋
        </h2>
        <p className="text-sm text-white/60 mb-3">
          Tu perfil está al {pct}% — complétalo para aumentar tu visibilidad
        </p>
        <button className="btn btn-sm border border-white/30 text-white bg-transparent hover:bg-white/10">
          Completar perfil
        </button>
      </div>

      <div className="indicator flex-shrink-0">
        <span className="indicator-item badge badge-error badge-xs p-0 min-w-2 min-h-2" />
        <button
          className="btn btn-ghost btn-sm p-2 text-white hover:bg-white/10"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
