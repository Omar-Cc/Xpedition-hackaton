import { allJobs } from '../data/mock-data'

const statusColorMap = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export default function AllJobsList() {
  return (
    <div className="card bg-base-100 shadow-sm h-full">
      <div className="card-body p-4">
        <h3 className="text-xs uppercase tracking-wide text-base-content/50 font-medium mb-3">
          Todos los empleos
        </h3>
        <div className="flex flex-col gap-2">
          {allJobs.map((job) => (
            <div key={job.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors cursor-pointer">
              <div className="avatar avatar-placeholder flex-shrink-0">
                <div className={`${job.avatarColor} text-white w-9 rounded-lg`}>
                  <span className="text-xs font-bold">{job.initial}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{job.title}</p>
                <p className="text-xs text-base-content/50 truncate">{job.company}</p>
                <p className={`text-xs ${statusColorMap[job.statusColor]}`}>{job.status}</p>
              </div>
              <span className="badge badge-ghost text-xs font-bold flex-shrink-0">{job.matchPercent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
