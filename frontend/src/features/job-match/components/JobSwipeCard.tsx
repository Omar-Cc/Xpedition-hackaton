import { featuredJob } from '../data/mock-data'
import SwipeActions from './SwipeActions'

export default function JobSwipeCard() {
  const job = featuredJob
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="card bg-base-100 shadow-md w-full max-w-sm">
        <div className="card-body p-6">
          <div className="flex items-start justify-between mb-3">
            <div className={`avatar avatar-placeholder`}>
              <div className={`${job.avatarColor} text-white w-12 rounded-xl`}>
                <span className="text-lg font-bold">{job.companyInitial}</span>
              </div>
            </div>
            <span className="badge badge-success font-semibold">{job.matchPercent}% match</span>
          </div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-sm text-base-content/60 mb-3">{job.company}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {job.tags.map((t) => (
              <span key={t} className="badge badge-soft badge-secondary badge-sm">{t}</span>
            ))}
          </div>
          <p className="text-sm text-base-content/70">{job.schedule}</p>
          <p className="text-sm text-base-content/70 mb-3">{job.requirement}</p>
          <div className="bg-success/10 text-success text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            {job.highlight}
          </div>
        </div>
      </div>
      <SwipeActions />
      <p className="text-xs text-base-content/40">← saltar · ☆ guardar · aplicar →</p>
    </div>
  )
}
