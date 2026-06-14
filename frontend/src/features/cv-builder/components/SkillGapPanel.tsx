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
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5 uppercase tracking-wide">
              <Check size={12} /> Encaja con tu perfil
            </span>
            <div className="flex flex-wrap gap-1">
              {atsSummary.fit.map((kw, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 mb-1.5 uppercase tracking-wide">
              <AlertTriangle size={12} /> Brechas (No encaja / Falta)
            </span>
            <div className="flex flex-wrap gap-1">
              {atsSummary.gap.map((kw, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded text-[10px] font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 mt-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">
              <Lightbulb size={12} className="text-amber-500" /> Estrategia recomendada
            </span>
            <p className="text-[11px] text-amber-800 dark:text-amber-200 leading-relaxed">
              {atsSummary.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}