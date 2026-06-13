import { courseStats } from '../data/mock-data'

export default function CourseStatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {courseStats.map((s) => (
        <div key={s.label} className={`card ${s.bgClass} border border-base-200`}>
          <div className="card-body p-4">
            <p className="text-xs text-base-content/50 leading-snug">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.textClass}`}>{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
