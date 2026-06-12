import { Heart, Calendar, X, Star } from 'lucide-react'
import { featuredMentor } from '../data/mock-data'

export default function MentorCard() {
  const m = featuredMentor
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="avatar avatar-placeholder">
                <div className={`${m.avatarColor} text-white w-24 rounded-full`}>
                  <span className="text-3xl font-bold">{m.avatarInitial}</span>
                </div>
              </div>
              {m.isOnline && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
              )}
            </div>
            <h2 className="text-lg font-bold">{m.name}</h2>
            <p className="text-sm text-base-content/60">{m.career} — {m.semester}</p>
            <span className="badge badge-soft badge-primary mt-2 text-xs">En: {m.company}</span>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {m.skills.map((s) => (
                <span key={s} className="badge badge-soft badge-secondary badge-sm">{s}</span>
              ))}
            </div>
            <p className="text-xs text-base-content/60 mt-3 leading-relaxed">{m.bio}</p>
            <p className="text-sm font-medium mt-3 flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              {m.rating} · {m.sessions} sesiones
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3">
            <div>
              <h3 className="font-semibold text-base mb-1">{m.name}</h3>
              <p className="text-sm text-base-content/60 mb-1">{m.career} — {m.semester} · {m.company}</p>
              <p className="text-sm text-base-content/70 leading-relaxed">{m.bio}</p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button className="btn btn-success text-white gap-2">
                <Heart className="w-4 h-4" /> Conectar
              </button>
              <button className="btn btn-success text-white gap-2">
                <Calendar className="w-4 h-4" /> Agendar sesión
              </button>
              <button className="btn btn-outline gap-2">
                <X className="w-4 h-4" /> Saltar
              </button>
            </div>
            <p className="text-xs text-base-content/40 text-center mt-1">
              También puedes arrastrar la tarjeta ← →
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
