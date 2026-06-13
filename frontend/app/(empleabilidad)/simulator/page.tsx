import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
// Importamos tu nuevo orquestador (asegúrate de que la ruta coincida donde creaste index.tsx)
import SimulatorMain from '@/src/features/simulator' 
import { sessionData } from '@/src/features/simulator/data/mock-data'

// Mantenemos tu barra de progreso intacta porque se ve genial
function QuestionProgress() {
  const { currentQuestion, totalQuestions } = sessionData
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/70">
        Pregunta {currentQuestion} de {totalQuestions}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-5 rounded-full ${
              i < currentQuestion - 1 ? 'bg-success' :
              i === currentQuestion - 1 ? 'bg-white' :
              'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function SimulatorPage() {
  return (
    <PageShell>
      <PageHeader
        title="Simulador de entrevista IA"
        subtitle="Sin límite de intentos — practica hasta sentirte seguro"
        right={<QuestionProgress />}
      />
      
      {/* Aquí inyectamos el nuevo rediseño, eliminando el grid viejo */}
      <main className="flex-1 overflow-y-auto bg-slate-900">
        <SimulatorMain />
      </main>
    </PageShell>
  )
}