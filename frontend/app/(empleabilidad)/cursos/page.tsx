import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import PageMain from '@/src/components/layout/PageMain'
import CourseStatsGrid from '@/src/features/cursos/components/CourseStatsGrid'
import CourseMatchTable from '@/src/features/cursos/components/CourseMatchTable'
import TopCoursesPanel from '@/src/features/cursos/components/TopCoursesPanel'
import { targetJob } from '@/src/features/cursos/data/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Cursos y Capacitación",
  description: "Compara tu avance de cursos académicos frente a los requisitos reales de las ofertas laborales.",
}

export default function CursosPage() {
  return (
    <PageShell>
      <PageHeader
        title="Tus cursos vs. requisitos del empleo"
        subtitle={`Para: ${targetJob.title} — ${targetJob.company}`}
      />
      <PageMain className="flex flex-col gap-6">
        <CourseStatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <CourseMatchTable />
          <TopCoursesPanel />
        </div>
      </PageMain>
    </PageShell>
  )
}
