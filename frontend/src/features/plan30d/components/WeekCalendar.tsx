import { weekDays } from '../data/mock-data'

export default function WeekCalendar() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h3 className="text-sm font-semibold mb-3">Esta semana</h3>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-base-content/50">{d.day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                d.status === 'done' ? 'bg-success/15 text-success' :
                d.status === 'today' ? 'bg-success text-white font-bold' :
                'bg-base-200 text-base-content/40'
              }`}>
                {d.status === 'done' ? '✓' : d.dayNum}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
