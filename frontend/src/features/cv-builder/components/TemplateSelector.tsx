import { LayoutTemplate } from 'lucide-react'
import { TemplateType } from '../types'

interface Props {
  activeTemplate: TemplateType
  onSelect: (template: TemplateType) => void
}

export default function TemplateSelector({ activeTemplate, onSelect }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 shrink-0">
      <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 text-sm">
        <LayoutTemplate size={16} className="text-blue-600" />
        Plantilla LaTeX
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onSelect('tech')}
          className={`p-3 rounded-lg border text-xs font-medium transition-all ${activeTemplate === 'tech' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
        >
          Tech Modern
        </button>
        <button 
          onClick={() => onSelect('classic')}
          className={`p-3 rounded-lg border text-xs font-medium transition-all ${activeTemplate === 'classic' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
        >
          Harvard Classic
        </button>
      </div>
    </div>
  )
}