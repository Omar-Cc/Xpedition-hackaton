"use client"

import React from 'react'
import { Heart, X } from 'lucide-react'
import { useJobMatch } from '@/src/contexts/JobMatchContext'

const getMatchColorBg = (percent: number) => {
  if (percent >= 80) return 'bg-emerald-100/40 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40'
  if (percent >= 75) return 'bg-amber-100/40 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40'
  return 'bg-orange-100/40 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-800/40'
}

const getMatchDotColor = (percent: number) => {
  if (percent >= 80) return 'bg-emerald-500'
  if (percent >= 75) return 'bg-amber-500'
  return 'bg-orange-500'
}

export default function GlobalMatchesDrawer() {
  const { matchedJobs, setMatchedJobs, matchesDrawerOpen, setMatchesDrawerOpen } = useJobMatch()

  return (
    <>
      {/* Mis Matches Floating Bubble (Global) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* We removed the warning toggle from the global drawer to keep it local to Job Match */}
        <button
          onClick={() => setMatchesDrawerOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:scale-105 transition-all hover:shadow-primary/30 cursor-pointer"
        >
          <Heart className="h-6 w-6 fill-white/20" />
          {matchedJobs.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-base-100 animate-bounce">
              {matchedJobs.length}
            </span>
          )}
        </button>
      </div>

      {/* Mis Matches Drawer */}
      {matchesDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-base-content/20 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-base-100 shadow-2xl h-full flex flex-col animate-slideLeft">
            <div className="flex items-center justify-between p-6 border-b border-base-200">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                  <Heart className="h-5 w-5 fill-rose-500/20" />
                </div>
                <h2 className="text-xl font-extrabold text-base-content">Mis Matches</h2>
              </div>
              <button onClick={() => setMatchesDrawerOpen(false)} className="rounded-full p-2 hover:bg-base-200 text-base-content/50 transition cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {matchedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                  <Heart className="h-16 w-16 text-base-300 mb-4" />
                  <p className="text-sm font-medium">Aún no tienes matches guardados.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matchedJobs.map(job => (
                    <div key={job.id} className="relative rounded-2xl border border-base-200 p-4 bg-base-100 shadow-sm flex items-start gap-4">
                      <div className={`${job.avatarColor} flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold flex-shrink-0`}>
                        {job.initial}
                      </div>
                      <div className="flex-1 pr-8">
                        <h4 className="text-sm font-bold text-base-content">{job.title}</h4>
                        <p className="text-xs text-base-content/60">{job.company}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold border ${getMatchColorBg(job.matchPercent)}`}>
                            <span className={`h-1 w-1 rounded-full ${getMatchDotColor(job.matchPercent)}`} />
                            {job.matchPercent}% match
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMatchedJobs(prev => prev.filter(m => m.id !== job.id))}
                        className="absolute top-4 right-4 p-1.5 text-base-content/30 hover:text-rose-500 hover:bg-rose-50 rounded-full transition cursor-pointer"
                        title="Quitar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
