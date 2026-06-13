import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'
import StatsGrid from '@/src/features/dashboard/components/StatsGrid'
import QuickActions from '@/src/features/dashboard/components/QuickActions'
import JobRecommendations from '@/src/features/dashboard/components/JobRecommendations'
import MentorshipCard from '@/src/features/dashboard/components/MentorshipCard'
import WeeklyProgress from '@/src/features/dashboard/components/WeeklyProgress'
import StreakCard from '@/src/features/dashboard/components/StreakCard'

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-soft">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBanner />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <StatsGrid />
              <QuickActions />
              <JobRecommendations />
            </div>
            <div className="flex flex-col gap-4">
              <MentorshipCard />
              <WeeklyProgress />
              <StreakCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
