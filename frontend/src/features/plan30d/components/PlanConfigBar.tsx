'use client'

import { Clock, BookOpen, Sparkles, Sliders, CalendarDays } from 'lucide-react'
import type { PlanDuration, AcademicLoad, PlanIntensity } from '../types'

interface PlanConfigBarProps {
  duration: PlanDuration
  onChangeDuration: (d: PlanDuration) => void
  academicLoad: AcademicLoad
  onChangeAcademicLoad: (l: AcademicLoad) => void
  deadlineDate: string
  intensity: PlanIntensity
  onAdjust: () => void
}

const durationOptions: PlanDuration[] = [5, 7, 15, 30]
const loadOptions: { value: AcademicLoad; label: string }[] = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Semana pesada', label: 'Semana pesada' },
  { value: 'Semana de exámenes', label: 'Semana de exámenes' },
]

const intensityBadgeStyles = {
  Baja: 'bg-green-100 text-green-700 border-green-200',
  Media: 'bg-amber-100 text-amber-700 border-amber-200',
  Alta: 'bg-rose-100 text-rose-700 border-rose-200',
}

export default function PlanConfigBar({
  duration,
  onChangeDuration,
  academicLoad,
  onChangeAcademicLoad,
  deadlineDate,
  intensity,
  onAdjust,
}: PlanConfigBarProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left config items */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          {/* Duration Selector */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
              <Clock className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider">
                Duración del plan
              </span>
              <div className="flex gap-1 mt-0.5">
                {durationOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => onChangeDuration(d)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      duration === d
                        ? 'bg-navy text-white'
                        : 'bg-base-200 hover:bg-base-300 text-base-content/60'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Load Selector */}
          <div className="flex items-center gap-2.5 border-t md:border-t-0 md:border-l border-base-200 pt-3 md:pt-0 md:pl-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
              <BookOpen className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider">
                Carga académica
              </span>
              <div className="join mt-0.5">
                {loadOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChangeAcademicLoad(opt.value)}
                    className={`btn btn-xs join-item font-semibold px-2 cursor-pointer ${
                      academicLoad === opt.value
                        ? 'bg-navy text-white hover:bg-navy/95'
                        : 'bg-base-200 hover:bg-base-300 text-base-content/60 border-none'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deadline information (Static) */}
          <div className="flex items-center gap-2.5 border-t md:border-t-0 md:border-l border-base-200 pt-3 md:pt-0 md:pl-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
              <CalendarDays className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider">
                Límite de postulación
              </span>
              <span className="text-xs font-bold text-base-content mt-0.5">
                {deadlineDate}
              </span>
            </div>
          </div>

          {/* Suggested Intensity (Dynamic indicator) */}
          <div className="flex items-center gap-2.5 border-t md:border-t-0 md:border-l border-base-200 pt-3 md:pt-0 md:pl-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200">
              <Sparkles className="w-4 h-4 text-base-content/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider">
                Intensidad sugerida
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border mt-0.5 ${
                  intensityBadgeStyles[intensity]
                }`}
              >
                {intensity}
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA button */}
        <div className="flex items-center border-t md:border-t-0 border-base-200 pt-3 md:pt-0 w-full md:w-auto">
          <button
            onClick={onAdjust}
            className="btn bg-emerald-500 hover:bg-emerald-600 border-none text-white btn-sm rounded-xl font-bold flex gap-1.5 items-center justify-center w-full md:w-auto cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ajustar plan</span>
          </button>
        </div>
      </div>
    </div>
  )
}
