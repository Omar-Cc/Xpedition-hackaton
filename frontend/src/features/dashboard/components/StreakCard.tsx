import Link from 'next/link'

export default function StreakCard() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="fuego">🔥</span>
            <p className="text-sm font-semibold">Racha de 7 días</p>
          </div>
          <Link href="/plan-30d" className="text-xs text-primary font-medium hover:underline whitespace-nowrap">
            Ver plan de hoy →
          </Link>
        </div>
      </div>
    </div>
  )
}
