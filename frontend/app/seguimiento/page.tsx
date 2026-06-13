import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import ApplicationStepper from '@/src/features/seguimiento/components/ApplicationStepper'
import PrepareCard from '@/src/features/seguimiento/components/PrepareCard'
import GeneralProgress from '@/src/features/seguimiento/components/GeneralProgress'
import InterviewDetailsPanel from '@/src/features/seguimiento/components/InterviewDetailsPanel'
import { activeCompanies } from '@/src/features/seguimiento/data/mock-data'

function ConflictCard() {
  return (
    <div className="card bg-amber-50 border border-amber-200">
      <div className="card-body p-4">
        <p className="text-sm font-semibold text-amber-800 mb-1">⚠ Conflicto de horario</p>
        <p className="text-xs text-amber-700/80 mb-3">
          La entrevista se superpone con tu clase del jueves. ¿Solicitar permiso al profesor?
        </p>
        <div className="flex gap-2">
          <button className="btn btn-warning btn-sm text-white flex-1">Sí, notificar</button>
          <button className="btn btn-ghost btn-sm flex-1">Lo gestiono yo</button>
        </div>
      </div>
    </div>
  )
}

export default function SeguimientoPage() {
  return (
    <PageShell>
      <PageHeader
        title="Seguimiento de postulaciones"
        subtitle="3/3 postulaciones activas — pausa una para agregar una nueva empresa"
        right={
          <div className="flex items-center gap-2">
            {activeCompanies.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <div className={`avatar avatar-placeholder`}>
                  <div className={`${c.avatarColor} text-white w-6 rounded-full`}>
                    <span className="text-xs font-bold">{c.initial}</span>
                  </div>
                </div>
                <span className="text-sm text-white font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        }
      />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ApplicationStepper />
          <div className="flex flex-col gap-4">
            <PrepareCard />
            <ConflictCard />
            <GeneralProgress />
          </div>
          <InterviewDetailsPanel />
        </div>
      </main>
    </PageShell>
  )
}
