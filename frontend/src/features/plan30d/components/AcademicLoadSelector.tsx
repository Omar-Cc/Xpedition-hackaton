'use client'

import { BookOpen, AlertTriangle, GraduationCap, Info } from 'lucide-react'
import type { AcademicLoad } from '../types'

interface AcademicLoadSelectorProps {
  currentLoad: AcademicLoad
  onChange: (load: AcademicLoad) => void
}

const options: { value: AcademicLoad; label: string; icon: typeof BookOpen; description: string }[] = [
  {
    value: 'Normal',
    label: 'Normal',
    icon: BookOpen,
    description: 'Tareas estándar (aprox. 45-60 min/día)',
  },
  {
    value: 'Semana pesada',
    label: 'Semana pesada',
    icon: AlertTriangle,
    description: 'Plan reducido para semanas con entregas (aprox. 30 min/día)',
  },
  {
    value: 'Semana de exámenes',
    label: 'Semana de exámenes',
    icon: GraduationCap,
    description: 'Plan mínimo para semanas de parciales/finales (aprox. 15 min/día)',
  },
]

export default function AcademicLoadSelector({
  currentLoad,
  onChange,
}: AcademicLoadSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Label and Buttons */}
      <div className="flex items-center gap-3 bg-base-100 px-4 py-2 rounded-2xl shadow-sm border border-base-200">
        <span className="text-xs font-semibold text-base-content/60 flex-shrink-0">
          Carga académica:
        </span>
        <div className="join">
          {options.map((opt) => {
            const Icon = opt.icon
            const isSelected = currentLoad === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`btn btn-xs join-item font-semibold gap-1.5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-navy border-navy text-white hover:bg-navy/90 hover:border-navy/90'
                    : 'bg-base-100 hover:bg-base-200 text-base-content/60 border-base-300'
                }`}
                title={opt.description}
                aria-pressed={isSelected}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Adjustment Alert */}
      {currentLoad !== 'Normal' && (
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs animate-pulse">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Plan ajustado: tareas más cortas</span>
        </div>
      )}
    </div>
  )
}
