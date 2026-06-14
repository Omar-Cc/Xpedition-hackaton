'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, X, Clock, AlertCircle } from 'lucide-react'
import type { CalendarDay, CalendarEvent } from '../types'
import WeekCalendar from './WeekCalendar'

interface FloatingCalendarButtonProps {
  duration: number
  weekDays: CalendarDay[]
  monthDays: CalendarDay[]
  events: CalendarEvent[]
  deadlineDate: string
  daysLeft: number
}

const typeColorMap: Record<CalendarEvent['type'], string> = {
  task: 'bg-emerald-500',
  interview: 'bg-blue-500',
  mentorship: 'bg-purple-500',
  deadline: 'bg-rose-500',
  reminder: 'bg-amber-500',
}

const legendItems = [
  { label: 'Completado', color: 'bg-emerald-500' },
  { label: 'Pendiente', color: 'bg-base-300' },
  { label: 'Hoy', color: 'bg-emerald-500 ring-2 ring-emerald-500/30' },
  { label: 'Entrevista', color: 'bg-blue-500' },
  { label: 'Mentoría', color: 'bg-purple-500' },
  { label: 'Postulación', color: 'bg-orange-500' },
  { label: 'Simulación', color: 'bg-teal-500' },
  { label: 'Atrasado', color: 'bg-rose-500' },
]

export default function FloatingCalendarButton({
  duration,
  weekDays,
  monthDays,
  events,
  deadlineDate,
  daysLeft,
}: FloatingCalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 bg-navy text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer font-bold border border-white/10"
        aria-label="Abrir calendario"
        aria-expanded={isOpen}
      >
        <CalendarIcon className="w-5 h-5" />
        <span className="text-xs">Calendario</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-navy">
          {events.length}
        </span>
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[45] transition-opacity duration-300 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div
        ref={panelRef}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 300ms'
        }}
        className="fixed inset-y-0 right-0 w-full sm:w-[460px] z-50 bg-base-100 shadow-2xl border-l border-base-200 flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">
              Calendario del plan
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-sm btn-circle cursor-pointer"
            aria-label="Cerrar calendario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Section A: Quick metrics */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 text-center">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Duración</span>
              <span className="text-sm font-extrabold text-slate-700">{duration} días</span>
            </div>
            <div className="border-l border-slate-200/80">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Día actual</span>
              <span className="text-sm font-extrabold text-slate-700">Día 7</span>
            </div>
            <div className="border-l border-slate-200/80">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Cierre</span>
              <span className="text-sm font-extrabold text-rose-600">{daysLeft} días</span>
            </div>
          </div>

          {/* Section B: Integrated Calendar Component */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Cronograma detallado
            </h4>
            <div className="border border-base-200 rounded-2xl overflow-hidden shadow-xs">
              <WeekCalendar
                duration={duration}
                weekDays={weekDays}
                monthDays={monthDays}
              />
            </div>
          </div>

          {/* Section C: Legend of Statuses */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Leyenda de estados
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/20">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                  <span className="text-[11px] text-slate-600 font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Next Events */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Próximos hitos programados
            </h4>
            <div className="flex flex-col gap-2.5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-base-200/40 border border-slate-200/40 hover:bg-base-200/60 transition-colors cursor-pointer"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${typeColorMap[event.type]}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-base-200 bg-slate-50/50 flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-sm btn-primary bg-navy hover:bg-navy/90 text-white w-full rounded-xl text-xs font-bold min-h-[36px] cursor-pointer border-none"
          >
            Listo, volver al plan
          </button>
        </div>

      </div>
    </>
  )
}
