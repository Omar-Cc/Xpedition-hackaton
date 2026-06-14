import { mentor } from '../data/mock-data'

export default function MentorshipCard() {
  return (
    <div className="card bg-violet-50 border border-violet-200">
      <div className="card-body p-5">
        <p className="text-xs font-semibold text-violet-700 mb-2">Tu conexión de mentoría</p>
        <p className="text-xs text-base-content/60 mb-4">
          {mentor.name} está disponible — agenda una sesión.
        </p>
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar avatar-placeholder">
            <div className="bg-violet-600 text-white w-10 rounded-full">
              <span className="text-sm font-bold">{mentor.avatarInitial}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">{mentor.name}</p>
            <p className="text-xs text-base-content/60">
              {mentor.company} · {mentor.position} {mentor.timeAgo}
            </p>
          </div>
        </div>
        <button className="btn btn-primary btn-sm w-full">
          Agendar sesión →
        </button>
      </div>
    </div>
  )
}
