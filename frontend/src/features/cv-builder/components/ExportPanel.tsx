import { Download, FileText, Mail, Loader2 } from 'lucide-react'

interface Props {
  isDownloadingPdf: boolean
  isDownloadingDocx: boolean
  onDownloadPdf: () => void
  onDownloadDocx: () => void
  onOpenMailModal: () => void
}

export default function ExportPanel({ isDownloadingPdf, isDownloadingDocx, onDownloadPdf, onDownloadDocx, onOpenMailModal }: Props) {
  return (
    <div className="mt-4 bg-slate-800 rounded-xl p-5 shadow-lg shrink-0">
      <h3 className="font-semibold text-white mb-3 text-sm">Exportar y Enviar</h3>
      <div className="space-y-2.5">
        <button 
          onClick={onDownloadPdf}
          disabled={isDownloadingPdf}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-70"
        >
          {isDownloadingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {isDownloadingPdf ? 'Generando PDF...' : 'Descargar PDF'}
        </button>
        <button 
          onClick={onDownloadDocx}
          disabled={isDownloadingDocx}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium disabled:opacity-70"
        >
          {isDownloadingDocx ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
          {isDownloadingDocx ? 'Procesando Word...' : 'Descargar Word'}
        </button>
        <div className="pt-2 border-t border-slate-600">
          <button 
            onClick={onOpenMailModal}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
          >
            <Mail size={16} className="text-slate-600" />
            Enviar a Reclutador
          </button>
        </div>
      </div>
    </div>
  )
}