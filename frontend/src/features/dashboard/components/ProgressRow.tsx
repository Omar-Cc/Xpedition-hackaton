import type { ProgressItem } from '../types'

interface ProgressRowProps {
  item: ProgressItem
}

export default function ProgressRow({ item }: ProgressRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-base-content/70">{item.label}</span>
        <span className="font-medium">
          {item.current}/{item.total}
        </span>
      </div>
      <progress
        className={`progress ${item.colorClass} w-full h-2`}
        value={item.current}
        max={item.total}
        aria-label={`${item.label}: ${item.current} de ${item.total}`}
      />
    </div>
  )
}
