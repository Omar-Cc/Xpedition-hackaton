import { MessageCircle, CalendarDays } from 'lucide-react'
import { connections } from '../data/mock-data'

export default function ConnectionsPanel() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="font-semibold text-sm mb-3">
          Tus conexiones ({connections.length})
        </h3>
        {connections.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <div className="avatar avatar-placeholder">
              <div className={`${c.avatarColor} text-white w-10 rounded-full`}>
                <span className="text-sm font-bold">{c.avatarInitial}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-base-content/50">{c.company}</p>
            </div>
            <div className="flex gap-1">
              <button className="btn btn-ghost btn-xs p-1"><MessageCircle className="w-4 h-4" /></button>
              <button className="btn btn-ghost btn-xs p-1"><CalendarDays className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
