import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import CourseStatsGrid from '@/src/features/cursos/components/CourseStatsGrid'
import CourseMatchTable from '@/src/features/cursos/components/CourseMatchTable'
import TopCoursesPanel from '@/src/features/cursos/components/TopCoursesPanel'
import { targetJob } from '@/src/features/cursos/data/mock-data'

export default function CursosPage() {
  return (
    <PageShell>
      <PageHeader
        title="Tus cursos vs. requisitos del empleo"
        subtitle={`Para: ${targetJob.title} — ${targetJob.company}`}
      />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6 max-w-6xl mx-auto">
          <CourseStatsGrid />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <CourseMatchTable />
            <TopCoursesPanel />
          </div>
        </div>
      </main>
    </PageShell>
  )
}
