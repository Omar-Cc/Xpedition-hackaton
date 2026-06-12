import { skillMatches } from '../data/mock-data'

export default function SkillGapPanel() {
  return (
    <div className="card bg-base-100 shadow-sm h-full">
      <div className="card-body p-6">
        <h2 className="font-semibold text-base mb-4">Tus habilidades vs. la oferta</h2>
        <div className="flex flex-col divide-y divide-base-200">
          {skillMatches.map((item) => (
            <div key={item.skill} className="flex items-center justify-between py-3">
              <span className="text-sm">{item.skill}</span>
              {item.status === 'covered' ? (
                <span className="badge badge-success badge-soft text-xs font-medium">
                  ✓ Cubierto
                </span>
              ) : (
                <span className="badge badge-error badge-soft text-xs font-medium">
                  ✕ Entrenar ahora
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
