'use client'

import { useState } from 'react'
import {
  Calendar,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
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
    circle:
      'bg-emerald-500 text-white ring-2 ring-emerald-500/30 animate-pulse',
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

const legendItems: { label: string; color: string }[] = [
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
  weekDays: CalendarDay[]
  monthDays: CalendarDay[]
}

export default function WeekCalendar({
  weekDays,
  monthDays,
}: WeekCalendarProps) {
  const [showMonth, setShowMonth] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-navy" />
            <h3 className="text-sm font-bold text-navy">
              {showMonth ? 'Plan mensual' : 'Esta semana'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowMonth((v) => !v)}
            className="btn btn-ghost btn-xs gap-1 text-base-content/60 hover:text-base-content"
          >
            {showMonth ? (
              <>
                Ver semana
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Ver mes completo
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Animated container */}
        <div
          className="grid transition-all duration-300 ease-out"
          style={{
            gridTemplateRows: showMonth ? '0fr 1fr' : '1fr 0fr',
          }}
        >
          {/* Weekly view */}
          <div className="overflow-hidden">
            <div
              className={`transition-opacity duration-200 ${showMonth ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="grid grid-cols-7 gap-2 text-center">
                {weekDays.map((day) => {
                  const style = statusStyles[day.status]
                  const IconComponent = style.icon

                  return (
                    <div
                      key={day.date}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span className="text-xs text-base-content/50 font-medium">
                        {day.dayLabel}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${style.circle}`}
                      >
                        {IconComponent ? (
                          <IconComponent className="w-4 h-4" />
                        ) : (
                          day.date
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Monthly view */}
          <div className="overflow-hidden">
            <div
              className={`transition-opacity duration-200 ${showMonth ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Month grid: 5 rows x 6 columns */}
              <div className="grid grid-cols-6 gap-1.5">
                {monthDays.map((day) => {
                  const isToday = day.status === 'today'
                  const isCompleted = day.status === 'completed'
                  const isOverdue = day.status === 'overdue'

                  return (
                    <div
                      key={day.date}
                      className="relative group"
                      onMouseEnter={() => setHoveredDay(day.date)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <div
                        className={`
                          flex flex-col items-center justify-center
                          py-2 px-1 rounded-lg text-center
                          transition-all duration-150
                          cursor-default
                          ${isToday ? 'bg-emerald-500/10 ring-1 ring-emerald-500/40' : ''}
                          ${isCompleted ? 'bg-emerald-500/5' : ''}
                          ${isOverdue ? 'bg-amber-500/5' : ''}
                          hover:bg-base-200
                        `}
                      >
                        <span
                          className={`text-xs font-medium ${
                            isToday
                              ? 'text-emerald-600 font-bold'
                              : isCompleted
                                ? 'text-emerald-600'
                                : isOverdue
                                  ? 'text-amber-600'
                                  : 'text-base-content/60'
                          }`}
                        >
                          {day.date}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full mt-1 ${statusDotColor[day.status]}`}
                        />
                      </div>

                      {/* Tooltip */}
                      {hoveredDay === day.date && day.taskLabel && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
                          <div className="bg-navy text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap shadow-lg">
                            {day.taskLabel}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy" />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-3 border-t border-base-200">
                {legendItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`}
                    />
                    <span className="text-xs text-base-content/60">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
