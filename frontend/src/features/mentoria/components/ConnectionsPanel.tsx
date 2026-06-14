import { MessageCircle, CalendarDays } from 'lucide-react'
import type { Connection } from '../types'

interface ConnectionsPanelProps {
  connections?: Connection[]
  onChat?: (conn: Connection) => void
  onSchedule?: (conn: Connection) => void
}

export default function ConnectionsPanel({
  connections = [],
  onChat,
  onSchedule,
}: ConnectionsPanelProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-slate-100">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm mb-3 text-slate-800 flex items-center justify-between">
          <span>Tus conexiones</span>
          <span className="badge badge-primary badge-sm text-[10px]">{connections.length}</span>
        </h3>
        {connections.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-base-200 rounded-xl bg-slate-50/50">
            <p className="text-xs text-base-content/50">Aún no tienes conexiones.</p>
            <p className="text-[10px] text-base-content/40 mt-1">Conecta con mentores para verlos aquí.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {connections.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="avatar avatar-placeholder">
                  <div className={`${c.avatarColor} text-white w-10 h-10 rounded-full`}>
                    <span className="text-sm font-bold">{c.avatarInitial}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                  <p className="text-xs text-base-content/50 truncate">{c.company}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => onChat?.(c)}
                    className="btn btn-ghost btn-xs p-1 hover:text-violet-600 tooltip" 
                    data-tip="Iniciar Chat"
                    aria-label="Iniciar Chat"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onSchedule?.(c)}
                    className="btn btn-ghost btn-xs p-1 hover:text-primary tooltip" 
                    data-tip="Agendar Sesión"
                    aria-label="Agendar Sesión"
                  >
                    <CalendarDays className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
