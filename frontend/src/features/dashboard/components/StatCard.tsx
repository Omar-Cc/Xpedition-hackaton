import type { StatItem } from '../types'

interface StatCardProps {
  stat: StatItem
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-3.5 flex flex-col justify-center">
        <p className="text-[10px] uppercase tracking-wider text-base-content/50 font-bold leading-none">
          {stat.label}
        </p>
        <p className={`text-2xl font-black mt-1 leading-none ${stat.colorClass}`}>
          {stat.value}
        </p>
      </div>
    </div>
  )
}
