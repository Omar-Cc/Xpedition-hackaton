import Link from 'next/link'
import { BarChart3, ArrowRight } from 'lucide-react'
import type { SkillGapLevel, SkillLevel } from '../types'

interface SkillGapsCardProps {
  skills: SkillGapLevel[]
}

const levelIndex: Record<SkillLevel, number> = {
  'Básico': 1,
  'Intermedio': 2,
  'Avanzado': 3,
}

const levelLabels: SkillLevel[] = ['Básico', 'Intermedio', 'Avanzado']

function LevelBar({ currentLevel, requiredLevel }: { currentLevel: SkillLevel; requiredLevel: SkillLevel }) {
  const current = levelIndex[currentLevel]
  const required = levelIndex[requiredLevel]

  return (
    <div className="flex gap-1 w-full">
      {levelLabels.map((level, i) => {
        const idx = i + 1
        let classes = ''

        if (idx <= current) {
          // Filled — current skill level
          classes = 'bg-emerald-500'
        } else if (idx <= required) {
          // Gap — needs improvement
          classes = 'bg-amber-400/60 bg-[length:6px_6px] bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.4)_2px,rgba(255,255,255,0.4)_4px)]'
        } else {
          // Beyond required — empty
          classes = 'bg-base-200'
        }

        return (
          <div key={level} className="flex-1 flex flex-col items-center gap-1">
            {/* Required marker */}
            {idx === required && current < required && (
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-500" />
            )}
            {idx === required && current >= required && (
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-emerald-500" />
            )}
            {idx !== required && <div className="h-[5px]" />}
            <div className={`h-2.5 w-full rounded-full ${classes} transition-all duration-300`} />
            <span className="text-[8px] text-base-content/40 leading-none">{level}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function SkillGapsCard({ skills }: SkillGapsCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-base-content/50" />
          <h3 className="text-sm font-semibold">Brechas frente al puesto</h3>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {skills.map((s) => {
            const hasGap = levelIndex[s.currentLevel] < levelIndex[s.requiredLevel]
            return (
              <div key={s.skill} className="pb-3 border-b border-base-200 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{s.skill}</span>
                  {hasGap && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      Brecha
                    </span>
                  )}
                  {!hasGap && (
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      OK
                    </span>
                  )}
                </div>

                <LevelBar currentLevel={s.currentLevel} requiredLevel={s.requiredLevel} />

                <div className="flex items-center gap-1 mt-2 text-[11px] text-base-content/50">
                  <span>{s.currentLevel}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className={hasGap ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                    {s.requiredLevel}
                  </span>
                </div>

                <p className="text-[10px] text-base-content/40 mt-1">{s.action}</p>
              </div>
            )
          })}
        </div>

        <Link href="/cursos" className="btn btn-outline btn-sm w-full mt-3 rounded-full text-xs gap-1">
          Ver ruta de cursos
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
