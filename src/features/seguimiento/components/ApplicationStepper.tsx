import Link from 'next/link'
import { Check } from 'lucide-react'
import { applicationSteps } from '../data/mock-data'

export default function ApplicationStepper() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-base-200">
          <div className="avatar avatar-placeholder">
            <div className="bg-red-500 text-white w-11 rounded-xl">
              <span className="text-base font-bold">S</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Junior Data Analyst</p>
            <p className="text-xs text-base-content/60">Scotiabank</p>
            <span className="badge badge-soft badge-secondary badge-sm mt-0.5">Fase 3: Entrevista RRHH</span>
          </div>
        </div>

        <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wide mb-3">
          Progreso de postulación
        </h3>
        <div className="flex flex-col gap-0">
          {applicationSteps.map((step, i) => (
            <div key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === 'done' ? 'bg-success text-white' :
                  step.status === 'active' ? 'bg-success text-white ring-4 ring-success/20' :
                  'bg-base-200 text-base-content/30'
                }`}>
                  {step.status === 'done' ? <Check className="w-4 h-4" /> :
                   step.status === 'active' ? <div className="w-2.5 h-2.5 bg-white rounded-full" /> :
                   <div className="w-2.5 h-2.5 bg-base-300 rounded-full" />}
                </div>
                {i < applicationSteps.length - 1 && (
                  <div className={`w-0.5 h-8 ${step.status === 'done' ? 'bg-success' : 'bg-base-200'}`} />
                )}
              </div>
              <div className="pb-4">
                <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-base-content/40' : ''}`}>
                  {step.label}
                </p>
                {step.sublabel && (
                  <p className="text-xs text-base-content/50">{step.sublabel}</p>
                )}
                {step.status === 'active' && step.badge && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge badge-warning badge-soft badge-xs`}>{step.badge}</span>
                    <Link href="/simulator" className="text-xs text-primary hover:underline">Preparar con IA →</Link>
                  </div>
                )}
                {step.badge && step.status === 'done' && (
                  <progress className="progress progress-success w-full h-1.5 mt-1" value={82} max={100} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
