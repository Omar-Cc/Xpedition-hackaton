import { Sparkles } from 'lucide-react'
import { detectedKeywords } from '../data/mock-data'

export default function JobOfferInput() {
  return (
    <div className="card bg-base-100 shadow-sm h-full">
      <div className="card-body p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-base">Oferta de empleo</h2>

        <input
          type="text"
          placeholder="Pega URL del empleo o busca un puesto..."
          className="input input-bordered w-full"
        />

        <div>
          <p className="text-xs text-base-content/50 mb-2">Palabras clave detectadas por IA</p>
          <div className="flex flex-wrap gap-2">
            {detectedKeywords.map((kw) => (
              <span key={kw.text} className={`badge ${kw.colorClass} badge-md`}>
                {kw.text}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button className="btn btn-success w-full text-white gap-2">
            <Sparkles className="w-4 h-4" />
            Generar mi CV
          </button>
        </div>
      </div>
    </div>
  )
}
