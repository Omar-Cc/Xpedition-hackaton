'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Clock, Sparkles, CheckSquare, Square, CheckCircle2 } from 'lucide-react'
import type { TaskItem, AcademicLoad, QuickWin } from '../types'

const CATEGORY_STYLES: Record<
  TaskItem['category'],
  { badge: string; label: string }
> = {
  técnica: { badge: 'bg-violet-100 text-violet-700 border-violet-200 border', label: 'Técnica' },
  CV: { badge: 'bg-amber-100 text-amber-700 border-amber-200 border', label: 'CV' },
  evento: { badge: 'bg-blue-100 text-blue-700 border-blue-200 border', label: 'Evento' },
  repaso: { badge: 'bg-slate-100 text-slate-700 border-slate-200 border', label: 'Repaso' },
}

interface TodayTaskProps {
  task: TaskItem | undefined
  tomorrowPreview: string
  academicLoad: AcademicLoad
  quickWins: QuickWin[]
  onToggleCheckbox: (taskId: string, checkboxId: string, checked: boolean) => void
  onStartTask: (taskId: string) => void
  onCompleteTask: (taskId: string) => void
}

export default function TodayTask({
  task,
  tomorrowPreview,
  academicLoad,
  quickWins,
  onToggleCheckbox,
  onStartTask,
  onCompleteTask,
}: TodayTaskProps) {
  const [completedWins, setCompletedWins] = useState<Record<string, boolean>>({})

  // Reset quick wins when job/quickWins change
  useEffect(() => {
    const initial: Record<string, boolean> = {}
    for (const win of quickWins) {
      initial[win.id] = win.done
    }
    setCompletedWins(initial)
  }, [quickWins])

  const toggleWin = (id: string) => {
    setCompletedWins((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const earnedPoints = quickWins
    .filter((win) => completedWins[win.id])
    .reduce((sum, win) => sum + win.points, 0)

  if (!task) {
    return (
      <div className="card bg-base-100 shadow-sm rounded-2xl border-2 border-base-200 p-5 text-center italic text-xs text-slate-400">
        No hay tareas programadas para el día de hoy.
      </div>
    )
  }

  const categoryStyle = CATEGORY_STYLES[task.category] || CATEGORY_STYLES.técnica

  // Adapt duration and subtasks based on academic load
  let duration = task.duration
  let checkboxes = task.checkboxes ?? []
  let noticeText = ''

  if (academicLoad === 'Semana pesada') {
    duration = '30 min'
    checkboxes = (task.checkboxes ?? []).slice(0, 2)
    noticeText = '(Plan reducido por Semana Pesada)'
  } else if (academicLoad === 'Semana de exámenes') {
    duration = '15 min'
    checkboxes = (task.checkboxes ?? []).slice(0, 1)
    noticeText = '(Plan mínimo por Semana de Exámenes)'
  }

  const isCompleted = task.status === 'done'
  const isInProgress = task.status === 'inprogress'

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl border-2 border-base-200 border-l-4 border-l-emerald-500 h-full flex flex-col justify-between">
      <div className="card-body p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top row: label + category badge */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
              Prioridad de hoy
            </p>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${categoryStyle.badge}`}
            >
              {categoryStyle.label}
            </span>
          </div>

          {/* Title */}
          <h2 className={`text-base font-bold leading-snug text-slate-800 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h2>

          {/* Duration + Load badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-slate-500 font-semibold">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">{duration}</span>
            </div>
            {noticeText && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {noticeText}
              </span>
            )}
            {isCompleted && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completada
              </span>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-slate-500 italic leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Checklist */}
          {checkboxes.length > 0 && (
            <div className="flex flex-col gap-2">
              {checkboxes.map((cb) => {
                const isChecked = cb.done

                return (
                  <label
                    key={cb.id}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 cursor-pointer hover:bg-slate-100 transition-colors duration-150 min-h-[38px]"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs checkbox-success"
                      checked={isChecked}
                      disabled={isCompleted}
                      onChange={(e) => onToggleCheckbox(task.id, cb.id, e.target.checked)}
                    />
                    <span
                      className={`text-xs leading-snug transition-all duration-150 ${
                        isChecked
                          ? 'line-through text-slate-400'
                          : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {cb.label}
                    </span>
                  </label>
                )
              })}
            </div>
          )}
        </div>

        <div className="space-y-3 mt-4">
          {/* Primary CTA */}
          {!isCompleted && !isInProgress && (
            <button
              onClick={() => onStartTask(task.id)}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white w-full font-bold btn-sm rounded-xl border-none shadow-sm hover:shadow-md transition-all duration-200 min-h-[36px] cursor-pointer"
            >
              Iniciar sesión de práctica
            </button>
          )}

          {isInProgress && (
            <button
              onClick={() => onCompleteTask(task.id)}
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full font-bold btn-sm rounded-xl border-none shadow-sm hover:shadow-md transition-all duration-200 min-h-[36px] cursor-pointer"
            >
              Marcar como completada
            </button>
          )}

          {isCompleted && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium text-center">
              🎉 ¡Felicidades! Completaste la prioridad de hoy. Puedes ver tus próximos hitos en el calendario.
            </div>
          )}

          {/* Quick Wins Collapsible Details */}
          {quickWins && quickWins.length > 0 && (
            <details className="group border-t border-slate-200 pt-3">
              <summary className="flex items-center justify-between text-xs text-slate-600 cursor-pointer list-none py-1.5 hover:text-slate-800 transition-colors duration-150">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold">Acciones rápidas (Quick Wins)</span>
                </div>
                <div className="flex items-center gap-1">
                  {earnedPoints > 0 && (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      +{earnedPoints}% match
                    </span>
                  )}
                  <ChevronRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform duration-200 ease-out" />
                </div>
              </summary>
              <div className="mt-2 flex flex-col gap-1.5">
                {quickWins.map((win) => {
                  const isDone = completedWins[win.id] ?? false
                  return (
                    <button
                      key={win.id}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWin(win.id)
                      }}
                      className={`flex items-start gap-2 p-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        isDone
                          ? 'bg-emerald-50/20 border-emerald-100/50'
                          : 'bg-slate-50 border-slate-200/50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[10px] leading-snug font-semibold transition-colors ${
                            isDone ? 'line-through text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {win.label}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1 py-0.5 rounded flex-shrink-0 ${
                          isDone ? 'bg-emerald-100/50 text-emerald-700' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        +{win.points}%
                      </span>
                    </button>
                  )
                })}
              </div>
            </details>
          )}

          {/* Tomorrow preview */}
          <details className="group border-t border-slate-200 pt-2">
            <summary className="flex items-center justify-between text-xs text-slate-600 cursor-pointer list-none py-1 hover:text-slate-800 transition-colors duration-150">
              <span className="font-semibold">Ver tarea de mañana</span>
              <ChevronRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform duration-200 ease-out" />
            </summary>
            <div className="mt-1.5 px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200/50">
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                {tomorrowPreview}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
