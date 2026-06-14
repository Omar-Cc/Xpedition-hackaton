'use client'

import { Mic, Users, GraduationCap, ArrowRight, CheckCircle2, Info, Sparkles, Eye, Check } from 'lucide-react'
import type {
  SimulationRecommendation,
  MentorRecommendation,
  CourseRecommendation,
  JobTarget,
} from '../types'

// ── Card 7: Simulación Recomendada ──────────────────────────────────
interface SimulationRecommendationCardProps {
  simulation: SimulationRecommendation
  status: 'pendiente' | 'lista' | 'completada'
  onStatusChange: (status: 'pendiente' | 'lista' | 'completada') => void
  onSendToMentor: () => void
  isSent: boolean
  onNavigateToSimulator: () => void
  selectedJob: JobTarget
  skills: { skill: string }[]
  courses: { title: string }[]
  todayTask?: { title: string }
}

export function SimulationRecommendationCard({
  simulation,
  status,
  onStatusChange,
  onSendToMentor,
  isSent,
  onNavigateToSimulator,
  selectedJob,
  skills,
  courses,
  todayTask,
}: Readonly<SimulationRecommendationCardProps>) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl h-full flex flex-col justify-between">
      <div className="card-body p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
              <Mic className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/80">
              Simulación recomendada
            </h3>
          </div>
          {/* Status Badge */}
          {status === 'pendiente' && (
            <span className="badge badge-warning badge-xs font-bold px-2 py-1.5 rounded-lg text-[9px] uppercase tracking-wider">
              Recomendada
            </span>
          )}
          {status === 'lista' && (
            <span className="badge badge-info badge-xs font-bold px-2 py-1.5 rounded-lg text-[9px] uppercase tracking-wider animate-pulse">
              Lista para iniciar
            </span>
          )}
          {status === 'completada' && (
            <span className="badge badge-success badge-xs font-bold px-2 py-1.5 rounded-lg text-[9px] text-white uppercase tracking-wider">
              Completada
            </span>
          )}
        </div>

        {/* Dynamic Content depending on state */}
        {status === 'pendiente' && (
          <div className="space-y-3 flex-1">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-base-content leading-snug">
                {simulation.title}
              </h4>
              <p className="text-[11px] text-base-content/50 leading-relaxed">
                <span className="font-semibold text-base-content/70">Temas:</span> {simulation.topicList}
              </p>
              <p className="text-[11px] text-base-content/45 font-semibold">
                Duración recomendada: {simulation.duration}
              </p>
            </div>

            {/* Sustento / Inteligencia de Recomendación */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-violet-700 font-bold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                <span>¿Por qué esta recomendación?</span>
              </div>
              <ul className="text-[10px] text-slate-600 space-y-1.5 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-violet-500 mt-0.5">•</span>
                  <span><strong>Objetivo:</strong> Preparación para postulaciones en <span className="font-bold text-slate-800">{selectedJob.company}</span>.</span>
                </li>
                {skills.length > 0 && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-500 mt-0.5">•</span>
                    <span><strong>Brechas identificadas:</strong> Ayuda a evaluar tu nivel en <span className="font-bold text-slate-800">{skills[0]?.skill}</span>.</span>
                  </li>
                )}
                {courses.length > 0 && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-500 mt-0.5">•</span>
                    <span><strong>Refuerzo complementario:</strong> Alineado con tu curso de <span className="font-bold text-slate-800">{courses[0]?.title}</span>.</span>
                  </li>
                )}
                {todayTask && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-500 mt-0.5">•</span>
                    <span><strong>Tarea del día:</strong> Consolida lo aprendido en: <span className="font-bold text-slate-800">"{todayTask.title}"</span>.</span>
                  </li>
                )}
                <li className="flex items-start gap-1.5">
                  <span className="text-violet-500 mt-0.5">•</span>
                  <span><strong>Urgencia:</strong> Tu límite de postulación es el <span className="font-bold text-rose-600">{selectedJob.deadlineDate}</span>.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {status === 'lista' && (
          <div className="space-y-4 flex-1 flex flex-col justify-center py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-base-content leading-snug">
                {simulation.title}
              </h4>
              <p className="text-[11px] text-base-content/60 leading-normal">
                La sesión de simulación ya ha sido generada por la IA basándose en tus brechas frente a <span className="font-semibold">{selectedJob.company}</span>.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 bg-violet-50/40 p-3 rounded-xl border border-violet-100/40 text-[10px] text-violet-800 font-semibold">
              <div>
                <span className="text-violet-600/60 block text-[9px] uppercase font-bold tracking-wide">Preguntas</span>
                5 preguntas personalizadas
              </div>
              <div>
                <span className="text-violet-600/60 block text-[9px] uppercase font-bold tracking-wide">Tiempo estimado</span>
                15 - 20 minutos
              </div>
            </div>
          </div>
        )}

        {status === 'completada' && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100/80">
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Puntaje obtenido
                </p>
                <p className="text-xl font-black text-emerald-600">88 / 100</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            </div>

            <div className="space-y-1">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                Resumen de feedback IA
              </h5>
              <ul className="text-[11px] text-base-content/70 list-disc list-inside space-y-1 font-medium pl-1 leading-relaxed">
                <li>Contacto visual estable, pero mejorar enfoque.</li>
                <li>Introducir pausas breves al hablar.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Buttons */}
        {status === 'pendiente' && (
          <button
            onClick={() => onStatusChange('lista')}
            className="btn btn-sm btn-primary bg-violet-600 border-violet-600 hover:bg-violet-500 hover:border-violet-500 text-white w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 mt-1 cursor-pointer"
          >
            <span>Generar simulación</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        )}

        {status === 'lista' && (
          <button
            onClick={onNavigateToSimulator}
            className="btn btn-sm btn-primary bg-violet-600 border-violet-600 hover:bg-violet-500 hover:border-violet-500 text-white w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 mt-1 cursor-pointer"
          >
            <span>Iniciar simulación</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </button>
        )}

        {status === 'completada' && (
          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={onNavigateToSimulator}
              className="btn btn-sm btn-outline border-slate-300 text-slate-700 hover:bg-slate-50 w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver feedback detallado</span>
            </button>
            
            <button
              onClick={onSendToMentor}
              disabled={isSent}
              className={`btn btn-sm w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 cursor-pointer ${
                isSent
                  ? 'btn-disabled bg-slate-100 text-slate-400 border-slate-200'
                  : 'btn-outline border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white hover:border-violet-500'
              }`}
            >
              {isSent ? (
                <>
                  <span>Resumen enviado a mentoría</span>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                </>
              ) : (
                <>
                  <span>Enviar resumen a mentoría</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Card 8: Mentoría Sugerida ───────────────────────────────────────
interface MentorshipRecommendationCardProps {
  mentor: MentorRecommendation
  selectedJob: JobTarget
  simulationStatus: 'pendiente' | 'lista' | 'completada'
  simulationSent: boolean
  onSchedule: () => void
}

export function MentorshipRecommendationCard({
  mentor,
  selectedJob,
  simulationStatus,
  simulationSent,
  onSchedule,
}: MentorshipRecommendationCardProps) {
  const isSimulationCompleted = simulationStatus === 'completada'

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl h-full flex flex-col justify-between">
      <div className="card-body p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
            <Users className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/80">
            Mentoría sugerida
          </h3>
        </div>

        {/* Mentor profile */}
        <div className="flex gap-3 items-start p-3 rounded-xl bg-base-200/40 border border-base-300/40">
          <div className="avatar placeholder">
            <div className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
              {mentor.avatarInitial}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-base-content">{mentor.name}</p>
            <p className="text-[10px] text-base-content/50 font-semibold leading-none">
              {mentor.position} en <span className="font-bold text-blue-600">{mentor.company}</span>
            </p>
            <p className="text-[10px] text-base-content/60 leading-normal mt-2 italic">
              "{mentor.achievement}"
            </p>
          </div>
        </div>

        {/* Content details based on flow status */}
        <div className="space-y-2.5 flex-1">
          {isSimulationCompleted ? (
            <div className="space-y-2">
              <div className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50 text-[10px] leading-relaxed font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  {mentor.name} puede revisar tus respuestas de simulación y ayudarte a preparar tu postulación a <strong>{selectedJob.company}</strong>.
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[9px] font-bold text-base-content/65 uppercase tracking-wide">
                  Insumos compartidos para la sesión:
                </h4>
                <ul className="text-[10px] text-base-content/60 space-y-1 font-medium pl-0.5 list-none">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    CV actual y perfil laboral UTP
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Objetivo laboral ({selectedJob.position})
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Brechas detectadas del cargo
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Resumen de simulación IA
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Respuestas débiles detectadas
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2 bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-[10px] text-amber-800 leading-relaxed font-semibold shadow-inner">
                <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>
                  💡 <strong>Tip recomendado:</strong> Completa la simulación IA antes de agendar esta sesión de mentoría para que tu mentor pueda ver tus áreas débiles detectadas.
                </span>
              </div>
              <p className="text-[9px] text-base-content/40 leading-normal font-medium">
                Al agendar, el mentor utilizará de base tu currículum actual y las brechas detectadas para el cargo de {selectedJob.position}.
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={onSchedule}
          className="btn btn-sm btn-outline border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 mt-1 cursor-pointer"
        >
          <span>Agendar mentoría con {mentor.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Card 9: Refuerzos (Cursos y Talleres Recomendados) ───────────────
interface RefuerzosCardProps {
  courses: CourseRecommendation[]
  addedCourses: string[]
  onAddCourse: (title: string) => void
}

export function RefuerzosCard({
  courses,
  addedCourses,
  onAddCourse,
}: RefuerzosCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/85">
              Refuerzos
            </h3>
            <p className="text-[9px] text-base-content/40 font-bold uppercase tracking-wider leading-none mt-0.5">
              Recomendación académica
            </p>
          </div>
        </div>

        {/* Subtitle / UX context */}
        <p className="text-[10px] text-base-content/50 leading-relaxed border-b border-base-200 pb-2">
          Actividades académicas que ayudan a cerrar brechas del objetivo seleccionado.
        </p>

        {/* Courses list */}
        <div className="flex flex-col gap-4">
          {courses.map((course, idx) => {
            const isAdded = addedCourses.includes(course.title)

            return (
              <div
                key={idx}
                className="space-y-2.5 pb-3.5 last:pb-0 border-b border-base-200 last:border-b-0 flex flex-col justify-between"
              >
                {/* Course Header */}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-base-content leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-[10px] text-base-content/50 leading-normal">
                    {course.description}
                  </p>
                </div>

                {/* Details list */}
                <div className="flex flex-wrap items-center gap-2">
                  {course.reinforces && (
                    <div className="text-[9px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5">
                      Refuerza: {course.reinforces}
                    </div>
                  )}
                  {course.impact && (
                    <div className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5">
                      Impacto: {course.impact}
                    </div>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() => onAddCourse(course.title)}
                  className={`btn btn-xs w-full py-1.5 rounded-lg text-[10px] font-bold tracking-tight transition-all duration-150 cursor-pointer ${
                    isAdded
                      ? 'btn-success text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-600'
                      : 'btn-ghost text-slate-600 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-1">
                      <span>Añadido al plan</span>
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                  ) : (
                    <span>{course.actionLabel || 'Añadir al plan'}</span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
