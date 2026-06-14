'use client'

import { Target, CalendarDays } from 'lucide-react'
import type { JobTarget } from '../types'

interface JobTargetSelectorProps {
  jobs: JobTarget[]
  selectedJobId: string
  onSelectJob: (id: string) => void
}

const badgeStyles = {
  Recomendado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Retador: 'bg-amber-50 text-amber-700 border-amber-200',
  Alternativa: 'bg-blue-50 text-blue-700 border-blue-200',
}

const difficultyStyles = {
  Baja: 'bg-emerald-50/50 text-emerald-600 border-emerald-200/50',
  Media: 'bg-amber-50/50 text-amber-600 border-amber-200/50',
  Alta: 'bg-rose-50/50 text-rose-600 border-rose-200/50',
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
        <Target className="w-5 h-5 text-navy" />
        <h3 className="text-base font-bold text-base-content">Objetivo laboral</h3>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-thin scrollbar-thumb-base-300 snap-x snap-mandatory">
        {jobs.map((job) => {
          const isSelected = job.id === selectedJobId
          const badgeClass = badgeStyles[job.badge] || 'bg-base-200 text-base-content'
          const diffClass = difficultyStyles[job.difficulty] || 'bg-base-200 text-base-content'

          // Max 3 gaps
          const displayedGaps = job.mainGaps.slice(0, 3)

          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job.id)}
              className={`flex-shrink-0 w-[310px] snap-start text-left card bg-base-100 transition-all duration-200 cursor-pointer border-2 ${
                isSelected
                  ? 'border-emerald-500 shadow-md scale-[1.01]'
                  : 'border-base-300 hover:border-base-400 hover:scale-[1.005] hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <div className="card-body p-5 space-y-3">
                {/* Header: Company Initials Circle & Position/Company */}
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
                      <p className="text-xs text-slate-500 font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Prominent Match */}
                  <div className="flex flex-col items-end flex-shrink-0 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                    <span className="text-lg font-black text-emerald-600 leading-none">
                      {job.matchPercent}%
                    </span>
                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">
                      Match
                    </span>
                  </div>
                </div>

                {/* Deadline and Urgency */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>
                    Faltan <span className="font-extrabold text-rose-600">{job.daysLeft} días</span>
                  </span>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                    {job.badge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${diffClass}`}>
                    Dificultad: {job.difficulty}
                  </span>
                </div>

                {/* Gaps Row */}
                <div className="space-y-1.5 pt-2.5 border-t border-base-200">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Brechas principales
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {displayedGaps.map((gap, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-lg font-bold border border-slate-200/50"
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
