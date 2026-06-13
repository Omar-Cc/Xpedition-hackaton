import Link from 'next/link'
import JobCard from './JobCard'
import { jobMatches } from '../data/mock-data'

export default function JobRecommendations() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wide text-base-content/50 font-medium">
          Empleos recomendados
        </h2>
        <Link href="/job-match" className="text-xs text-primary font-medium hover:underline">
          Ver todos →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobMatches.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
