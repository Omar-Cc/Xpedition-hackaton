import { LayoutTemplate } from 'lucide-react'
import { TemplateType } from '../types'

interface Props {
  activeTemplate: TemplateType
  onSelect: (template: TemplateType) => void
}

export default function TemplateSelector({ activeTemplate, onSelect }: Props) {
  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-sm border border-base-200 shrink-0">
      <h3 className="flex items-center gap-2 font-semibold text-base-content mb-4 text-sm">
        <LayoutTemplate size={16} className="text-primary" />
        Plantilla LaTeX
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onSelect('tech')}
          className={`p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${activeTemplate === 'tech' ? 'border-primary bg-primary/10 text-primary' : 'border-base-300 text-base-content/70 hover:border-base-400 hover:bg-base-200'}`}
        >
          Tech Modern
        </button>
        <button 
          onClick={() => onSelect('classic')}
          className={`p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${activeTemplate === 'classic' ? 'border-primary bg-primary/10 text-primary' : 'border-base-300 text-base-content/70 hover:border-base-400 hover:bg-base-200'}`}
        >
          Harvard Classic
        </button>
      </div>
    </div>
  )
}