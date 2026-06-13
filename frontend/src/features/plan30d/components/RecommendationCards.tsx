'use client'

import { Mic, Users, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react'
import type {
  SimulationRecommendation,
  MentorRecommendation,
  CourseRecommendation,
} from '../types'

// ── Card 7: Simulación Recomendada ──────────────────────────────────
interface SimulationRecommendationCardProps {
  simulation: SimulationRecommendation
}

export function SimulationRecommendationCard({
  simulation,
}: SimulationRecommendationCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
            <Mic className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/80">
            Simulación recomendada
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-base-content leading-snug">
            {simulation.title}
          </h4>
          <p className="text-[11px] text-base-content/50 leading-relaxed">
            <span className="font-semibold text-base-content/70">Temas:</span> {simulation.topicList}
          </p>
          <p className="text-[11px] text-base-content/40 font-medium">
            Duración estimada: {simulation.duration}
          </p>
        </div>

        {/* Button */}
        <button className="btn btn-sm btn-outline border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white hover:border-violet-500 w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 mt-1 cursor-pointer">
          <span>Iniciar simulación</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Card 8: Mentoría Sugerida ───────────────────────────────────────
interface MentorshipRecommendationCardProps {
  mentor: MentorRecommendation
}

export function MentorshipRecommendationCard({
  mentor,
}: MentorshipRecommendationCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 space-y-3">
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
        <div className="flex gap-3 items-start p-2.5 rounded-xl bg-base-200/40 border border-base-300/40">
          <div className="avatar placeholder">
            <div className="bg-blue-600 text-white w-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
              {mentor.avatarInitial}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-base-content">{mentor.name}</p>
            <p className="text-[10px] text-base-content/50 font-medium leading-none">
              {mentor.position} en <span className="font-semibold text-base-content/70">{mentor.company}</span>
            </p>
            <p className="text-[10px] text-base-content/60 leading-normal mt-1.5 italic">
              "{mentor.achievement}"
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="btn btn-sm btn-outline border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 w-full rounded-xl text-xs gap-1.5 font-bold transition-all duration-200 mt-1 cursor-pointer">
          <span>Agendar mentoría</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Card 9: Cursos y Talleres Recomendados (Integrados) ───────────────
interface IntegratedCoursesCardProps {
  courses: CourseRecommendation[]
}

export function IntegratedCoursesCard({ courses }: IntegratedCoursesCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/80">
            Cursos y talleres recomendados
          </h3>
        </div>

        {/* Subtitle / UX context */}
        <p className="text-[10px] text-base-content/50 leading-relaxed border-b border-base-200 pb-2">
          Insumos de tu actividad académica para potenciar tu currículum y cerrar brechas sin duplicar tus portales UTP.
        </p>

        {/* Courses list */}
        <div className="flex flex-col gap-3">
          {courses.map((course, idx) => {
            const isClass = course.source === 'UTP+Class'
            const sourceBadge = isClass
              ? 'bg-red-50 text-red-600 border-red-100'
              : 'bg-indigo-50 text-indigo-600 border-indigo-100'

            return (
              <div
                key={idx}
                className="space-y-1.5 pb-2.5 last:pb-0 border-b border-base-200 last:border-b-0"
              >
                {/* Course Header: Title + Source Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-base-content leading-snug">
                    {course.title}
                  </h4>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase border flex-shrink-0 tracking-wider ${sourceBadge}`}
                  >
                    Fuente: {course.source}
                  </span>
                </div>

                {/* Details */}
                <p className="text-[10px] text-base-content/50 leading-normal">
                  {course.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100 w-fit">
                  <span>{course.benefit}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* External Link Shortcuts */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href="https://class.utp.edu.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-base-200/50 hover:bg-base-200 text-[10px] font-semibold text-base-content/60 rounded-xl transition-all duration-150 border border-base-300/30"
          >
            <span>Ir a UTP+Class</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://portal.utp.edu.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-base-200/50 hover:bg-base-200 text-[10px] font-semibold text-base-content/60 rounded-xl transition-all duration-150 border border-base-300/30"
          >
            <span>Ir a UTP+Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
