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

// --- PATRÓN STRATEGY / FACTORY PARA DESCARGAS ---

interface DownloadStrategy {
  execute(elementSelector: string, filename: string): Promise<void>
}

class PdfDownloadStrategy implements DownloadStrategy {
  async execute(elementSelector: string, filename: string): Promise<void> {
    const element = document.querySelector(elementSelector) as HTMLElement | null
    if (!element) {
      throw new Error(`Elemento con selector ${elementSelector} no encontrado`)
    }

    // Importación dinámica para evitar problemas con SSR en Next.js (el objeto window)
    const html2canvas = (await import('html2canvas-pro')).default
    const { jsPDF } = await import('jspdf')

    // Opciones del canvas para capturar con alta definición y soporte de oklch/lab
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    
    // Configuración de dimensiones en pulgadas (tamaño carta / letter: 8.5 x 11 in)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    })

    const imgWidth = 8.5
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
    pdf.save(`${filename}.pdf`)
  }
}

class DocxDownloadStrategy implements DownloadStrategy {
  async execute(elementSelector: string, filename: string): Promise<void> {
    const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } = await import('docx')

    // Creamos el documento real de Word (.docx) estructurado
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // CABECERA
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Eberth Gianfranco Rojas Barbaran",
                bold: true,
                size: 28, // 14pt
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Pre-Analyst / Data Engineering & Business Intelligence",
                italics: true,
                size: 22, // 11pt
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Lima, Perú | github.com/eberth | linkedin.com/in/eberth",
                size: 18, // 9pt
              }),
            ],
          }),
          new Paragraph({ text: "" }), // Espacio

          // PERFIL PROFESIONAL
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "PERFIL PROFESIONAL", bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Estudiante de 9no ciclo de Ingeniería de Software en la Universidad Tecnológica del Perú (UTP). Apasionado por la automatización de procesos y el análisis de datos. Experiencia en la creación de pipelines ETL y dashboards interactivos para la toma de decisiones estratégicas.",
                size: 20, // 10pt
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // EXPERIENCIA LABORAL
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "EXPERIENCIA LABORAL", bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Claro Perú", bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Pre-Analyst Intern (Customer Base Development) | Ene 2026 – Presente", italics: true, size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Desarrollo de \"RPA Claro Campaign Manager\" utilizando Python para la automatización y validación de reportes.", size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Optimización de consultas SQL complejas para la extracción y perfilamiento de bases de clientes.", size: 20 }),
            ],
          }),
          new Paragraph({ text: "" }),

          // PROYECTOS DESTACADOS
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "PROYECTOS DESTACADOS", bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Análisis E-commerce (Proyecto Olist)", bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Implementación de flujos de trabajo ETL utilizando Python para procesar datasets masivos. Modelado multidimensional y creación de visualizaciones avanzadas utilizando expresiones DAX en Power BI.", size: 20 }),
            ],
          }),
          new Paragraph({ text: "" }),

          // EDUCACIÓN
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "EDUCACIÓN", bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Ingeniería de Software - Universidad Tecnológica del Perú (UTP)", bold: true, size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Cursando 9no ciclo", italics: true, size: 20 }),
            ],
          }),
          new Paragraph({ text: "" }),

          // HABILIDADES
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "HABILIDADES TÉCNICAS", bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Python, SQL, Power BI, DAX, Figma, Next.js, ETL", size: 20 }),
            ],
          }),
        ],
      }],
    })

    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.docx`
    link.click()
    URL.revokeObjectURL(url)
  }
}

class DownloadStrategyFactory {
  static getStrategy(format: 'pdf' | 'docx'): DownloadStrategy {
    switch (format) {
      case 'pdf':
        return new PdfDownloadStrategy()
      case 'docx':
        return new DocxDownloadStrategy()
      default:
        throw new Error(`Formato no soportado: ${format}`)
    }
  }
}

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

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (format === 'pdf') setIsDownloadingPdf(true)
    if (format === 'docx') setIsDownloadingDocx(true)

    try {
      const strategy = DownloadStrategyFactory.getStrategy(format)
      await strategy.execute('.cv-sheet', 'cv-eberth-rojas')
      showToast(`CV descargado correctamente en ${format.toUpperCase()}`)
    } catch (error) {
      console.error('Error al descargar:', error)
      showToast(`Error al generar ${format.toUpperCase()}`, 'error')
    } finally {
      if (format === 'pdf') setIsDownloadingPdf(false)
      if (format === 'docx') setIsDownloadingDocx(false)
    }
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
                onDownloadPdf={() => handleDownload('pdf')}
                onDownloadDocx={() => handleDownload('docx')}
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