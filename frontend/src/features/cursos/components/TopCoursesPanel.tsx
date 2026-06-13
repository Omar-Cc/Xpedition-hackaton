import { Download } from 'lucide-react'
import { topCourses } from '../data/mock-data'

export default function TopCoursesPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-5">
          <h3 className="text-sm font-semibold mb-3">Cursos donde te destacaste</h3>
          <div className="flex flex-col gap-4">
            {topCourses.map((c) => (
              <div key={c.id} className="border border-base-200 rounded-xl p-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <span className="text-xl font-bold text-success">{c.grade}</span>
                </div>
                <p className="text-xs text-base-content/50 mb-2">
                  Nota {c.grade}/20 · {c.professor} · {c.period}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.tags.map((t) => (
                    <span key={t} className="badge badge-soft badge-secondary badge-sm">{t}</span>
                  ))}
                </div>
                <button className="btn btn-success btn-sm text-white w-full">
                  Agregar al CV
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn btn-outline btn-sm w-full gap-2">
        <Download className="w-4 h-4" /> Descargar reporte de habilidades
      </button>
      <button className="btn btn-outline btn-sm w-full">
        ← Volver al plan
      </button>
    </div>
  )
}
