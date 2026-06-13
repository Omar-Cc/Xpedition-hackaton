import { prepQuestions } from '../data/mock-data'

export default function PrepareCard() {
  return (
    <div className="card bg-violet-50 border border-violet-200">
      <div className="card-body p-5">
        <p className="text-sm font-semibold text-violet-800 mb-1">
          Prepárate para el jueves 🎯
        </p>
        <p className="text-xs text-violet-700/70 mb-3">
          Practica 3 preguntas conductuales antes de tu entrevista con RRHH de Scotiabank.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {prepQuestions.map((q) => (
            <button key={q.id} className="btn btn-ghost btn-sm bg-white border border-violet-200 text-xs text-left justify-start h-auto py-2 hover:bg-violet-50">
              {q.label}
            </button>
          ))}
        </div>
        <button className="btn btn-primary w-full text-white">
          Iniciar simulacro completo
        </button>
      </div>
    </div>
  )
}
