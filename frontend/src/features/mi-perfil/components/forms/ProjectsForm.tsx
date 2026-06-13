'use client'

import { useState } from 'react'
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react'

interface ProjectItem {
  id: string
  title: string
  description: string
  url: string
  impactMetric: string
}

export default function ProjectsForm() {
  const [projects, setProjects] = useState<ProjectItem[]>([])

  const addProject = () => {
    const newProject: ProjectItem = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      url: '',
      impactMetric: '',
    }
    setProjects([...projects, newProject])
  }

  const updateProject = (id: string, field: keyof ProjectItem, value: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative space-y-4">
          <button
            onClick={() => removeProject(project.id)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>

          <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Proyecto / Logro #{index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Título del Proyecto o Logro</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                placeholder="Ej. Sistema Telemetría KTM / Optimización Campaña Financiera"
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Métrica de Impacto / KPIs (Opcional)</label>
              <input
                type="text"
                value={project.impactMetric}
                onChange={(e) => updateProject(project.id, 'impactMetric', e.target.value)}
                placeholder="Ej. Reducción de tiempos en 15% / ROI del 120%"
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Enlace / Evidencia (GitHub, Behance, Drive)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <LinkIcon size={14} />
              </span>
              <input
                type="url"
                value={project.url}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder="https://github.com/tu-usuario/proyecto"
                className="w-full p-2.5 pl-9 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Descripción de la solución o aportación</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Explica qué problema identificaste, qué herramientas usaste y cuál fue la solución final..."
              rows={3}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:text-indigo-600 rounded-xl w-full justify-center text-sm font-medium text-slate-500 transition-all bg-white"
      >
        <Plus size={16} /> Agregar nuevo item estratégico
      </button>
    </div>
  )
}