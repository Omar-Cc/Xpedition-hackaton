'use client'

import { useState } from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'

interface ExpItem {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

export default function ExperienceForm() {
  const [items, setItems] = useState<ExpItem[]>([])

  const addItem = () => {
    const newItem: ExpItem = {
      id: crypto.randomUUID(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof ExpItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative space-y-4">
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            title="Eliminar registro"
          >
            <Trash2 size={16} />
          </button>
          
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Registro #{index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Empresa / Institución</label>
              <input
                type="text"
                value={item.organization}
                onChange={(e) => updateItem(item.id, 'organization', e.target.value)}
                placeholder="Ej. Claro, Hospital Loayza, Estudio Jurídico..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Cargo o Rol ejercido</label>
              <input
                type="text"
                value={item.role}
                onChange={(e) => updateItem(item.id, 'role', e.target.value)}
                placeholder="Ej. Practicante Pre-Profesional, Voluntario..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de Inicio</label>
              <div className="relative">
                <input
                  type="month"
                  value={item.startDate}
                  onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de Fin</label>
              <input
                type="month"
                value={item.endDate}
                disabled={item.isCurrent}
                onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
            <div className="pb-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={item.isCurrent}
                  onChange={(e) => updateItem(item.id, 'isCurrent', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                Trabajo actual aquí
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Descripción de actividades o logros</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Describe detalladamente tus responsabilidades clave..."
              rows={3}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl w-full justify-center text-sm font-medium text-slate-500 transition-all bg-white"
      >
        <Plus size={16} /> Agregar experiencia o registro
      </button>
    </div>
  )
}