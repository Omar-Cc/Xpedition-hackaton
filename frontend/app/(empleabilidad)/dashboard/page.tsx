import StatsGrid from '@/src/features/dashboard/components/StatsGrid'
import QuickActions from '@/src/features/dashboard/components/QuickActions'
import NewsSection from '@/src/features/dashboard/components/NewsSection'
import MentorshipCard from '@/src/features/dashboard/components/MentorshipCard'
import WeeklyProgress from '@/src/features/dashboard/components/WeeklyProgress'
import InterviewFeedbackCard from '@/src/features/dashboard/components/InterviewFeedbackCard'

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          <StatsGrid />
          <QuickActions />
          <InterviewFeedbackCard />
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <MentorshipCard />
          <WeeklyProgress />
          <NewsSection />
        </div>
      </div>
    </main>
  )
}