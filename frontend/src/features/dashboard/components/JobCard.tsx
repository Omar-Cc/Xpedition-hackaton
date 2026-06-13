import type { JobMatch } from '../types'

interface JobCardProps {
  job: JobMatch
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="avatar avatar-placeholder">
            <div className={`${job.avatarColor} text-white w-10 rounded-full`}>
              <span className="text-sm font-bold">{job.companyInitial}</span>
            </div>
          </div>
          <span className="badge badge-success text-xs font-semibold">
            {job.matchPercent}% match
          </span>
        </div>
        <h3 className="font-semibold text-sm mt-2">{job.title}</h3>
        <p className="text-xs text-base-content/60">{job.company}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {job.tags.map((tag) => (
            <span key={tag} className="badge badge-outline badge-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
