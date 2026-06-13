'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import JobTargetSelector from '@/src/features/plan30d/components/JobTargetSelector'
import AcademicLoadSelector from '@/src/features/plan30d/components/AcademicLoadSelector'
import WeekCalendar from '@/src/features/plan30d/components/WeekCalendar'
import SkillGapsCard from '@/src/features/plan30d/components/SkillGapsCard'
import TodayTask from '@/src/features/plan30d/components/TodayTask'
import NextActionCard from '@/src/features/plan30d/components/NextActionCard'
import WeekImpactCard from '@/src/features/plan30d/components/WeekImpactCard'
import FloatingCalendarButton from '@/src/features/plan30d/components/FloatingCalendarButton'
import type { AcademicLoad } from '@/src/features/plan30d/types'
import {
  daysRemaining,
  jobTargets,
  defaultSelectedJobId,
  companyChips,
  weekDays,
  monthDays,
  skillGapsByJob,
  todayTaskByJob,
  weekImpactByJob,
  nextActionByJob,
} from '@/src/features/plan30d/data/mock-data'

export default function Plan30dPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>(defaultSelectedJobId)
  const [academicLoad, setAcademicLoad] = useState<AcademicLoad>('Normal')

  const selectedJob = jobTargets.find((j) => j.id === selectedJobId) ?? jobTargets[0]
  const skills = skillGapsByJob[selectedJobId] ?? []
  const todayTask = todayTaskByJob[selectedJobId]
  const impact = weekImpactByJob[selectedJobId]
  const nextAction = nextActionByJob[selectedJobId]

  return (
    <PageShell>
      {/* Page Header */}
      <PageHeader
        title="Mi Plan de 30 Días"
        subtitle={`Objetivo: ${selectedJob.position} · ${daysRemaining} días restantes`}
        left={
          <div
            className="radial-progress text-white shrink-0 text-xs"
            style={
              {
                '--value': String(Math.round(((30 - daysRemaining) / 30) * 100)),
                '--size': '4.5rem',
                '--thickness': '4px',
              } as React.CSSProperties
            }
            role="progressbar"
            aria-valuenow={Math.round(((30 - daysRemaining) / 30) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
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
              <span
                key={c.code}
                className={`${c.color} text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm`}
              >
                {c.code}
              </span>
            ))}
            <div className="ml-4 bg-white/10 rounded-xl px-3 py-2 border border-white/5">
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                Racha de 7 días
              </p>
              <div className="flex gap-1 mt-1 justify-center">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Check
                    key={i}
                    className="text-emerald-400 w-3.5 h-3.5 stroke-3"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 bg-bg-soft">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Row 1: Job Target Selector */}
          <JobTargetSelector
            jobs={jobTargets}
            selectedJobId={selectedJobId}
            onSelectJob={setSelectedJobId}
          />

          {/* Row 2: Academic Load Selector */}
          <div className="flex justify-end">
            <AcademicLoadSelector
              currentLoad={academicLoad}
              onChange={setAcademicLoad}
            />
          </div>

          {/* Row 3: Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Calendar & Skill Gaps) - 3 cols */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <WeekCalendar weekDays={weekDays} monthDays={monthDays} />
              <div key={`skills-${selectedJobId}`} className="animate-cardIn">
                <SkillGapsCard skills={skills} />
              </div>
            </div>

            {/* Center Column (Today's Task & Next Action) - 5 cols */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div key={`task-${selectedJobId}`} className="animate-cardIn">
                <TodayTask task={todayTask} />
              </div>
              <div key={`action-${selectedJobId}`} className="animate-cardIn">
                <NextActionCard action={nextAction} />
              </div>
            </div>

            {/* Right Column (Weekly Impact) - 4 cols */}
            <div className="lg:col-span-4">
              <div key={`impact-${selectedJobId}`} className="animate-cardIn">
                <WeekImpactCard impact={impact} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Calendar */}
      <FloatingCalendarButton />
    </PageShell>
  )
}
