'use client'

import { useState } from 'react'
import { cvSteps } from '../data/mock-data'

export default function CVStepperTabs() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="flex gap-0 border-b border-base-200">
      {cvSteps.map((step) => {
        const isActive = step.id === activeStep
        const isPast = step.id < activeStep
        return (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              isActive
                ? 'border-primary text-primary bg-primary/5'
                : isPast
                  ? 'border-transparent text-base-content/50 hover:text-base-content'
                  : 'border-transparent text-base-content/40 cursor-not-allowed'
            }`}
            disabled={step.id > activeStep}
          >
            {step.id}. {step.label}
          </button>
        )
      })}
    </div>
  )
}
