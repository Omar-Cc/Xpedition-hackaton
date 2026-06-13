'use client'

import { Target } from 'lucide-react'
import type { JobTarget } from '../types'

interface JobTargetSelectorProps {
  jobs: JobTarget[]
  selectedJobId: string
  onSelectJob: (id: string) => void
}

const badgeStyles = {
  Recomendado: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Retador: 'bg-amber-100 text-amber-700 border-amber-200',
  Alternativa: 'bg-sky-100 text-sky-700 border-sky-200',
}

const difficultyStyles = {
  Baja: 'bg-green-50 text-green-700 border-green-200',
  Media: 'bg-blue-50 text-blue-700 border-blue-200',
  Alta: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function JobTargetSelector({
  jobs,
  selectedJobId,
  onSelectJob,
}: JobTargetSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center gap-2 px-1">
        <Target className="w-5 h-5 text-emerald-500" />
        <h3 className="text-base font-bold text-base-content">Objetivo laboral</h3>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-thin scrollbar-thumb-base-300 snap-x snap-mandatory">
        {jobs.map((job) => {
          const isSelected = job.id === selectedJobId
          const badgeClass = badgeStyles[job.badge] || 'bg-base-200 text-base-content'
          const diffClass = difficultyStyles[job.difficulty] || 'bg-base-200 text-base-content'

          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job.id)}
              className={`flex-shrink-0 w-[300px] snap-start text-left card bg-base-100 transition-all duration-200 cursor-pointer border-2 ${
                isSelected
                  ? 'border-emerald-500 shadow-md scale-[1.01]'
                  : 'border-base-300 hover:border-base-400 hover:scale-[1.005] hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <div className="card-body p-5 space-y-4">
                {/* Header: Company Initials Circle & Names */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white text-xs font-black shadow-sm ${job.companyColor}`}
                    >
                      {job.companyCode}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-base-content truncate">
                        {job.position}
                      </h4>
                      <p className="text-xs text-base-content/50 font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Circular Radial Match Progress Indicator */}
                  <div
                    className="radial-progress text-emerald-500 flex-shrink-0"
                    style={
                      {
                        '--value': String(job.matchPercent),
                        '--size': '2.4rem',
                        '--thickness': '3px',
                      } as React.CSSProperties
                    }
                    role="progressbar"
                    aria-valuenow={job.matchPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="text-[10px] font-bold text-base-content">
                      {job.matchPercent}%
                    </span>
                  </div>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                    {job.badge}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${diffClass}`}>
                    Dificultad: {job.difficulty}
                  </span>
                </div>

                {/* Skill Gaps Chips */}
                <div className="space-y-1.5 pt-1 border-t border-base-200">
                  <p className="text-[10px] text-base-content/40 font-semibold uppercase tracking-wider">
                    Brechas principales
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.mainGaps.map((gap, idx) => (
                      <span
                        key={idx}
                        className="bg-base-200/80 text-base-content/70 text-[10px] px-2 py-0.5 rounded font-medium"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
