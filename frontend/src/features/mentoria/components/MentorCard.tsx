import { Heart, Calendar, X, Star } from 'lucide-react'
import { featuredMentor } from '../data/mock-data'
import type { MentorProfile } from '../types'

export interface MentorReview {
  author: string
  rating: number
  comment: string
}

interface MentorCardProps {
  mentor?: MentorProfile
  onConnect?: () => void
  onSchedule?: () => void
  onSkip?: () => void
  isConnected?: boolean
  reviews?: MentorReview[]
}

export default function MentorCard({
  mentor,
  onConnect,
  onSchedule,
  onSkip,
  isConnected = false,
  reviews = [],
}: MentorCardProps) {
  const m = mentor || featuredMentor

  return (
    <div className="card bg-base-100 shadow-sm border border-slate-100">
      <div className="card-body p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-base-200 pb-6 md:pb-0 md:pr-6">
            <div className="relative mb-3">
              <div className="avatar avatar-placeholder">
                <div className={`${m.avatarColor} text-white w-24 rounded-full`}>
                  <span className="text-3xl font-bold">{m.avatarInitial}</span>
                </div>
              </div>
              {m.isOnline && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
            <h2 className="text-lg font-bold">{m.name}</h2>
            <p className="text-sm text-base-content/60">{m.career} — {m.semester}</p>
            <span className="badge badge-soft badge-primary mt-2 text-xs">En: {m.company}</span>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {m.skills.map((s) => (
                <span key={s} className="badge badge-soft badge-secondary badge-sm text-[10px]">{s}</span>
              ))}
            </div>
            <p className="text-sm font-medium mt-4 flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              {m.rating} · {m.sessions} sesiones realizadas
            </p>

            <div className="w-full mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-100/50 text-left">
              <div className="flex justify-between text-[11px] font-semibold mb-1 text-slate-600">
                <span>Cupos de mentoría este mes:</span>
                <span className="text-violet-600 font-bold">{m.sessionsBooked}/10 ocupados</span>
              </div>
              <progress className="progress progress-primary w-full h-2 bg-slate-200" value={m.sessionsBooked} max="10"></progress>
              <p className="text-[9px] text-slate-400 mt-1 leading-tight">Máximo 10 estudiantes al mes para tutorías personalizadas.</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs text-violet-600 font-bold tracking-wide uppercase">Perfil del Mentor</span>
              <h3 className="font-semibold text-lg mb-1">{m.name}</h3>
              <p className="text-xs text-base-content/50 mb-2">{m.career} · {m.semester} en UTP</p>
              <p className="text-sm text-base-content/75 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                "{m.bio}"
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button 
                onClick={onConnect}
                className={`btn gap-2 text-white transition-all duration-200 ${isConnected ? 'btn-neutral' : 'btn-success'}`}
              >
                <Heart className={`w-4 h-4 ${isConnected ? 'fill-white' : ''}`} /> 
                {isConnected ? 'Conectado' : 'Conectar'}
              </button>
              <button 
                onClick={onSchedule}
                className="btn btn-primary text-white gap-2 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" /> Agendar sesión
              </button>
              <button 
                onClick={onSkip}
                className="btn btn-outline gap-2"
              >
                <X className="w-4 h-4" /> Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {reviews && reviews.length > 0 && (
          <div className="mt-6 border-t border-base-200 pt-5 text-left">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-3">
              <Star className="w-4 h-4 text-warning fill-warning animate-pulse" />
              Recomendaciones de Alumnos ({reviews.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100/80 text-xs">
                  <div className="flex justify-between items-center mb-1.5 font-semibold text-slate-700">
                    <span>{r.author}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                      {'★'.repeat(Math.round(r.rating))} · {r.rating}
                    </span>
                  </div>
                  <p className="text-slate-500 italic text-[11px] leading-relaxed">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
