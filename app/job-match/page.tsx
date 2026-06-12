import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import ActiveFilters from '@/src/features/job-match/components/ActiveFilters'
import TodayMatches from '@/src/features/job-match/components/TodayMatches'
import JobSwipeCard from '@/src/features/job-match/components/JobSwipeCard'
import AllJobsList from '@/src/features/job-match/components/AllJobsList'

export default function JobMatchPage() {
  return (
    <PageShell>
      <PageHeader
        title="Encuentra tus prácticas"
        subtitle="Desliza para explorar — swipe derecha para aplicar, izquierda para saltar"
      />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 max-w-6xl mx-auto h-full">
          <div className="flex flex-col gap-4">
            <ActiveFilters />
            <TodayMatches />
          </div>
          <div className="flex items-center justify-center py-8">
            <JobSwipeCard />
          </div>
          <AllJobsList />
        </div>
      </main>
    </PageShell>
  )
}
