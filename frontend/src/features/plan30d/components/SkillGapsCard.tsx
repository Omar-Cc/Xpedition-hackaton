'use client'

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
    <div className="flex gap-1.5 w-full">
      {levelLabels.map((level, i) => {
        const idx = i + 1
        let classes = ''

        if (idx <= current) {
          // Filled — current skill level
          classes = 'bg-emerald-500'
        } else if (idx <= required) {
          // Gap — needs improvement
          classes = 'bg-amber-400/70 bg-[length:6px_6px] bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.4)_2px,rgba(255,255,255,0.4)_4px)] border border-dashed border-amber-500/30'
        } else {
          // Beyond required — empty
          classes = 'bg-base-200'
        }

        return (
          <div key={level} className="flex-1 flex flex-col items-center gap-1">
            {/* Required marker */}
            {idx === required && current < required && (
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-amber-500" />
            )}
            {idx === required && current >= required && (
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-emerald-500" />
            )}
            {idx !== required && <div className="h-[6px]" />}
            <div className={`h-3 w-full rounded-full ${classes} transition-all duration-300`} />
            <span className="text-[10px] font-bold text-slate-500 leading-none">{level}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function SkillGapsCard({ skills }: SkillGapsCardProps) {
  // Show at most 3 main gaps
  const displayedSkills = skills.slice(0, 3)
  const remainingCount = skills.length - 3

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl h-full flex flex-col justify-between">
      <div className="card-body p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-base-content/60" />
            <h3 className="text-sm font-bold text-base-content uppercase tracking-wider">Brechas críticas</h3>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            {displayedSkills.map((s) => {
              const hasGap = levelIndex[s.currentLevel] < levelIndex[s.requiredLevel]
              return (
                <div key={s.skill} className="pb-3.5 border-b border-base-200 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-extrabold text-base-content">{s.skill}</span>
                    {hasGap && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded-lg">
                        Brecha
                      </span>
                    )}
                    {!hasGap && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-1.5 py-0.5 rounded-lg">
                        OK
                      </span>
                    )}
                  </div>

                  <LevelBar currentLevel={s.currentLevel} requiredLevel={s.requiredLevel} />

                  <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-500">
                    <span>{s.currentLevel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className={hasGap ? 'text-amber-700 font-extrabold' : 'text-emerald-700 font-extrabold'}>
                      {s.requiredLevel}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-slate-500 mt-1 leading-normal">
                    Acción: {s.action}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {remainingCount > 0 && (
            <p className="text-[11px] font-semibold text-slate-400 text-center">
              + {remainingCount} brecha{remainingCount > 1 ? 's' : ''} adicional{remainingCount > 1 ? 'es' : ''} en tu perfil
            </p>
          )}
          <Link
            href="/cursos"
            className="btn btn-outline btn-sm w-full rounded-xl text-xs gap-1 cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-bold min-h-[36px]"
          >
            Ver detalle en Aprende+
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
