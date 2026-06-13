'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Clock } from 'lucide-react'
import type { TodayTaskData, TaskCategory, AcademicLoad } from '../types'

const CATEGORY_STYLES: Record<
  TaskCategory,
  { badge: string; label: string }
> = {
  técnica: { badge: 'bg-violet-100 text-violet-700', label: 'Técnica' },
  blanda: { badge: 'bg-sky-100 text-sky-700', label: 'Blanda' },
  CV: { badge: 'bg-amber-100 text-amber-700', label: 'CV' },
  entrevista: { badge: 'bg-rose-100 text-rose-700', label: 'Entrevista' },
  postulación: {
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'Postulación',
  },
}

interface TodayTaskProps {
  task: TodayTaskData
  academicLoad: AcademicLoad
}

export default function TodayTask({ task, academicLoad }: TodayTaskProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  // Reset checked state when job task changes
  useEffect(() => {
    const initial: Record<string, boolean> = {}
    for (const cb of task.checkboxes) {
      initial[cb.id] = cb.done
    }
    setChecked(initial)
  }, [task])

  const categoryStyle = CATEGORY_STYLES[task.category] || CATEGORY_STYLES.técnica

  // Adapt duration and subtasks based on academic load
  let duration = task.duration
  let checkboxes = task.checkboxes
  let noticeText = ''

  if (academicLoad === 'Semana pesada') {
    duration = '30 min'
    checkboxes = task.checkboxes.slice(0, 2)
    noticeText = '(Plan reducido por Semana Pesada)'
  } else if (academicLoad === 'Semana de exámenes') {
    duration = '15 min'
    checkboxes = task.checkboxes.slice(0, 1)
    noticeText = '(Plan mínimo por Semana de Exámenes)'
  }

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl border-2 border-base-200 border-l-4 border-l-emerald-500">
      <div className="card-body p-5">
        {/* Top row: label + category badge */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[10px] text-base-content/40 uppercase tracking-widest font-extrabold">
            Tarea de hoy
          </p>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${categoryStyle.badge}`}
          >
            {categoryStyle.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold leading-snug text-base-content mb-1">
          {task.title}
        </h2>

        {/* Duration + Load badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-base-content/50">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">{duration}</span>
          </div>
          {noticeText && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              {noticeText}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-base-content/50 italic leading-relaxed mb-4">
          {task.description}
        </p>

        {/* Checklist */}
        <div className="flex flex-col gap-2 mb-4">
          {checkboxes.map((cb) => {
            const isChecked = checked[cb.id] ?? false

            return (
              <label
                key={cb.id}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-base-200/50 cursor-pointer hover:bg-base-200/80 transition-colors duration-150 min-h-[38px]"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-success"
                  checked={isChecked}
                  onChange={(e) =>
                    setChecked((prev) => ({
                      ...prev,
                      [cb.id]: e.target.checked,
                    }))
                  }
                />
                <span
                  className={`text-xs leading-snug transition-all duration-150 ${
                    isChecked
                      ? 'line-through text-base-content/35'
                      : 'text-base-content/85 font-medium'
                  }`}
                >
                  {cb.label}
                </span>
              </label>
            )
          })}
        </div>

        {/* Primary CTA */}
        <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white w-full font-bold btn-sm rounded-xl border-none shadow-sm hover:shadow-md transition-all duration-200 min-h-[36px]">
          Iniciar sesión de práctica
        </button>

        {/* Tomorrow preview */}
        <details className="group mt-3">
          <summary className="flex items-center justify-between text-xs text-base-content/55 cursor-pointer list-none py-2 border-t border-base-200 hover:text-base-content/80 transition-colors duration-150">
            <span className="font-semibold">Ver tarea de mañana</span>
            <ChevronRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform duration-200 ease-out" />
          </summary>
          <div className="mt-1.5 px-2.5 py-2 rounded-xl bg-base-200/40">
            <p className="text-[10px] text-base-content/60 leading-relaxed">
              {task.tomorrowPreview}
            </p>
          </div>
        </details>
      </div>
    </div>
  )
}
