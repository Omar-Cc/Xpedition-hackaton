import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import WeekCalendar from '@/src/features/plan30d/components/WeekCalendar'
import SkillGapsCard from '@/src/features/plan30d/components/SkillGapsCard'
import TodayTask from '@/src/features/plan30d/components/TodayTask'
import WeekProgressPanel from '@/src/features/plan30d/components/WeekProgressPanel'
import { daysRemaining, targetJob, companyChips } from '@/src/features/plan30d/data/mock-data'

function PlanHeader() {
  return (
    <PageHeader
      title="Mi Plan de 30 Días"
      subtitle={`Objetivo: ${targetJob} · ${daysRemaining} días restantes`}
      left={
        <div
          className="radial-progress text-white flex-shrink-0 text-xs"
          style={{ '--value': String(Math.round((30 - daysRemaining) / 30 * 100)), '--size': '4.5rem', '--thickness': '4px' } as React.CSSProperties}
          role="progressbar"
        >
          <div className="text-center leading-tight">
            <div className="text-lg font-bold">{daysRemaining}</div>
            <div className="text-[9px] opacity-70">días</div>
          </div>
        </div>
      }
      right={
        <div className="flex items-center gap-2">
          {companyChips.map((c) => (
            <span key={c.code} className={`${c.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {c.code}
            </span>
          ))}
          <div className="ml-4 bg-white/10 rounded-xl px-3 py-2">
            <p className="text-xs font-semibold text-white">Racha de 7 días</p>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-success text-xs">✓</span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

export default function Plan30dPage() {
  return (
    <PageShell>
      <PlanHeader />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <WeekCalendar />
            <SkillGapsCard />
          </div>
          <TodayTask />
          <WeekProgressPanel />
        </div>
      </main>
    </PageShell>
  )
}
