'use client'

import { Sparkles, Users, Mic, ArrowRight, Eye, CheckCircle2 } from 'lucide-react'
import type { SimulationRecommendation, MentorRecommendation, JobTarget } from '../types'

interface PreparacionAsistidaCardProps {
  simulation: SimulationRecommendation
  mentor: MentorRecommendation
  selectedJob: JobTarget
  status: 'pendiente' | 'lista' | 'completada'
  onStatusChange: (status: 'pendiente' | 'lista' | 'completada') => void
  onSchedule: () => void
  onNavigateToSimulator: () => void
  isSent: boolean
  onSendToMentor: () => void
}

export default function PreparacionAsistidaCard({
  simulation,
  mentor,
  selectedJob,
  status,
  onStatusChange,
  onSchedule,
  onNavigateToSimulator,
  isSent,
  onSendToMentor,
}: PreparacionAsistidaCardProps) {
  const isCompleted = status === 'completada'

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl h-full flex flex-col justify-between">
      <div className="card-body p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Upper content */}
        <div className="space-y-3.5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
                <Mic className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-base-content uppercase tracking-wider">
                Acelerador de postulación
              </h3>
            </div>
            
            {/* Flow pill connector */}
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100 uppercase tracking-wider">
              <span>Simulación IA</span>
              <span className="text-violet-400">→</span>
              <span>Feedback</span>
              <span className="text-violet-400">→</span>
              <span>Mentoría</span>
            </div>
          </div>

          {/* Quick info context */}
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Consolida tu perfil mediante la práctica con IA y la asesoría de un egresado de tu misma carrera.
          </p>

          {/* Simulación Recomendada Details */}
          <div className="p-3.5 rounded-xl bg-violet-50/40 border border-violet-100/40 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulación recomendada</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-base-content leading-snug">
                {simulation.title} ({simulation.duration})
              </h4>
              <p className="text-[11px] text-slate-600 font-medium">
                <span className="font-bold text-slate-700">Temas clave:</span> {simulation.topicList}
              </p>
            </div>
          </div>

          {/* Mentor Sugerido Details */}
          <div className="p-3.5 rounded-xl bg-blue-50/30 border border-blue-100/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
                {mentor.avatarInitial}
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                  Mentor sugerido
                </p>
                <p className="text-xs font-extrabold text-base-content mt-1 leading-none">{mentor.name}</p>
                <p className="text-[11px] text-slate-600 font-medium mt-1 leading-none">
                  {mentor.position} en <span className="font-bold text-blue-600">{mentor.company}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Context Gaps explanation */}
          <div className="text-[11px] font-semibold text-slate-600 leading-normal">
            Basado en tus brechas críticas: <span className="font-extrabold text-slate-700">{selectedJob.mainGaps.join(', ')}</span>.
          </div>
        </div>

        {/* Buttons and controls */}
        <div className="space-y-3 pt-2">
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {status === 'pendiente' && (
              <button
                onClick={() => onStatusChange('lista')}
                className="btn btn-sm bg-violet-600 border-none hover:bg-violet-500 text-white flex-1 rounded-xl text-xs gap-1.5 font-bold cursor-pointer min-h-[36px]"
              >
                <span>Generar simulación</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}

            {status === 'lista' && (
              <button
                onClick={onNavigateToSimulator}
                className="btn btn-sm bg-violet-600 border-none hover:bg-violet-500 text-white flex-1 rounded-xl text-xs gap-1.5 font-bold cursor-pointer min-h-[36px]"
              >
                <span>Iniciar simulación</span>
                <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
              </button>
            )}

            {status === 'completada' && (
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <button
                  onClick={onNavigateToSimulator}
                  className="btn btn-sm bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 flex-1 rounded-xl text-xs gap-1.5 font-bold cursor-pointer min-h-[36px]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver feedback IA</span>
                </button>
                <button
                  onClick={onSendToMentor}
                  disabled={isSent}
                  className={`btn btn-sm flex-1 rounded-xl text-xs gap-1.5 font-bold cursor-pointer min-h-[36px] ${
                    isSent
                      ? 'btn-disabled bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 border-none'
                  }`}
                >
                  {isSent ? (
                    <>
                      <span>Enviado</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <span>Enviar a mentor</span>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={onSchedule}
              className="btn btn-sm btn-outline border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-xl text-xs font-bold cursor-pointer min-h-[36px] px-4"
            >
              Agendar mentoría
            </button>
          </div>

          {/* Hackathon demo controller inside card for convenience */}
          <div className="flex items-center justify-between gap-1 pt-2.5 border-t border-slate-100 text-[8px] font-bold text-slate-400">
            <span className="uppercase tracking-wider">Demostración:</span>
            <div className="flex gap-1">
              <button
                onClick={() => { onStatusChange('pendiente'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] border transition-all cursor-pointer ${
                  status === 'pendiente' ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-white border-slate-200'
                }`}
              >
                1. Pendiente
              </button>
              <button
                onClick={() => { onStatusChange('lista'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] border transition-all cursor-pointer ${
                  status === 'lista' ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-white border-slate-200'
                }`}
              >
                2. Lista
              </button>
              <button
                onClick={() => { onStatusChange('completada'); }}
                className={`px-1.5 py-0.5 rounded text-[8px] border transition-all cursor-pointer ${
                  status === 'completada' ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-white border-slate-200'
                }`}
              >
                3. Completada
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
