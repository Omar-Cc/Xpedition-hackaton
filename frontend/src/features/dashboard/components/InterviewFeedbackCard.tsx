import { Mic, CheckCircle, AlertTriangle } from 'lucide-react'

export default function InterviewFeedbackCard() {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-violet-600" />
            <h3 className="font-bold text-base-content text-lg">Última Simulación de Entrevista</h3>
          </div>
          <span className="badge badge-success badge-sm font-bold px-2 py-3 text-xs">85/100</span>
        </div>
        <p className="text-xs text-base-content/60 mb-5">Puesto: Data Analyst Junior · Realizada hace 2 días</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-success/5 rounded-xl p-4 border border-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-base-content mb-1">Puntos fuertes</p>
                <p className="text-sm text-base-content/70 leading-snug">Excelente dominio técnico explicando conceptos complejos de SQL y Python de manera sencilla.</p>
              </div>
            </div>
          </div>
          <div className="bg-warning/5 rounded-xl p-4 border border-warning/10">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-base-content mb-1">Área de mejora</p>
                <p className="text-sm text-base-content/70 leading-snug">Estructura mejor tus anécdotas usando el método STAR (Situación, Tarea, Acción, Resultado).</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="btn btn-outline btn-sm text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300">
            Practicar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
