import { Mic, CheckCircle, AlertTriangle } from 'lucide-react'

export default function InterviewFeedbackCard() {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body p-4">
        {/* Header container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Mic className="w-4.5 h-4.5 text-violet-600 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base-content text-sm truncate">Última Simulación</h3>
                <span className="badge badge-success badge-xs font-bold px-1.5 py-2 text-[10px]">85/100</span>
              </div>
              <p className="text-[10px] text-base-content/50 mt-0.5">Data Analyst Junior · Hace 2 días</p>
            </div>
          </div>
          <button className="btn btn-outline btn-xs text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300 w-fit shrink-0">
            Reintentar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-success/5 rounded-xl p-3 border border-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-base-content mb-0.5">Puntos fuertes</p>
                <p className="text-[11px] text-base-content/70 leading-snug">Excelente dominio técnico explicando SQL y Python de manera sencilla.</p>
              </div>
            </div>
          </div>
          <div className="bg-warning/5 rounded-xl p-3 border border-warning/10">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-base-content mb-0.5">Área de mejora</p>
                <p className="text-[11px] text-base-content/70 leading-snug">Estructura mejor tus anécdotas usando el método STAR.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
