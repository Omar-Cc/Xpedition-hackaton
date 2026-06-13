import Link from 'next/link'
import { Check } from 'lucide-react'
import { weekProgress } from '../data/mock-data'

export default function WeekProgressPanel() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="text-sm font-semibold mb-4">Progreso de la semana</h3>
        <div className="flex flex-col gap-3">
          {weekProgress.map((d) => (
            <div key={d.day} className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${
                d.status === 'done' ? 'bg-success' :
                d.status === 'today' ? 'bg-success' :
                'bg-base-300'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-medium ${d.status === 'upcoming' ? 'text-base-content/40' : ''}`}>
                    {d.day}
                  </p>
                  {d.status === 'done' && <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />}
                  {d.status === 'today' && <span className="badge badge-success badge-xs">Hoy</span>}
                </div>
                <p className={`text-xs ${d.status === 'done' ? 'line-through text-base-content/40' : 'text-base-content/60'}`}>
                  {d.task}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/cursos" className="btn btn-outline btn-sm w-full mt-4 rounded-full text-xs">
          Ir al mapeo de cursos →
        </Link>
      </div>
    </div>
  )
}
