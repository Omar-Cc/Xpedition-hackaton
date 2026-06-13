import { howItWorks } from '../data/mock-data'

export default function HowItWorksPanel() {
  return (
    <div className="card bg-violet-50 border border-violet-200 shadow-sm">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm text-violet-800 mb-3">¿Cómo funciona?</h3>
        <ol className="flex flex-col gap-3">
          {howItWorks.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-base-content/70 leading-snug">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
