import Link from 'next/link'
import { skillGaps } from '../data/mock-data'

export default function SkillGapsCard() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h3 className="text-sm font-semibold mb-3">Brechas de habilidad</h3>
        <div className="flex flex-col gap-3">
          {skillGaps.map((g) => (
            <div key={g.skill}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">{g.skill}</span>
                <span className="text-success font-semibold">{g.gain}</span>
              </div>
              <div className="relative">
                <progress
                  className={`progress ${g.colorClass} w-full h-2`}
                  value={g.progressPercent}
                  max={100}
                />
                <div
                  className="absolute top-0 h-2 w-0.5 bg-error"
                  style={{ left: `${g.progressPercent - 5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <Link href="/cursos" className="btn btn-outline btn-sm w-full mt-3 rounded-full text-xs">
          Ver mapeo de cursos →
        </Link>
      </div>
    </div>
  )
}
