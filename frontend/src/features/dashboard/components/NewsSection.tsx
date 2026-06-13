"use client"
import { useState } from 'react'
import { ExternalLink, X, Info } from 'lucide-react'
import { newsItems } from '../data/mock-data'

export default function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null)

  return (
    <div className="mt-8">
      <h3 className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Info className="w-4 h-4 text-primary" />
        Novedades y Eventos
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((news) => (
          <div 
            key={news.id} 
            className="card bg-base-100 shadow-sm border border-base-200 cursor-pointer hover:shadow-md transition-all overflow-hidden group"
            onClick={() => setSelectedNews(news)}
          >
            <figure className="h-40 relative w-full overflow-hidden">
              <img 
                src={news.imageUrl} 
                alt={news.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm text-sm">
                  Ampliar Anuncio
                </span>
              </div>
            </figure>
            <div className="p-4 bg-base-100">
              <h4 className="text-sm font-semibold text-base-content line-clamp-2 leading-tight">
                {news.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver la noticia/anuncio completo */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-base-100 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-10 btn btn-circle btn-sm btn-ghost bg-black/40 hover:bg-black/60 text-white border-none"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative w-full bg-base-300 flex-1 overflow-auto flex items-center justify-center p-4">
              <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title} 
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-lg"
              />
            </div>
            
            <div className="p-6 bg-base-100 border-t border-base-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-base-content">{selectedNews.title}</h3>
                <p className="text-sm text-base-content/70 mt-1">
                  Asegura tu cupo e inscríbete para participar en esta actividad de la UTP.
                </p>
              </div>
              <a 
                href={selectedNews.link} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary w-full sm:w-auto shrink-0 shadow-md shadow-primary/20"
              >
                Inscríbete Aquí
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
