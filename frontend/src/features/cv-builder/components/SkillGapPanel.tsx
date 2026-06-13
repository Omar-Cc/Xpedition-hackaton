import { CheckCircle2, AlertCircle, Check, AlertTriangle, Lightbulb } from 'lucide-react'
import { AtsSummary } from '../types'

interface Props {
  atsScore: number | null
  atsSummary: AtsSummary | null
}

export default function SkillGapPanel({ atsScore, atsSummary }: Props) {
  if (atsScore === null) return null;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 shrink-0">
      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
        <span className="text-xs font-medium text-slate-600">Probabilidad de conseguirlo:</span>
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
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mb-1.5 uppercase tracking-wide">
              <Check size={12} /> Encaja con tu perfil
            </span>
            <div className="flex flex-wrap gap-1">
              {atsSummary.fit.map((kw, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 mb-1.5 uppercase tracking-wide">
              <AlertTriangle size={12} /> Brechas (No encaja / Falta)
            </span>
            <div className="flex flex-wrap gap-1">
              {atsSummary.gap.map((kw, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded text-[10px] font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100 mt-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 mb-1">
              <Lightbulb size={12} className="text-amber-600" /> Estrategia recomendada
            </span>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              {atsSummary.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}