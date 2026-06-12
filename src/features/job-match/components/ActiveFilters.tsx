import { SlidersHorizontal } from 'lucide-react'
import { activeFilters } from '../data/mock-data'

export default function ActiveFilters() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-base-content/60" />
          <h3 className="text-sm font-semibold">Filtros activos</h3>
        </div>
        <div className="flex flex-col gap-2">
          {activeFilters.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-3 py-1.5 bg-base-200 rounded-lg text-sm">
              <span>{f.label}</span>
              <button className="text-base-content/40 hover:text-base-content ml-2">✕</button>
            </div>
          ))}
        </div>
        <button className="btn btn-outline btn-sm w-full mt-3 rounded-full">
          + Agregar filtro
        </button>
      </div>
    </div>
  )
}
