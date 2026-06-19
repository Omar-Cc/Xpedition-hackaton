'use client'

import { useState } from 'react'
import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'
import { JobMatchProvider } from '@/src/contexts/JobMatchContext'
import GlobalMatchesDrawer from '@/src/components/layout/GlobalMatchesDrawer'
import { Sparkles, X } from 'lucide-react'

const tourSteps = [
  {
    href: "/dashboard",
    title: "Inicio",
    description: "Visualiza tu progreso general, accesos rápidos a las herramientas de empleabilidad y las últimas vacantes recomendadas.",
  },
  {
    href: "/mi-perfil",
    title: "Mi Perfil",
    description: "Gestiona tu información académica, laboral y tus habilidades clave para que la plataforma te recomiende mejores ofertas.",
  },
  {
    href: "/cv-builder",
    title: "CV Builder",
    description: "Crea y descarga un currículum vitae profesional optimizado para sistemas de selección automática (ATS) en el formato oficial UTP.",
  },
  {
    href: "/job-match",
    title: "Job match",
    description: "Encuentra vacantes exclusivas que coinciden con tu perfil y postula de manera directa con un solo clic.",
  },
  {
    href: "/simulator",
    title: "Entrevistas",
    description: "Practica y perfecciona tus habilidades de entrevista con nuestro simulador impulsado por IA que te dará feedback inmediato.",
  },
  {
    href: "/plan-30d",
    title: "Planificación",
    description: "Sigue un plan estructurado de 30 días para organizar tu búsqueda de prácticas y potenciar tu empleabilidad.",
  },
  {
    href: "/cursos",
    title: "Aprende +",
    description: "Accede a cursos rápidos y capacitaciones diseñadas para cubrir las habilidades más demandadas por el mercado.",
  },
  {
    href: "/mentoria",
    title: "Mentoría",
    description: "Conéctate con alumnos experimentados o egresados de la UTP para recibir guía, consejos de reclutamiento y feedback de CV.",
  },
  {
    href: "/seguimiento",
    title: "Seguimiento",
    description: "Registra y haz un seguimiento detallado de cada fase de tus postulaciones (Enviado, Entrevista, Aceptado) en un solo lugar.",
  },
];

export default function EmpleabilidadLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [tutorialStep, setTutorialStep] = useState<number | null>(null)

  const handleStartTutorial = () => {
    setIsSidebarOpen(true)
    setTutorialStep(0)
  }

  const handleSkipTutorial = () => {
    setTutorialStep(null)
    setIsSidebarOpen(false)
  }

  const handleNextStep = () => {
    if (tutorialStep !== null) {
      if (tutorialStep === tourSteps.length - 1) {
        handleSkipTutorial()
      } else {
        setTutorialStep(tutorialStep + 1)
      }
    }
  }

  const handlePrevStep = () => {
    if (tutorialStep !== null && tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1)
    }
  }

  return (
    <JobMatchProvider>
      <div className="min-h-screen bg-bg-soft relative">
        <div className="flex min-h-screen">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onOpen={() => setIsSidebarOpen(true)}
            onClose={() => {
              if (tutorialStep === null) {
                setIsSidebarOpen(false)
              }
            }} 
            activeTutorialHref={tutorialStep !== null ? tourSteps[tutorialStep].href : null}
          />

          <div className="min-w-0 flex-1">
            <div className="sticky top-0 z-50">
              <TopBanner 
                onMenuClick={() => setIsSidebarOpen(true)} 
                onStartTutorial={handleStartTutorial}
              />
            </div>

            {children}
          </div>
        </div>
        <GlobalMatchesDrawer />

        {/* Floating Walkthrough Tutorial Modal */}
        {tutorialStep !== null && (
          <>
            {/* Backdrop overlay */}
            <div 
              onClick={handleSkipTutorial}
              className="fixed inset-0 bg-[#000f37]/45 backdrop-blur-xs z-[125] cursor-default animate-fadeIn"
            />

            {/* Tour Card */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md lg:absolute lg:left-80 lg:top-24 lg:translate-x-0 lg:bottom-auto lg:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl z-[135] animate-fadeIn">
              {/* Header info */}
              <div className="flex items-center justify-between gap-4">
                <span className="bg-violet-50 dark:bg-violet-950/40 text-violet-755 dark:text-violet-300 text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Paso {tutorialStep + 1} de {tourSteps.length}
                </span>
                <button 
                  onClick={handleSkipTutorial}
                  className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 py-1 px-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Saltar</span>
                </button>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h4 className="text-lg font-black text-slate-905 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  {tourSteps[tutorialStep].title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                  {tourSteps[tutorialStep].description}
                </p>
              </div>

              {/* Progress indicator dots */}
              <div className="flex gap-1.5 mt-5">
                {tourSteps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      idx === tutorialStep 
                        ? 'w-6 bg-violet-600' 
                        : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={tutorialStep === 0}
                  onClick={handlePrevStep}
                  className="btn btn-ghost btn-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-3 h-8 font-extrabold disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  Anterior
                </button>
                
                <button
                  onClick={handleNextStep}
                  className="btn btn-primary btn-xs text-white rounded-xl px-4 h-8 font-black cursor-pointer shadow-sm"
                >
                  {tutorialStep === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </JobMatchProvider>
  )
}
