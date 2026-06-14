'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, X, Info } from 'lucide-react'
import { newsItems } from '../data/mock-data'

export default function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || selectedNews) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, selectedNews])

  const news = newsItems[currentIndex]

  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [swipeOccurred, setSwipeOccurred] = useState(false)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setSwipeOccurred(false)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX) {
      const currentX = e.targetTouches[0].clientX
      if (Math.abs(touchStartX - currentX) > 10) {
        setSwipeOccurred(true)
      }
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return
    const touchEndX = e.changedTouches[0].clientX
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (swipeOccurred) {
      e.stopPropagation()
      return
    }
    setSelectedNews(news)
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <h3 className="text-xs font-bold text-base-content/50 uppercase tracking-widest flex items-center gap-2">
        <Info className="w-4 h-4 text-primary" />
        Novedades y Eventos
      </h3>
      
      <div 
        className="card bg-base-100 shadow-sm border border-base-200 cursor-pointer hover:shadow-md transition-all overflow-hidden group relative flex flex-col select-none touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={handleCardClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          key={currentIndex} 
          className="animate-in fade-in slide-in-from-right-3 duration-300 flex flex-col"
        >
          <figure className="relative w-full aspect-[2/1] bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Anuncio UTP
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium bg-black/50 px-3 py-1.5 rounded backdrop-blur-sm text-xs">
                Ver Detalles
              </span>
            </div>
          </figure>
          <div className="p-3 bg-base-100 pr-16 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-base-content line-clamp-1 leading-tight">
              {news.title}
            </h4>
          </div>
        </div>

        {/* Carousel indicators (dots) */}
        <div className="absolute bottom-3 right-3 flex gap-1 z-10" onClick={(e) => e.stopPropagation()}>
          {newsItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'bg-primary w-3.5' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal para ver la noticia/anuncio completo */}
      {selectedNews && (
        <div 
          onClick={() => setSelectedNews(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-base-100 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200"
          >
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
