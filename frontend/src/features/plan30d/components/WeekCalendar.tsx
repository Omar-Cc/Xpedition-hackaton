'use client'

import { useState } from 'react'
import { Calendar, Check, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import type { CalendarDay, DayStatusType } from '../types'

const statusStyles: Record<
  DayStatusType,
  { circle: string; icon?: typeof Check }
> = {
  completed: {
    circle: 'bg-emerald-500/15 text-emerald-600',
    icon: Check,
  },
  today: {
    circle: 'bg-emerald-505 text-white bg-emerald-500 ring-2 ring-emerald-500/30 animate-pulse',
  },
  pending: {
    circle: 'bg-base-200 text-base-content/40',
  },
  overdue: {
    circle: 'bg-amber-500/15 text-amber-600',
    icon: AlertTriangle,
  },
  interview: {
    circle: 'bg-blue-500/15 text-blue-600',
  },
  mentorship: {
    circle: 'bg-purple-500/15 text-purple-600',
  },
  application: {
    circle: 'bg-orange-500/15 text-orange-600',
  },
  simulation: {
    circle: 'bg-teal-500/15 text-teal-600',
  },
}

const statusDotColor: Record<DayStatusType, string> = {
  completed: 'bg-emerald-500',
  today: 'bg-emerald-500 ring-1 ring-emerald-500/50',
  pending: 'bg-base-300',
  overdue: 'bg-amber-500',
  interview: 'bg-blue-500',
  mentorship: 'bg-purple-500',
  application: 'bg-orange-500',
  simulation: 'bg-teal-500',
}

const legendItems = [
  { label: 'Completado', color: 'bg-emerald-500' },
  { label: 'Pendiente', color: 'bg-base-300' },
  { label: 'Hoy', color: 'bg-emerald-500 ring-2 ring-emerald-500/30' },
  { label: 'Entrevista', color: 'bg-blue-500' },
  { label: 'Mentoría', color: 'bg-purple-500' },
  { label: 'Postulación', color: 'bg-orange-500' },
  { label: 'Simulación', color: 'bg-teal-500' },
  { label: 'Atrasado', color: 'bg-amber-500' },
]

interface WeekCalendarProps {
  duration: number
  weekDays: CalendarDay[]
  monthDays: CalendarDay[]
}

export default function WeekCalendar({
  duration,
  weekDays,
  monthDays,
}: WeekCalendarProps) {
  const [showMonthView, setShowMonthView] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  // Adjust display based on duration
  const isShortPlan = duration === 5 || duration === 7
  const displayDays = isShortPlan
    ? weekDays.slice(0, duration)
    : showMonthView
    ? monthDays
    : monthDays.slice(0, 7) // Show first week if not expanded for 15/30d

  // Column styling
  let gridColsClass = 'grid-cols-7'
  if (duration === 5) gridColsClass = 'grid-cols-5'
  if (duration === 15 && showMonthView) gridColsClass = 'grid-cols-5'
  if (duration === 30 && showMonthView) gridColsClass = 'grid-cols-6'

  // Labels for days
  const getDayName = (day: CalendarDay, idx: number) => {
    if (day.dayLabel) return day.dayLabel
    // Fallback names for days of short plans or custom grids
    const names = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7']
    return names[idx] ?? `d${idx + 1}`
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-base-content/50" />
            <h3 className="text-sm font-semibold">Cronograma del plan</h3>
          </div>

          {!isShortPlan && (
            <button
              onClick={() => setShowMonthView((prev) => !prev)}
              className="btn btn-ghost btn-xs gap-1 text-slate-500 hover:text-slate-800 font-bold"
            >
              {showMonthView ? (
                <>
                  Ver semana
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  {duration === 15 ? 'Ver 15 días' : 'Ver mes completo'}
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Calendar grid */}
        <div>
          {/* Main Grid View */}
          <div className={`grid ${gridColsClass} gap-2 text-center`}>
            {displayDays.map((day, idx) => {
              const style = statusStyles[day.status] || statusStyles.pending
              const IconComponent = style.icon
              const dayNum = day.date

              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center gap-1.5 group cursor-pointer"
                  onMouseEnter={() => setHoveredDay(idx)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {/* Day label */}
                  <span className="text-[10px] text-base-content/50 font-bold uppercase tracking-wider">
                    {isShortPlan ? getDayName(day, idx) : `Día ${dayNum}`}
                  </span>

                  {/* Circle indicator */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      style.circle
                    } ${
                      day.status === 'today'
                        ? 'ring-2 ring-emerald-500/30'
                        : ''
                    }`}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4" />
                    ) : (
                      dayNum
                    )}
                  </div>

                  {/* Dot for non-standard statuses in grid view */}
                  {!isShortPlan && showMonthView && day.status !== 'pending' && day.status !== 'completed' && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full absolute bottom-8 ${statusDotColor[day.status]}`}
                    />
                  )}

                  {/* Tooltip on hover */}
                  {hoveredDay === idx && day.taskLabel && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
                      <div className="bg-navy text-white text-[10px] rounded-lg px-2.5 py-1 whitespace-nowrap shadow-lg">
                        {day.taskLabel}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend for 15/30d monthly views */}
          {!isShortPlan && showMonthView && (
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-4 pt-3 border-t border-base-200">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                  <span className="text-[10px] text-base-content/50 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
