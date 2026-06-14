'use client'

import { useState, useEffect } from 'react'
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import { ProfileHeader } from '@/src/features/mi-perfil/components/ProfileHeader'
import { DynamicSection } from '@/src/features/mi-perfil/components/DynamicSection'
import { careersList, facultiesList, careerSectionMapping, SectionConfig, FormType } from '@/src/features/mi-perfil/data/career-sections'

// Importación de formularios
import ExperienceForm from '@/src/features/mi-perfil/components/forms/ExperienceForm'
import ProjectsForm from '@/src/features/mi-perfil/components/forms/ProjectsForm'
import TagsForm from '@/src/features/mi-perfil/components/forms/TagsForm'
import CertificatesForm from '@/src/features/mi-perfil/components/forms/CertificatesForm'

export default function MiPerfilPage() {
  const [selectedCareerId, setSelectedCareerId] = useState('software')
  const [visibility, setVisibility] = useState<Record<string, boolean>>({})

  const currentCareer = careersList.find((c) => c.id === selectedCareerId)
  const activeSections: SectionConfig[] = currentCareer ? careerSectionMapping[currentCareer.category] : []

  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {}
    activeSections.forEach((section) => {
      initialVisibility[section.id] = section.isDefaultEnabled
    })
    setVisibility(initialVisibility)
  }, [selectedCareerId]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSection = (sectionId: string) => {
    setVisibility((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const renderForm = (formType: FormType) => {
    switch (formType) {
      case 'experience':
        return <ExperienceForm />
      case 'projects':
        return <ProjectsForm />
      case 'tags':
        return <TagsForm />
      case 'certificates':
        return <CertificatesForm />
      case 'text':
      default:
        return (
          <input
            type="text"
            placeholder="Especifica tu especialización principal o sub-rama de interés..."
            className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        )
    }
  }

  return (
    <PageShell>
      <PageHeader
        title="Mi Perfil Profesional"
        subtitle="Personaliza tu información y destaca tus habilidades ante los reclutadores"
        maxWidthClassName="max-w-6xl"
      />

      <main className="flex-1 overflow-y-auto p-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 max-w-6xl mx-auto">
          
          {/* COLUMNA PRINCIPAL */}
          <div className="flex flex-col gap-6">
            <ProfileHeader />

            {/* Selector de Carrera Mejorado con Facultades */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 text-sm md:text-base mb-1">Programa Académico</h3>
              <p className="text-xs text-slate-500 mb-4">Selecciona tu facultad y carrera para adaptar las secciones de tu perfil.</p>
              <select
                value={selectedCareerId}
                onChange={(e) => setSelectedCareerId(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-700 bg-slate-50 font-medium cursor-pointer"
              >
                {facultiesList.map((faculty) => (
                  <optgroup 
                    key={faculty.facultyName} 
                    label={faculty.facultyName}
                    className="font-bold text-slate-900 bg-white"
                  >
                    {faculty.careers.map((career) => (
                      <option key={career.id} value={career.id} className="font-normal text-slate-700">
                        {career.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Acerca de mí */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 text-sm md:text-base mb-4">Acerca de mí</h3>
              <textarea
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600 resize-none"
                rows={4}
                placeholder="Resume tu perfil profesional, tus objetivos y lo que te apasiona..."
              />
            </div>

            {/* Inyección Dinámica */}
            {activeSections.map((section) => (
              <DynamicSection
                key={section.id}
                title={section.title}
                isVisible={visibility[section.id] || false}
                onToggle={() => toggleSection(section.id)}
              >
                <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded border-l-2 border-slate-400">
                  {section.description}
                </p>
                {renderForm(section.formType)}
              </DynamicSection>
            ))}
          </div>

          {/* COLUMNA LATERAL */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">Estructura del CV</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Activa o desactiva las secciones de tu perfil. Las secciones inactivas no se mostrarán en tu CV final.
              </p>

              <div className="space-y-3">
                {activeSections.map((section) => (
                  <label key={`toggle-${section.id}`} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs md:text-sm text-slate-700 group-hover:text-blue-600 transition-colors truncate max-w-[180px]">
                      {section.title}
                    </span>
                    <input
                      type="checkbox"
                      checked={visibility[section.id] || false}
                      onChange={() => toggleSection(section.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 sticky top-6">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Cambios pendientes</h3>
              <p className="text-xs text-blue-700 mb-4">
                Asegúrate de guardar tus progresos para actualizar tu perfil público de empleabilidad.
              </p>
              <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all text-sm font-semibold active:scale-[0.98]">
                Guardar Perfil
              </button>
            </div>
          </div>

        </div>
      </main>
    </PageShell>
  )
}