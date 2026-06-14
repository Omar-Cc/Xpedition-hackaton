'use client'

import { Calendar, Clock, ChevronRight } from 'lucide-react'
import type { CalendarEvent } from '../types'

interface PlanCalendarCardProps {
  duration: number
  events: CalendarEvent[]
  onViewMonthlyCalendar?: () => void
}

export default function PlanCalendarCard({
  duration,
  events,
  onViewMonthlyCalendar,
}: PlanCalendarCardProps) {
  // Let's take the first 3 upcoming events as "próximos hitos"
  const upcomingEvents = events.slice(0, 3)

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl h-full flex flex-col justify-between">
      <div className="card-body p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
              <Calendar className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-base-content uppercase tracking-wider">
              Calendario del plan
            </h3>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Día actual</span>
              <span className="text-lg font-black text-slate-800">Día 7</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Semana actual</span>
              <span className="text-lg font-black text-slate-800">Semana 1</span>
            </div>
          </div>

          {/* Próximos hitos section */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Próximos hitos
            </h4>
            
            <div className="flex flex-col gap-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-300/30 text-left"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {event.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onViewMonthlyCalendar}
          className="btn btn-outline btn-sm w-full rounded-xl text-xs gap-1 cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-bold min-h-[36px]"
        >
          Ver calendario completo
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  )
}
