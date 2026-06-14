'use client'

import { useState } from 'react'
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import { CheckCircle2, AlertCircle } from 'lucide-react'

// Importación de Tipos y Componentes Modulares
import { AtsSummary, TemplateType } from '@/src/features/cv-builder/types'
import TemplateSelector from '@/src/features/cv-builder/components/TemplateSelector'
import JobOfferInput from '@/src/features/cv-builder/components/JobOfferInput'
import SkillGapPanel from '@/src/features/cv-builder/components/SkillGapPanel'
import ExportPanel from '@/src/features/cv-builder/components/ExportPanel'
import CVPreview from '@/src/features/cv-builder/components/CVPreview'
import MailModal from '@/src/features/cv-builder/components/MailModal'

export default function CVBuilderPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('tech')
  const [atsText, setAtsText] = useState('')
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [atsSummary, setAtsSummary] = useState<AtsSummary | null>(null)
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isSendingMail, setIsSendingMail] = useState(false)
  
  const [showMailModal, setShowMailModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAnalyzeAts = () => {
    if (!atsText.trim()) return showToast('Pega una oferta laboral primero', 'error')
    
    setIsAnalyzing(true)
    setAtsScore(null)
    setAtsSummary(null)
    
    // Simulación del motor de Inteligencia / Matching
    setTimeout(() => {
      setAtsScore(78)
      setAtsSummary({
        fit: ['Python', 'SQL', 'Power BI', 'Experiencia en Telecomunicaciones'],
        gap: ['Apache Spark', 'AWS / Cloud', '+2 años de experiencia'],
        suggestion: 'Aunque la oferta pide AWS, resalta cómo lograste la automatización de procesos mediante Python de forma eficiente para equilibrar la falta de experiencia en la nube.'
      })
      setIsAnalyzing(false)
      showToast('Cálculo de probabilidad completado')
    }, 2000)
  }

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true)
    setTimeout(() => { setIsDownloadingPdf(false); showToast('CV descargado correctamente en PDF') }, 2000)
  }

  const handleDownloadDocx = () => {
    setIsDownloadingDocx(true)
    setTimeout(() => { setIsDownloadingDocx(false); showToast('CV descargado correctamente en DOCX') }, 1500)
  }

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingMail(true)
    setTimeout(() => { setIsSendingMail(false); setShowMailModal(false); showToast('CV enviado al reclutador exitosamente') }, 2000)
  }

  return (
    <PageShell>
      <PageHeader
        title="Constructor de CV"
        subtitle="Genera tu currículum optimizado en LaTeX y envíalo directamente a reclutadores."
        maxWidthClassName="max-w-[1400px]"
      />

      <main className="flex flex-col flex-1 p-3 md:p-6 md:pt-2 pt-2 relative min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 max-w-[1400px] mx-auto h-auto lg:h-full w-full">
          
          {/* PANEL LATERAL */}
          <div className="flex flex-col h-auto lg:h-full lg:overflow-hidden">
            <div className="flex-1 lg:overflow-y-auto flex flex-col gap-5 lg:pr-2 lg:pb-2">
              <TemplateSelector 
                activeTemplate={activeTemplate} 
                onSelect={setActiveTemplate} 
              />
              <JobOfferInput 
                atsText={atsText} 
                setAtsText={setAtsText} 
                isAnalyzing={isAnalyzing} 
                onAnalyze={handleAnalyzeAts} 
              />
              <SkillGapPanel 
                atsScore={atsScore} 
                atsSummary={atsSummary} 
              />
              <ExportPanel 
                isDownloadingPdf={isDownloadingPdf}
                isDownloadingDocx={isDownloadingDocx}
                onDownloadPdf={handleDownloadPdf}
                onDownloadDocx={handleDownloadDocx}
                onOpenMailModal={() => setShowMailModal(true)}
              />
            </div>
          </div>

          {/* ÁREA PRINCIPAL */}
          <CVPreview activeTemplate={activeTemplate} />

        </div>
      </main>

      {/* MODALES Y TOASTS */}
      <MailModal 
        isOpen={showMailModal}
        isSending={isSendingMail}
        onClose={() => setShowMailModal(false)}
        onSend={handleSendMail}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`}>
            {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            {toast.message}
          </div>
        </div>
      )}
    </PageShell>
  )
}