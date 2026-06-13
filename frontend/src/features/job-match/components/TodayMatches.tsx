import { todayMatches } from '../data/mock-data'

export default function TodayMatches() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h3 className="text-sm font-semibold mb-3">
          Matches de hoy — {todayMatches.length}
        </h3>
        <div className="flex flex-col gap-2.5">
          {todayMatches.map((m) => (
            <div key={m.id} className="flex items-center gap-3">
              <div className={`avatar avatar-placeholder`}>
                <div className={`${m.avatarColor} text-white w-8 rounded-full`}>
                  <span className="text-xs font-bold">{m.initial}</span>
                </div>
              </div>
              <span className="text-sm">{m.company}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
