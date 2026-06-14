'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import PageShell from '@/src/components/layout/PageShell'
import PageMain from '@/src/components/layout/PageMain'
import PageHeader from '@/src/components/layout/PageHeader'
import JobTargetSelector from '@/src/features/plan30d/components/JobTargetSelector'
import PlanConfigBar from '@/src/features/plan30d/components/PlanConfigBar'
import SkillGapsCard from '@/src/features/plan30d/components/SkillGapsCard'
import TodayTask from '@/src/features/plan30d/components/TodayTask'
import WeekImpactCard from '@/src/features/plan30d/components/WeekImpactCard'
import KanbanBoard from '@/src/features/plan30d/components/KanbanBoard'
import PreparacionAsistidaCard from '@/src/features/plan30d/components/PreparacionAsistidaCard'
import FloatingCalendarButton from '@/src/features/plan30d/components/FloatingCalendarButton'
import type { PlanDuration, AcademicLoad, PlanIntensity, DayStatusType, TaskItem } from '@/src/features/plan30d/types'
import {
  jobTargets,
  defaultSelectedJobId,
  skillGapsByJob,
  quickWinsByJob,
  simulationsByJob,
  mentorshipsByJob,
  initialTasksByJob,
} from '@/src/features/plan30d/data/mock-data'

