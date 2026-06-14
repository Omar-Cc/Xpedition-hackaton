'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, CheckCircle2, ArrowRight } from 'lucide-react'
import PageShell from '@/src/components/layout/PageShell'
import JobTargetSelector from '@/src/features/plan30d/components/JobTargetSelector'
import PlanConfigBar from '@/src/features/plan30d/components/PlanConfigBar'
import WeekCalendar from '@/src/features/plan30d/components/WeekCalendar'
import SkillGapsCard from '@/src/features/plan30d/components/SkillGapsCard'
import TodayTask from '@/src/features/plan30d/components/TodayTask'
import WeekImpactCard from '@/src/features/plan30d/components/WeekImpactCard'
import DeadlineUrgencyCard from '@/src/features/plan30d/components/DeadlineUrgencyCard'
import QuickWinsCard from '@/src/features/plan30d/components/QuickWinsCard'
import {
  SimulationRecommendationCard,
  MentorshipRecommendationCard,
  RefuerzosCard,
} from '@/src/features/plan30d/components/RecommendationCards'
import type { PlanDuration, AcademicLoad, PlanIntensity } from '@/src/features/plan30d/types'
import {
  jobTargets,
  defaultSelectedJobId,
  weekDays,
  monthDays,
  skillGapsByJob,
  todayTaskByJob,
  weekImpactByJob,
  quickWinsByJob,
  simulationsByJob,
  mentorshipsByJob,
  coursesByJob,
} from '@/src/features/plan30d/data/mock-data'

