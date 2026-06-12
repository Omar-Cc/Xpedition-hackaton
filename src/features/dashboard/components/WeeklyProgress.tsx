import ProgressRow from './ProgressRow'
import { progressItems } from '../data/mock-data'

export default function WeeklyProgress() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm mb-4">Progreso semanal</h3>
        <div className="flex flex-col gap-4">
          {progressItems.map((item) => (
            <ProgressRow key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
