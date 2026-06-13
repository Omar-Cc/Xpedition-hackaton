'use client'

import { useState } from 'react'
import { CalendarDays, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react'
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
  IntegratedCoursesCard,
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
  // Config Bar States
  const [selectedJobId, setSelectedJobId] = useState<string>(defaultSelectedJobId)
  const [duration, setDuration] = useState<PlanDuration>(30)
  const [academicLoad, setAcademicLoad] = useState<AcademicLoad>('Normal')

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

            {/* 3-Column 9-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              
              {/* Column 1: Timeline & Skill Gaps & Simulation */}
              <div key={`col1-${selectedJobId}-${duration}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 1: Cronograma del plan */}
                <WeekCalendar
                  duration={duration}
                  weekDays={weekDays}
                  monthDays={monthDays}
                />
                
                {/* Card 2: Brechas frente al puesto */}
                <SkillGapsCard skills={skills} />
                
                {/* Card 7: Simulación recomendada */}
                <SimulationRecommendationCard simulation={simulation} />
              </div>

              {/* Column 2: Today's Task & Impact & Mentorship */}
              <div key={`col2-${selectedJobId}-${academicLoad}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 3: Tarea de hoy */}
                <TodayTask task={todayTask} academicLoad={academicLoad} />
                
                {/* Card 4: Impacto del plan */}
                <WeekImpactCard impact={impact} />
                
                {/* Card 8: Mentoría sugerida */}
                <MentorshipRecommendationCard mentor={mentor} />
              </div>

              {/* Column 3: Urgency & Quick Wins & Integrated Courses */}
              <div key={`col3-${selectedJobId}`} className="flex flex-col gap-6 animate-cardIn">
                {/* Card 5: Fecha límite / urgencia */}
                <DeadlineUrgencyCard
                  daysLeft={selectedJob.daysLeft}
                  position={selectedJob.position}
                  company={selectedJob.company}
                />
                
                {/* Card 6: Quick wins */}
                <QuickWinsCard quickWins={quickWins} />
                
                {/* Card 9: Cursos y talleres recomendados */}
                <IntegratedCoursesCard courses={courses} />
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