export default function PlanPage() {
  const router = useRouter()

  // Config Bar States
  const [selectedJobId, setSelectedJobId] = useState<string>(defaultSelectedJobId)
  const [duration, setDuration] = useState<PlanDuration>(30)
  const [academicLoad, setAcademicLoad] = useState<AcademicLoad>('Normal')

  // Interactive flow states
  const [simulationStatus, setSimulationStatus] = useState<'pendiente' | 'lista' | 'completada'>('pendiente')
  const [simulationSent, setSimulationSent] = useState<boolean>(false)
  const [addedCourses, setAddedCourses] = useState<string[]>([])

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Derived target job details
  const selectedJob = jobTargets.find((j) => j.id === selectedJobId) ?? jobTargets[0]
  const skills = skillGapsByJob[selectedJobId] ?? []
  const todayTask = todayTaskByJob[selectedJobId]
  const impact = weekImpactByJob[selectedJobId]
  const quickWins = quickWinsByJob[selectedJobId] ?? []
  const simulation = simulationsByJob[selectedJobId]
  const mentor = mentorshipsByJob[selectedJobId]
  const courses = coursesByJob[selectedJobId] ?? []

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

  const handleAddCourse = (courseTitle: string) => {
    if (addedCourses.includes(courseTitle)) {
      setAddedCourses((prev) => prev.filter((c) => c !== courseTitle))
      setToastMessage(`Se eliminó "${courseTitle}" de tu plan de estudio.`)
    } else {
      setAddedCourses((prev) => [...prev, courseTitle])
      setToastMessage(`¡"${courseTitle}" añadido a tu plan de estudio con éxito!`)
    }
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleNavigateToSimulator = () => {
    // Redirige al simulador
    router.push('/simulator')
  }

  // Dynamic local header title helper
  const getLocalHeaderTitle = () => {
    if (duration === 5) {
      return `Plan intensivo de 5 días para ${selectedJob.position}`
    }
    if (duration === 7) {
      return `Plan acelerado de 7 días para ${selectedJob.position}`
    }
    if (duration === 15) {
      return `Plan de preparación de 15 días para ${selectedJob.position}`
    }
    return `Plan de preparación de 30 días para ${selectedJob.position}`
  }

  return (
    <PageShell>
      {/* Local page wrapper */}
      <main className="flex-1 overflow-y-auto p-6 bg-bg-soft relative">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* LOCAL HEADER: Dynamic title & urgency indicator */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy text-white p-6 rounded-2xl shadow-sm border border-white/5">
            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl transition-all duration-200">
                {getLocalHeaderTitle()}
              </h1>
              <p className="text-xs text-white/60 font-medium">
                Objetivo activo: {selectedJob.position} en {selectedJob.company}
              </p>
            </div>
            
            {/* Dynamic visual badge for deadline urgency */}
            <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 w-fit">
              <CalendarDays className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest leading-none">
                  Límite de postulación
                </span>
                <span className="text-xs font-bold text-white mt-0.5 leading-none">
                  Faltan {selectedJob.daysLeft} días ({selectedJob.deadlineDate})
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: OBJETIVO LABORAL */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
                  1. Objetivo Laboral
                </h2>
                <p className="text-[11px] text-base-content/40 font-medium">
                  Selecciona el puesto objetivo al que deseas postular para recalcular tu plan
                </p>
              </div>
            </div>
            <JobTargetSelector
              jobs={jobTargets}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
            />
          </section>

          {/* SECTION 2: CONFIGURACIÓN DEL PLAN */}
          <section className="space-y-3">
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
            />
          </section>

          {/* SECTION 3: PLAN GENERADO */}
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
                3. Plan Generado
              </h2>
              <p className="text-[11px] text-base-content/40 font-medium">
                Tu ruta de preparación adaptada con actividades diarias, brechas a cerrar e integraciones UTP
              </p>
            </div>

            {/* 3-Column 7-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              
              {/* Column 1: Timeline & Skill Gaps */}
              <div key={`col1-${selectedJobId}-${duration}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 1: Cronograma del plan */}
                <WeekCalendar
                  duration={duration}
                  weekDays={weekDays}
                  monthDays={monthDays}
                />
                
                {/* Card 2: Brechas frente al puesto */}
                <SkillGapsCard skills={skills} />
              </div>

              {/* Column 2: Today's Task & Impact */}
              <div key={`col2-${selectedJobId}-${academicLoad}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 3: Tarea de hoy */}
                <TodayTask task={todayTask} academicLoad={academicLoad} />
                
                {/* Card 4: Impacto del plan */}
                <WeekImpactCard impact={impact} />
              </div>

              {/* Column 3: Urgency & Quick Wins & Refuerzos */}
              <div key={`col3-${selectedJobId}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 5: Fecha límite / urgencia */}
                <DeadlineUrgencyCard
                  daysLeft={selectedJob.daysLeft}
                  position={selectedJob.position}
                  company={selectedJob.company}
                />
                
                {/* Card 6: Quick wins */}
                <QuickWinsCard quickWins={quickWins} />
                
                {/* Card 9: Refuerzos (Cursos y talleres recomendados) */}
                <RefuerzosCard
                  courses={courses}
                  addedCourses={addedCourses}
                  onAddCourse={handleAddCourse}
                />
              </div>

            </div>
          </section>

          {/* SECTION 4: PREPARACIÓN ASISTIDA */}
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
                4. Preparación Asistida
              </h2>
              <p className="text-[11px] text-base-content/40 font-medium">
                Conecta tu práctica simulada con asesoría personalizada: Simulación IA → Feedback → Mentoría
              </p>
            </div>

            <div className="bg-base-100 shadow-sm border border-base-200 rounded-3xl p-6">
              <div className="flex flex-col lg:flex-row items-stretch gap-6">
                
                {/* Card: Simulación recomendada */}
                <div className="flex-1">
                  <SimulationRecommendationCard
                    simulation={simulation}
                    status={simulationStatus}
                    onStatusChange={setSimulationStatus}
                    onSendToMentor={handleSendToMentor}
                    isSent={simulationSent}
                    onNavigateToSimulator={handleNavigateToSimulator}
                    selectedJob={selectedJob}
                    skills={skills}
                    courses={courses}
                    todayTask={todayTask}
                  />
                </div>

                {/* Flow Connector Arrow */}
                <div className="hidden lg:flex flex-col items-center justify-center text-base-content/20 px-4 flex-shrink-0">
                  <span className="text-[9px] font-black uppercase tracking-wider text-base-content/30 mb-1.5">
                    Paso 2
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-400">
                    <ArrowRight className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[9px] font-bold text-base-content/40 mt-1.5">
                    Feedback
                  </span>
                </div>

                {/* Card: Mentoría sugerida */}
                <div className="flex-1">
                  <MentorshipRecommendationCard
                    mentor={mentor}
                    selectedJob={selectedJob}
                    simulationStatus={simulationStatus}
                    simulationSent={simulationSent}
                    onSchedule={handleScheduleMentorship}
                  />
                </div>

              </div>

              {/* Demo Control Switches */}
              <div className="flex flex-wrap items-center justify-end gap-2 mt-6 pt-4 border-t border-slate-100 text-[10px] font-bold text-slate-400">
                <span className="uppercase tracking-wide text-[9px] text-slate-400/80 mr-1">Demostración (Hackathon):</span>
                <button
                  onClick={() => { setSimulationStatus('pendiente'); setSimulationSent(false); }}
                  className={`px-2.5 py-1 rounded-lg border text-[9px] transition-all duration-150 cursor-pointer ${
                    simulationStatus === 'pendiente'
                      ? 'bg-violet-100 border-violet-300 text-violet-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  1. Pendiente
                </button>
                <button
                  onClick={() => { setSimulationStatus('lista'); setSimulationSent(false); }}
                  className={`px-2.5 py-1 rounded-lg border text-[9px] transition-all duration-150 cursor-pointer ${
                    simulationStatus === 'lista'
                      ? 'bg-violet-100 border-violet-300 text-violet-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  2. Lista (Habilitar Iniciar)
                </button>
                <button
                  onClick={() => { setSimulationStatus('completada'); }}
                  className={`px-2.5 py-1 rounded-lg border text-[9px] transition-all duration-150 cursor-pointer ${
                    simulationStatus === 'completada'
                      ? 'bg-violet-100 border-violet-300 text-violet-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  3. Completada (Feedback IA)
                </button>
              </div>

            </div>
          </section>

        </div>

        {/* Adjust Success Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="px-4 py-3 bg-slate-800 text-white rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 border border-slate-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  )
}
