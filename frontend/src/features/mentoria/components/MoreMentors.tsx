import { Star } from 'lucide-react'
import { moreMentors } from '../data/mock-data'

export default function MoreMentors() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm mb-4">Más mentores disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moreMentors.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-base-200 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="avatar avatar-placeholder">
                <div className={`${m.avatarColor} text-white w-10 rounded-full`}>
                  <span className="text-sm font-bold">{m.avatarInitial}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-base-content/50">{m.company}</p>
                <p className="text-xs flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-warning fill-warning" />{m.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
