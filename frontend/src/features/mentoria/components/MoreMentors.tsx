import { Star } from 'lucide-react'
import type { MentorProfile } from '../types'

interface MoreMentorsProps {
  mentors?: MentorProfile[]
  selectedMentorId?: string
  onSelectMentor?: (mentor: MentorProfile) => void
}

export default function MoreMentors({
  mentors = [],
  selectedMentorId,
  onSelectMentor,
}: MoreMentorsProps) {
  if (mentors.length === 0) {
    return null
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-slate-100">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm mb-3 text-slate-800">Otros mentores para este puesto</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mentors.map((m) => {
            const isSelected = m.id === selectedMentorId
            return (
              <div 
                key={m.id} 
                onClick={() => onSelectMentor?.(m)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'border-violet-500 bg-violet-50/50 shadow-sm ring-1 ring-violet-500' 
                    : 'border-base-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="avatar avatar-placeholder">
                  <div className={`${m.avatarColor} text-white w-10 h-10 rounded-full`}>
                    <span className="text-sm font-bold">{m.avatarInitial}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{m.name}</p>
                  <p className="text-xs text-base-content/60 truncate">{m.career}</p>
                  <div className="flex justify-between items-center gap-1 mt-0.5">
                    <p className="text-xs flex items-center gap-0.5 text-amber-600 font-medium truncate">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      {m.rating} · {m.company}
                    </p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 flex-shrink-0">
                      {m.sessionsBooked}/10 cupos
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
