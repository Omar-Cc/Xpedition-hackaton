'use client'

import { useState } from 'react'
import { ChevronRight, Clock } from 'lucide-react'
import type { TodayTaskData, TaskCategory } from '../types'

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
}

export default function TodayTask({ task }: TodayTaskProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const cb of task.checkboxes) {
      initial[cb.id] = cb.done
    }
    return initial
  })

  const categoryStyle = CATEGORY_STYLES[task.category]

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl border-l-4 border-l-emerald-500">
      <div className="card-body p-6">
        {/* Top row: date label + category badge */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs text-base-content/50 uppercase tracking-widest font-semibold">
            Tarea de hoy · {task.date}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${categoryStyle.badge}`}
          >
            {categoryStyle.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-snug text-base-content mb-1">
          {task.title}
        </h2>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-base-content/45 mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{task.duration}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/55 italic leading-relaxed mb-5">
          {task.description}
        </p>

        {/* Checklist */}
        <div className="flex flex-col gap-2.5 mb-6">
          {task.checkboxes.map((cb) => {
            const isChecked = checked[cb.id] ?? false

            return (
              <label
                key={cb.id}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/70 cursor-pointer hover:bg-base-200 transition-colors duration-150 min-h-[44px]"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-success"
                  checked={isChecked}
                  onChange={(e) =>
                    setChecked((prev) => ({
                      ...prev,
                      [cb.id]: e.target.checked,
                    }))
                  }
                />
                <span
                  className={`text-sm leading-snug transition-all duration-150 ${
                    isChecked
                      ? 'line-through text-base-content/35'
                      : 'text-base-content'
                  }`}
                >
                  {cb.label}
                </span>
              </label>
            )
          })}
        </div>

        {/* Primary CTA */}
        <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white w-full font-bold text-sm border-none shadow-sm hover:shadow-md transition-all duration-200 min-h-[44px]">
          Iniciar sesión de práctica
        </button>

        {/* Tomorrow preview */}
        <details className="group mt-4">
          <summary className="flex items-center justify-between text-sm text-base-content/55 cursor-pointer list-none py-2.5 border-t border-base-200 hover:text-base-content/80 transition-colors duration-150">
            <span className="font-medium">Ver tarea de mañana</span>
            <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform duration-200 ease-out" />
          </summary>
          <div className="mt-2 px-3 py-3 rounded-xl bg-base-200/50">
            <p className="text-xs text-base-content/60 leading-relaxed">
              {task.tomorrowPreview}
            </p>
          </div>
        </details>
      </div>
    </div>
  )
}
