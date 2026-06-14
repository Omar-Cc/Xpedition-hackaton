import { ChevronRight } from 'lucide-react'
import { courseMatches } from '../data/mock-data'

const statusBadge = {
  covered: <span className="badge badge-success badge-soft badge-sm">✓ Cubierto</span>,
  partial: <span className="badge badge-warning badge-soft badge-sm">⚠ Parcial</span>,
  gap: <span className="badge badge-error badge-soft badge-sm">✕ Brecha</span>,
}

export default function CourseMatchTable() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-0">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_auto] items-center px-5 py-3 border-b border-base-200 text-xs uppercase tracking-wide text-base-content/40 font-medium">
          <span>Requisito del empleo</span>
          <span className="px-3" />
          <span>Curso UTP</span>
          <span className="px-3" />
          <span>Estado</span>
        </div>
        {courseMatches.map((m) => (
          <div key={m.requirement} className="grid grid-cols-[1fr_auto_1fr_auto_auto] items-center px-5 py-3.5 border-b border-base-200 last:border-0 hover:bg-base-200 transition-colors group">
            <span className="text-sm">{m.requirement}</span>
            <ChevronRight className="w-4 h-4 text-base-content/30 mx-1" />
            <span className={`text-sm ${m.status === 'gap' ? 'text-warning font-medium underline cursor-pointer' : ''}`}>
              {m.status === 'gap' ? 'Sin curso — Entrenar ahora' : `${m.course} · Nota ${m.grade}`}
            </span>
            <span />
            <div className="flex items-center gap-1">
              {statusBadge[m.status]}
              <ChevronRight className="w-3.5 h-3.5 text-base-content/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
