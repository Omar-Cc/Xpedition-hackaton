import { previousAnswers } from '../data/mock-data'

export default function PreviousAnswers() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="text-sm font-semibold mb-3">Respuestas anteriores</h3>
        <div className="flex flex-col gap-4">
          {previousAnswers.map((a) => (
            <div key={a.id}>
              <p className="text-xs text-primary font-medium mb-1">{a.question}</p>
              <div className="flex items-start gap-2">
                <span className={`text-sm font-bold ${a.scoreColor} flex-shrink-0`}>{a.score}/100</span>
                <p className="text-xs text-base-content/60 leading-relaxed">{a.feedback}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline btn-sm w-full mt-4 rounded-full">
          Ver reporte completo →
        </button>
      </div>
    </div>
  )
}
