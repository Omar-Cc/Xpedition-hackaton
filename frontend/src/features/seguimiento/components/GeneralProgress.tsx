import { TrendingUp } from 'lucide-react'
import { overallProgress } from '../data/mock-data'

export default function GeneralProgress() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-base-content/60" />
          <h3 className="text-sm font-semibold">Progreso general</h3>
        </div>
        <div className="flex flex-col gap-3">
          {overallProgress.map((p) => (
            <div key={p.company}>
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${p.avatarColor}`} />
                  <span className="font-medium">{p.company}</span>
                </div>
                <span className="text-base-content/50">Fase {p.phase}/{p.totalPhases}</span>
              </div>
              <progress className={`progress ${p.barColor} w-full h-2`} value={p.progressPercent} max={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
