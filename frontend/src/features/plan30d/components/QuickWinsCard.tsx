'use client'

import { useState, useEffect } from 'react'
import { Sparkles, CheckSquare, Square } from 'lucide-react'
import type { QuickWin } from '../types'

interface QuickWinsCardProps {
  quickWins: QuickWin[]
}

export default function QuickWinsCard({ quickWins }: QuickWinsCardProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  // Reset checked state when job changes
  useEffect(() => {
    const initial: Record<string, boolean> = {}
    for (const win of quickWins) {
      initial[win.id] = win.done
    }
    setCompleted(initial)
  }, [quickWins])

  const toggleWin = (id: string) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const earnedPoints = quickWins
    .filter((win) => completed[win.id])
    .reduce((sum, win) => sum + win.points, 0)

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
              <Sparkles className="h-4.5 w-4.5 text-yellow-600" />
            </div>
            <h3 className="text-sm font-bold text-base-content">
              Quick Wins del día
            </h3>
          </div>
          {earnedPoints > 0 && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 animate-bounce">
              +{earnedPoints}% match ganado
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p className="text-[11px] text-base-content/50 leading-relaxed">
          Acciones rápidas de alto impacto para potenciar tu postulación hoy mismo.
        </p>

        {/* List */}
        <div className="flex flex-col gap-2">
          {quickWins.map((win) => {
            const isDone = completed[win.id] ?? false
            return (
              <button
                key={win.id}
                onClick={() => toggleWin(win.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50/20 border-emerald-100/50'
                    : 'bg-base-200/40 border-base-300/40 hover:bg-base-200/80'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-4.5 h-4.5 text-emerald-600" />
                  ) : (
                    <Square className="w-4.5 h-4.5 text-base-content/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[11px] leading-snug font-medium transition-colors ${
                      isDone ? 'line-through text-base-content/40' : 'text-base-content'
                    }`}
                  >
                    {win.label}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    isDone ? 'bg-emerald-100/50 text-emerald-700' : 'bg-base-300/50 text-base-content/70'
                  }`}
                >
                  +{win.points}%
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
