'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'
import { calendarEvents } from '../data/mock-data'
import type { CalendarEvent } from '../types'

const typeColorMap: Record<CalendarEvent['type'], string> = {
  'tarea': 'bg-emerald-500',
  'entrevista': 'bg-blue-500',
  'mentoría': 'bg-purple-500',
  'fecha límite': 'bg-rose-500',
  'recordatorio': 'bg-amber-500',
}

const currentMonth = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(new Date())

export default function FloatingCalendarButton() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute bottom-16 right-0 w-[360px] max-h-[480px] bg-base-100 rounded-2xl shadow-2xl border border-base-200 flex flex-col overflow-hidden transition-all duration-200 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <h3 className="text-base font-bold">Mi calendario</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Cerrar calendario"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mini month header */}
        <div className="px-5 py-3 bg-base-200/40">
          <p className="text-sm font-semibold capitalize text-base-content/70">
            {currentMonth}
          </p>
        </div>

        {/* Events list */}
        <div className="flex-1 overflow-y-auto divide-y divide-base-200">
          {calendarEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-base-200/40 transition-colors duration-150 cursor-pointer"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${typeColorMap[event.type]}`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{event.title}</p>
                <p className="text-xs text-base-content/50">{event.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-base-200">
          <button className="btn btn-ghost btn-sm w-full text-xs text-primary hover:text-primary">
            Ver calendario completo
          </button>
        </div>
      </div>

      {/* FAB Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg hover:scale-110 hover:shadow-xl active:scale-105 transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy"
        aria-label="Abrir calendario"
        aria-expanded={isOpen}
      >
        <Calendar className="w-6 h-6" />

        {/* Badge */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
          {calendarEvents.length}
        </span>
      </button>
    </div>
  )
}
