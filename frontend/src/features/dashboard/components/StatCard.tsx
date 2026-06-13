import type { StatItem } from '../types'

interface StatCardProps {
  stat: StatItem
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <p className="text-xs uppercase tracking-wide text-base-content/50 font-medium">
          {stat.label}
        </p>
        <p className={`text-3xl font-bold mt-1 ${stat.colorClass}`}>
          {stat.value}
        </p>
      </div>
    </div>
  )
}