export default function PlanPage() {
  const router = useRouter()

  // Step state: 1 = Selector, 2 = Execution
  const [step, setStep] = useState<1 | 2>(1)

  // Config Bar States
  const [selectedJobId, setSelectedJobId] = useState<string>(defaultSelectedJobId)
  const [duration, setDuration] = useState<PlanDuration>(30)
  const [academicLoad, setAcademicLoad] = useState<AcademicLoad>('Normal')

  // Interactive flow states
  const [simulationStatus, setSimulationStatus] = useState<'pendiente' | 'lista' | 'completada'>('pendiente')
  const [simulationSent, setSimulationSent] = useState<boolean>(false)

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>([])

  // Reset/load tasks when selectedJobId changes
  useEffect(() => {
    setTasks(initialTasksByJob[selectedJobId] || [])
  }, [selectedJobId])

  // Helper to format event times
  const getEventTime = (dayNumber: number): string => {
    if (dayNumber === 7) return 'Hoy, 3:00 PM'
    if (dayNumber === 8) return 'Mañana, 10:00 AM'
    const diff = dayNumber - 7
    const targetDate = 11 + diff
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const targetDayOfWeekIndex = (3 + diff) % 7
    const positiveDayOfWeekIndex = targetDayOfWeekIndex < 0 ? targetDayOfWeekIndex + 7 : targetDayOfWeekIndex
    const dayName = daysOfWeek[positiveDayOfWeekIndex]
    return `${dayName} ${targetDate}, 10:00 AM`
  }

  // Derived target job details
  const selectedJob = jobTargets.find((j) => j.id === selectedJobId) ?? jobTargets[0]
  const skills = skillGapsByJob[selectedJobId] ?? []
  const quickWins = quickWinsByJob[selectedJobId] ?? []
  const simulation = simulationsByJob[selectedJobId]
  const mentor = mentorshipsByJob[selectedJobId]

  // Dynamic calculations from tasks state
  const todayTask = tasks.find(t => t.dayNumber === 7 && t.status !== 'done') 
    || tasks.find(t => t.dayNumber === 7 && t.status === 'done')
  
  const tomorrowTask = tasks.find(t => t.dayNumber === 8)
  const tomorrowPreview = tomorrowTask 
    ? `Mañana: ${tomorrowTask.title} — ${tomorrowTask.duration}` 
    : 'Mañana: No hay tareas programadas.'

  // Dynamic week calendar days
  const dynamicWeekDays = [5, 6, 7, 8, 9, 10, 11].map((date, idx) => {
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    const tasksForDay = tasks.filter((t) => t.dayNumber === date)
    
    let status: DayStatusType = 'pending'
    if (date === 7) {
      status = tasksForDay.length > 0 && tasksForDay.every(t => t.status === 'done') 
        ? 'completed' 
        : 'today'
    } else if (tasksForDay.length > 0) {
      if (tasksForDay.every(t => t.status === 'done')) {
        status = 'completed'
      } else if (date < 7) {
        status = 'overdue'
      } else {
        const ev = tasksForDay.find(t => t.category === 'evento')
        if (ev) {
          if (ev.title.toLowerCase().includes('entrevista')) status = 'interview'
          else if (ev.title.toLowerCase().includes('mentor')) status = 'mentorship'
          else if (ev.title.toLowerCase().includes('postula')) status = 'application'
          else if (ev.title.toLowerCase().includes('simula')) status = 'simulation'
        }
      }
    }

    return {
      date: 9 + idx,
      dayLabel: labels[idx],
      status,
      taskLabel: tasksForDay[0]?.title
    }
  })

  // Dynamic month calendar days
  const dynamicMonthDays = Array.from({ length: duration }, (_, i) => {
    const date = i + 1
    const tasksForDay = tasks.filter((t) => t.dayNumber === date)
    
    let status: DayStatusType = 'pending'
    if (date === 7) {
      status = tasksForDay.length > 0 && tasksForDay.every(t => t.status === 'done') 
        ? 'completed' 
        : 'today'
    } else if (tasksForDay.length > 0) {
      if (tasksForDay.every(t => t.status === 'done')) {
        status = 'completed'
      } else if (date < 7) {
        status = 'overdue'
      } else {
        const ev = tasksForDay.find(t => t.category === 'evento')
        if (ev) {
          if (ev.title.toLowerCase().includes('entrevista')) status = 'interview'
          else if (ev.title.toLowerCase().includes('mentor')) status = 'mentorship'
          else if (ev.title.toLowerCase().includes('postula')) status = 'application'
          else if (ev.title.toLowerCase().includes('simula')) status = 'simulation'
        }
      }
    }
    
    return {
      date,
      dayLabel: '',
      status,
      taskLabel: tasksForDay[0]?.title
    }
  })

  // Dynamic events
  const dynamicEvents = tasks
    .filter(t => t.status !== 'done')
    .map((t) => {
      let type: 'task' | 'interview' | 'mentorship' | 'deadline' | 'reminder' = 'task'
      if (t.category === 'evento') {
        if (t.title.toLowerCase().includes('entrevista')) type = 'interview'
        else if (t.title.toLowerCase().includes('mentor')) type = 'mentorship'
        else if (t.title.toLowerCase().includes('postula') || t.title.toLowerCase().includes('deadline')) type = 'deadline'
        else type = 'reminder'
      }
      
      return {
        id: t.id,
        title: t.title,
        time: getEventTime(t.dayNumber),
        type
      }
    })

  // Dynamic match metrics
  const doneCount = tasks.filter(t => t.status === 'done').length
  const totalCount = tasks.length
  const currentMatch = Math.min(100, selectedJob.matchPercent + tasks.filter(t => t.status === 'done' && t.dayNumber < 7).length * 2)
  const projectedMatch = Math.min(100, selectedJob.matchPercent + tasks.filter(t => t.status === 'done' || t.dayNumber >= 7).length * 1.5)

  const dynamicImpact = {
    currentMatch,
    projectedMatch,
    targetCompany: selectedJob.company,
    deliverables: [
      { label: 'Prácticas técnicas completadas', done: tasks.filter(t => t.category === 'técnica' && t.status === 'done').length >= 2 },
      { label: 'Simulaciones de entrevista resueltas', done: tasks.some(t => t.title.toLowerCase().includes('simulacro') && t.status === 'done') },
      { label: 'Secciones de CV / LinkedIn mejoradas', done: tasks.some(t => t.category === 'CV' && t.status === 'done') },
      { label: 'Postulación formal enviada', done: tasks.some(t => t.title.toLowerCase().includes('postulación') && t.status === 'done') },
      { label: 'Sesión de mentoría / feedback agendada', done: tasks.some(t => t.title.toLowerCase().includes('mentoría') && t.status === 'done') },
    ]
  }

  // Dynamic Intensity calculations based on Load and Duration
  let intensity: PlanIntensity = 'Media'
  if (academicLoad === 'Semana de exámenes') {
    intensity = 'Baja'
  } else if (academicLoad === 'Semana pesada') {
    intensity = duration <= 7 ? 'Media' : 'Baja'
  } else {
    intensity = duration <= 7 ? 'Alta' : 'Media'
  }

  // Handle plan adjustment triggers
  const handleAdjustPlan = () => {
    setToastMessage(
      `¡Plan ajustado! Se ha recalculado el cronograma para una duración de ${duration} días y carga de "${academicLoad}".`
    )
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  // Handle flow triggers
  const handleSendToMentor = () => {
    setSimulationSent(true)
    setToastMessage(`¡Resumen de simulación enviado con éxito a tu mentor ${mentor.name}!`)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const handleScheduleMentorship = () => {
    setToastMessage(`¡Sesión de mentoría con ${mentor.name} agendada con éxito!`)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const handleNavigateToSimulator = () => {
    router.push('/simulator')
  }

  // Task update callbacks
  const handleUpdateTask = (taskId: string, updates: Partial<TaskItem>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    )
  }

  const handleToggleCheckbox = (taskId: string, checkboxId: string, checked: boolean) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = t.checkboxes?.map((cb) =>
            cb.id === checkboxId ? { ...cb, done: checked } : cb
          )
          return { ...t, checkboxes: updated }
        }
        return t
      })
    )
  }

  const handleStartTask = (taskId: string) => {
    handleUpdateTask(taskId, { status: 'inprogress' })
    setToastMessage('¡Actividad iniciada! Tu sesión de práctica está corriendo.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedBox = t.checkboxes?.map(cb => ({ ...cb, done: true }))
          return { ...t, status: 'done', checkboxes: updatedBox }
        }
        return t
      })
    )
    setToastMessage('🎉 ¡Actividad completada! Tu nivel de compatibilidad ha mejorado.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleAdelantarTask = (taskToAdv: TaskItem, option: 'reemplazar' | 'adicionar') => {
    setTasks((prev) => {
      return prev.map((t) => {
        if (t.id === taskToAdv.id) {
          return { ...t, dayNumber: 7, isAdelantada: true, status: 'inprogress' }
        }
        if (option === 'reemplazar' && t.dayNumber === 7 && t.status !== 'done' && t.id !== taskToAdv.id) {
          return { ...t, dayNumber: 8, isReprogramada: true }
        }
        return t
      })
    })
    setToastMessage(`¡Actividad "${taskToAdv.title}" trasladada a hoy con éxito!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleRecalculatePlan = (option: 'carga' | 'mantener') => {
    if (option === 'carga') {
      setToastMessage('¡Carga de estudio recalculada! Se han redistribuido las tareas futuras para optimizar tus tiempos.')
    } else {
      setToastMessage('Plan mantenido sin cambios adicionales en la carga futura.')
    }
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Dynamic local header title helper
  const getLocalHeaderTitle = () => {
    if (duration === 5) {
      return `Plan intensivo de 5 días`
    }
    if (duration === 7) {
      return `Plan acelerado de 7 días`
    }
    if (duration === 15) {
      return `Plan de preparación de 15 días`
    }
    return `Plan de preparación de 30 días`
  }

  return (
    <PageShell>
      <PageMain className="space-y-8 relative">
        <PageHeader
          title={getLocalHeaderTitle()}
          subtitle={`Objetivo activo: ${selectedJob.position} en ${selectedJob.company}`}
          right={
            <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 w-fit">
              <CalendarDays className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none">
                  Límite de postulación
                </span>
                <span className="text-xs font-bold text-white mt-0.5 leading-none">
                  Faltan {selectedJob.daysLeft} días ({selectedJob.deadlineDate})
                </span>
              </div>
            </div>
          }
        />
        {/* PASO 1: SELECCIONAR OBJETIVO LABORAL */}
        {step === 1 && (
          <section className="space-y-6 animate-cardIn">
            <div className="space-y-3">
              <JobTargetSelector
                jobs={jobTargets}
                selectedJobId={selectedJobId}
                onSelectJob={setSelectedJobId}
              />
            </div>

            {/* Selected Job Summary & Action Button */}
            <div className="bg-base-100 border border-base-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
              <div className="text-sm font-bold text-slate-700">
                Objetivo seleccionado:{' '}
                <span className="text-navy">{selectedJob.position}</span> en{' '}
                <span className="text-navy">{selectedJob.company}</span> ·{' '}
                <span className="text-emerald-600 font-extrabold">{selectedJob.matchPercent}% match</span>
              </div>
              
              <button
                onClick={() => setStep(2)}
                className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl font-bold px-6 cursor-pointer min-h-[38px] transition-all"
              >
                Continuar y generar plan
              </button>
            </div>
          </section>
        )}

        {/* PASO 2: CONFIGURAR Y EJECUTAR PLAN */}
        {step === 2 && (
          <section className="space-y-6 animate-cardIn">
            
            {/* Active Job Compact Summary with Change button */}
            <div className="bg-base-100 border border-base-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 shadow-xs">
              <div className="text-sm font-bold text-slate-700">
                Objetivo activo:{' '}
                <span className="text-navy">{selectedJob.position}</span> en{' '}
                <span className="text-navy">{selectedJob.company}</span> ·{' '}
                <span className="text-emerald-600 font-extrabold">{selectedJob.matchPercent}% match</span>
              </div>
              
              <button
                onClick={() => setStep(1)}
                className="btn btn-outline btn-sm rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50/50 hover:text-blue-700 cursor-pointer font-bold px-4 py-2 min-h-[34px] h-auto"
              >
                Cambiar objetivo
              </button>
            </div>

            {/* 2. CONFIGURACIÓN DEL PLAN */}
            <div className="space-y-3">
              <div>
                <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
                  2. Configuración del Plan
                </h2>
                <p className="text-[11px] text-base-content/40 font-medium">
                  Modifica los parámetros diarios para ajustar automáticamente la intensidad del plan
                </p>
              </div>
              <PlanConfigBar
                duration={duration}
                onChangeDuration={setDuration}
                academicLoad={academicLoad}
                onChangeAcademicLoad={setAcademicLoad}
                deadlineDate={selectedJob.deadlineDate}
                intensity={intensity}
                onAdjust={handleAdjustPlan}
                daysLeft={selectedJob.daysLeft}
              />
            </div>

            {/* 3. PLAN GENERADO */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
                  3. Plan Generado
                </h2>
                <p className="text-[11px] text-base-content/40 font-medium">
                  Tu ruta de preparación adaptada con actividades diarias, brechas a cerrar e integraciones UTP
                </p>
              </div>

              {/* Fila 1: Prioridad de hoy & Acelerador de postulación */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div key={`today-${selectedJobId}-${academicLoad}`} className="animate-cardIn">
                  <TodayTask
                    task={todayTask}
                    tomorrowPreview={tomorrowPreview}
                    academicLoad={academicLoad}
                    quickWins={quickWins}
                    onToggleCheckbox={handleToggleCheckbox}
                    onStartTask={handleStartTask}
                    onCompleteTask={handleCompleteTask}
                  />
                </div>

                <div key={`asistida-${selectedJobId}`} className="animate-cardIn">
                  <PreparacionAsistidaCard
                    simulation={simulation}
                    mentor={mentor}
                    selectedJob={selectedJob}
                    status={simulationStatus}
                    onStatusChange={setSimulationStatus}
                    onSchedule={handleScheduleMentorship}
                    onNavigateToSimulator={handleNavigateToSimulator}
                    isSent={simulationSent}
                    onSendToMentor={handleSendToMentor}
                  />
                </div>
              </div>

              {/* Fila 2: Resumen del plan */}
              <div key={`impact-${selectedJobId}`} className="animate-cardIn">
                <WeekImpactCard impact={dynamicImpact} />
              </div>

              {/* Fila 3: Tablero del plan (Kanban) */}
              <div key={`kanban-board-${selectedJobId}-${duration}`} className="animate-fadeIn">
                <KanbanBoard
                  tasks={tasks}
                  onUpdateTask={handleUpdateTask}
                  onAdelantarTask={handleAdelantarTask}
                  onRecalcularPlan={handleRecalculatePlan}
                />
              </div>

              {/* Fila 4: Brechas críticas */}
              <div key={`gaps-${selectedJobId}`} className="animate-cardIn">
                <SkillGapsCard skills={skills} />
              </div>

            </div>

          </section>
        )}

        {/* Adjust Success Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="px-4 py-3 bg-slate-800 text-white rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 border border-slate-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </PageMain>

      {/* RENDER OUTSIDE TRANSFORMED SECTIONS & OUTSIDE PAGEMAIN TO ENSURE GLOBAL VIEWPORT POSITIONING */}
      {step === 2 && (
        <FloatingCalendarButton
          duration={duration}
          weekDays={dynamicWeekDays}
          monthDays={dynamicMonthDays}
          events={dynamicEvents}
          deadlineDate={selectedJob.deadlineDate}
          daysLeft={selectedJob.daysLeft}
        />
      )}
    </PageShell>
  )
}
