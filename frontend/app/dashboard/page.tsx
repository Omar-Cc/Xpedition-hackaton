import Sidebar from '@/src/components/layout/Sidebar'
import TopBanner from '@/src/components/layout/TopBanner'
import StatsGrid from '@/src/features/dashboard/components/StatsGrid'
import QuickActions from '@/src/features/dashboard/components/QuickActions'
import NewsSection from '@/src/features/dashboard/components/NewsSection'
import MentorshipCard from '@/src/features/dashboard/components/MentorshipCard'
import WeeklyProgress from '@/src/features/dashboard/components/WeeklyProgress'
import InterviewFeedbackCard from '@/src/features/dashboard/components/InterviewFeedbackCard'
import CVHealthCard from '@/src/features/dashboard/components/CVHealthCard'
import TodayTaskCard from '@/src/features/dashboard/components/TodayTaskCard'

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-soft">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBanner />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Columna Principal */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <StatsGrid />
              <QuickActions />
              <InterviewFeedbackCard />
              <NewsSection />
            </div>
            
            {/* Columna Lateral (Right Sidebar) */}
            <div className="flex flex-col gap-5">
              <TodayTaskCard />
              <CVHealthCard />
              <MentorshipCard />
              <WeeklyProgress />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
