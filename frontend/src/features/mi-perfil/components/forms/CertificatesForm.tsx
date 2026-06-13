'use client'

import { useState } from 'react'
import { Plus, Trash2, Award } from 'lucide-react'

interface CertItem {
  id: string
  name: string
  issuer: string
  credentialId: string
}

export default function CertificatesForm() {
  const [certs, setCerts] = useState<CertItem[]>([])

  const addCert = () => {
    const newCert: CertItem = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      credentialId: '',
    }
    setCerts([...certs, newCert])
  }

  const updateCert = (id: string, field: keyof CertItem, value: string) => {
    setCerts(certs.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const removeCert = (id: string) => {
    setCerts(certs.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      {certs.map((cert, index) => (
        <div key={cert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative space-y-4">
          <button
            onClick={() => removeCert(cert.id)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>

          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Documento / Certificación #{index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Nombre de la Credencial / Licencia</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                placeholder="Ej. Introducción a Ciberseguridad, Colegiatura..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Entidad Emisora</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                placeholder="Ej. Cisco Networking Academy, CAL..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Código de Registro / Matrícula</label>
              <input
                type="text"
                value={cert.credentialId}
                onChange={(e) => updateCert(cert.id, 'credentialId', e.target.value)}
                placeholder="Ej. ID del certificado o Nro de Registro"
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addCert}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl w-full justify-center text-sm font-medium text-slate-500 transition-all bg-white"
      >
        <Plus size={16} /> Agregar credencial legal o académica
      </button>
    </div>
  )
}