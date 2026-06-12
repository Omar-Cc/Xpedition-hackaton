import { sessionData } from '../data/mock-data'

export default function QuestionCard() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center gap-3 pb-3 border-b border-base-200 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Entrevistador IA — {sessionData.company}</p>
            <p className="text-xs text-base-content/50">{sessionData.round}</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl rounded-tl-none px-4 py-3">
          <p className="text-sm leading-relaxed">{sessionData.question}</p>
        </div>
      </div>
    </div>
  )
}
