import ProgressRow from './ProgressRow'
import { progressItems } from '../data/mock-data'

export default function WeeklyProgress() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h3 className="font-semibold text-xs text-base-content/50 uppercase tracking-widest mb-2.5">Progreso semanal</h3>
        <div className="flex flex-col gap-2.5">
          {progressItems.map((item) => (
            <ProgressRow key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
