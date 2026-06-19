import { CheckCircle2, AlertCircle, Check, AlertTriangle, Lightbulb } from 'lucide-react'
import { AtsSummary } from '../types'

interface Props {
  atsScore: number | null
  atsSummary: AtsSummary | null
}

export default function SkillGapPanel({ atsScore, atsSummary }: Props) {
  if (atsScore === null) return null;

  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-sm border border-base-200 shrink-0">
      <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-300">
        <span className="text-xs font-medium text-base-content/70">Probabilidad de conseguirlo:</span>
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-bold ${atsScore > 75 ? 'text-emerald-600' : atsScore > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
            {atsScore}%
          </span>
          {atsScore > 75 ? <CheckCircle2 size={16} className="text-emerald-500"/> : <AlertCircle size={16} className={atsScore > 50 ? "text-amber-500" : "text-rose-500"}/>}
        </div>
      </div>

      {atsSummary && (
        <div className="mt-4 space-y-3 animate-in fade-in duration-300">
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-success mb-2 uppercase tracking-wide">
              <Check size={14} className="stroke-[3]" /> Encaja con tu perfil
            </span>
            <div className="flex flex-wrap gap-1.5">
              {atsSummary.fit.map((kw, i) => (
                <span key={i} className="px-2 py-1 bg-base-200 text-base-content border-l-2 border-success rounded shadow-sm text-[10px] font-bold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-error mb-2 uppercase tracking-wide">
              <AlertTriangle size={14} className="stroke-[2.5]" /> Brechas (No encaja / Falta)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {atsSummary.gap.map((kw, i) => (
                <span key={i} className="px-2 py-1 bg-base-200 text-base-content border-l-2 border-error rounded shadow-sm text-[10px] font-bold">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-base-200 rounded-xl border border-base-300 border-l-4 border-l-warning mt-3 shadow-sm">
            <span className="flex items-center gap-1.5 text-[11px] font-black text-base-content mb-1.5 uppercase tracking-wide">
              <Lightbulb size={14} className="text-warning stroke-[2.5]" /> Estrategia recomendada
            </span>
            <p className="text-[11.5px] text-base-content/80 font-medium leading-relaxed">
              {atsSummary.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}