import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { interviewDetails, resources } from '../data/mock-data'

export default function InterviewDetailsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-5">
          <h3 className="text-sm font-semibold mb-3">Detalles de la entrevista</h3>
          <div className="flex flex-col gap-2">
            {interviewDetails.map((d) => (
              <div key={d.label} className="flex justify-between text-sm">
                <span className="text-base-content/50">{d.label}</span>
                <span className={`font-medium ${d.highlight ? 'text-primary' : ''}`}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-5">
          <h3 className="text-sm font-semibold mb-3">Recursos de preparación</h3>
          <div className="flex flex-col gap-2">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-center justify-between text-sm py-2 px-3 rounded-lg hover:bg-base-200 transition-colors"
              >
                <span>{r.label}</span>
                <ChevronRight className="w-4 h-4 text-base-content/30" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
