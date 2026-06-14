import type { ProgressItem } from '../types'

interface ProgressRowProps {
  item: ProgressItem
}

export default function ProgressRow({ item }: ProgressRowProps) {
  return (
    <div className="flex items-center gap-3 justify-between">
      <span className="text-xs text-base-content/70 truncate flex-1">{item.label}</span>
      <div className="flex items-center gap-2 w-32 shrink-0">
        <progress
          className={`progress ${item.colorClass} w-20 h-1.5`}
          value={item.current}
          max={item.total}
          aria-label={`${item.label}: ${item.current} de ${item.total}`}
        />
        <span className="text-xs font-semibold w-8 text-right shrink-0">
          {item.current}/{item.total}
        </span>
      </div>
    </div>
  )
}
