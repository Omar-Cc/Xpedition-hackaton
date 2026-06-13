'use client'

import { useState } from 'react'
import { Mic } from 'lucide-react'

export default function MicrophoneCard() {
  const [recording, setRecording] = useState(false)

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-6 flex flex-col items-center gap-4">
        <p className="text-lg font-mono font-semibold text-base-content/60">0 : 00</p>
        <button
          onClick={() => setRecording((v) => !v)}
          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${
            recording
              ? 'border-success bg-success/10 text-success animate-pulse'
              : 'border-success text-success hover:bg-success/10'
          }`}
        >
          <Mic className="w-7 h-7" />
        </button>
        <div className="flex items-center gap-1 h-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-base-300 ${recording ? 'animate-pulse' : ''}`}
              style={{ height: `${Math.random() * 12 + 4}px` }}
            />
          ))}
        </div>
        <p className="text-xs text-base-content/40">
          {recording ? 'Grabando... toca para detener' : 'Toca el micrófono para empezar a responder'}
        </p>
      </div>
    </div>
  )
}
