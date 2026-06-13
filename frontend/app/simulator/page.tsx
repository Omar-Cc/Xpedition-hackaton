import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import QuestionCard from '@/src/features/simulator/components/QuestionCard'
import MicrophoneCard from '@/src/features/simulator/components/MicrophoneCard'
import SessionInfoCard from '@/src/features/simulator/components/SessionInfoCard'
import PreviousAnswers from '@/src/features/simulator/components/PreviousAnswers'
import { sessionData } from '@/src/features/simulator/data/mock-data'

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
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col gap-4">
            <QuestionCard />
            <MicrophoneCard />
          </div>
          <div className="flex flex-col gap-4">
            <SessionInfoCard />
            <PreviousAnswers />
          </div>
        </div>
      </main>
    </PageShell>
  )
}
