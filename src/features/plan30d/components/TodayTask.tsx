'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { todayTask } from '../data/mock-data'

export default function TodayTask() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-6">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-xs text-base-content/50 uppercase tracking-wide font-medium">
            Tarea de hoy · {todayTask.date}
          </p>
          <span className="badge badge-soft badge-secondary badge-sm flex-shrink-0">
            {todayTask.badge}
          </span>
        </div>
        <h2 className="text-xl font-bold leading-snug mb-1">{todayTask.title}</h2>
        <p className="text-sm text-base-content/50 mb-4">{todayTask.description}</p>

        <div className="flex flex-col gap-3 mb-5">
          {todayTask.checkboxes.map((cb) => (
            <label key={cb.id} className="flex items-center gap-3 p-3 rounded-xl bg-base-200 cursor-pointer hover:bg-base-300 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-success"
                checked={checked[cb.id] ?? false}
                onChange={(e) => setChecked((prev) => ({ ...prev, [cb.id]: e.target.checked }))}
              />
              <span className={`text-sm ${checked[cb.id] ? 'line-through text-base-content/40' : ''}`}>
                {cb.label}
              </span>
            </label>
          ))}
        </div>

        <button className="btn btn-success text-white w-full mb-4">
          Iniciar sesión de práctica
        </button>

        <details className="group">
          <summary className="flex items-center justify-between text-sm text-base-content/60 cursor-pointer list-none py-2 border-t border-base-200">
            Vista previa de mañana
            <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
          </summary>
          <p className="text-xs text-base-content/50 mt-2 px-1">
            Jueves: VLOOKUP & tablas dinámicas en Excel — 40 min
          </p>
        </details>
      </div>
    </div>
  )
}
