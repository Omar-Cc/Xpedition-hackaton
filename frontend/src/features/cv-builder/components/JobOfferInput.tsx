import { Target, Loader2 } from 'lucide-react'

interface Props {
  atsText: string
  setAtsText: (val: string) => void
  isAnalyzing: boolean
  onAnalyze: () => void
}

export default function JobOfferInput({ atsText, setAtsText, isAnalyzing, onAnalyze }: Props) {
  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-sm border border-base-200 transition-all shrink-0">
      <h3 className="flex items-center gap-2 font-semibold text-base-content mb-2 text-sm">
        <Target size={16} className="text-primary" />
        Análisis de Probabilidad
      </h3>
      <p className="text-xs text-base-content/60 mb-3 leading-relaxed">
        Pega la oferta laboral para calcular tus opciones reales de ser contratado.
      </p>
      <textarea 
        value={atsText}
        onChange={(e) => setAtsText(e.target.value)}
        placeholder="Pega la descripción del puesto aquí..."
        className="w-full p-2.5 rounded-lg border border-base-300 bg-base-100 text-base-content text-xs outline-none focus:ring-2 focus:ring-primary/40 resize-none mb-3"
        rows={3}
      />
      <button 
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="w-full py-2 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors flex justify-center items-center gap-2 cursor-pointer"
      >
        {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : 'Calcular Probabilidad'}
      </button>
    </div>
  )
}