import { FileCheck, Sparkles } from 'lucide-react'

export default function CVHealthCard() {
  return (
    <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <FileCheck className="w-24 h-24 text-emerald-900" />
      </div>
      <div className="card-body p-5 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-emerald-900">Salud de tu CV</h3>
        </div>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-black text-emerald-700 tracking-tighter">85%</span>
          <span className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">Atractivo</span>
        </div>
        
        <p className="text-sm text-emerald-800 mb-5 leading-relaxed pr-4">
          Tu CV es muy fuerte en <strong>Python y SQL</strong>, pero le faltan palabras clave de <strong>Liderazgo</strong> y <strong>Comunicación</strong>.
        </p>
        
        <button className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700 border-none w-full shadow-sm shadow-emerald-600/20 group">
          <Sparkles className="w-4 h-4 mr-1 text-emerald-200 group-hover:text-white transition-colors" />
          Mejorar CV con IA
        </button>
      </div>
    </div>
  )
}
