import { X, Loader2, Mail } from 'lucide-react'

interface Props {
  isOpen: boolean
  isSending: boolean
  onClose: () => void
  onSend: (e: React.FormEvent) => void
}

export default function MailModal({ isOpen, isSending, onClose, onSend }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Enviar CV a Reclutador</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSend} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Correo del Reclutador</label>
            <input type="email" required placeholder="ejemplo@empresa.com" className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Asunto</label>
            <input type="text" defaultValue="Postulación - Anibal Jahuar (Data Engineering)" className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Mensaje Breve (Opcional)</label>
            <textarea rows={3} defaultValue="Estimado equipo de selección, adjunto mi CV actualizado generado desde EmpléaUTP para la vacante correspondiente." className="w-full p-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="pt-2">
            <button type="submit" disabled={isSending} className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-70">
              {isSending ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
              {isSending ? 'Enviando correo...' : 'Enviar CV ahora'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}