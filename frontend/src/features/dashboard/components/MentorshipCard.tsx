import { mentor } from '../data/mock-data'

export default function MentorshipCard() {
  return (
    <div className="card bg-violet-50 border border-violet-200">
      <div className="card-body p-3 flex flex-row items-center gap-3">
        <div className="avatar avatar-placeholder shrink-0">
          <div className="bg-violet-600 text-white w-9 h-9 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">{mentor.avatarInitial}</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-violet-700 leading-none">Mentoría disponible</p>
          <h4 className="text-xs font-bold text-base-content mt-1 leading-tight truncate">{mentor.name}</h4>
          <p className="text-[10px] text-base-content/50 leading-none truncate mt-0.5">
            {mentor.company} · {mentor.position}
          </p>
        </div>
        <button className="btn btn-primary btn-xs shrink-0 font-bold px-3">
          Agendar
        </button>
      </div>
    </div>
  )
}
