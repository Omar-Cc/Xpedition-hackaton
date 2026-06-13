import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import CVStepperTabs from '@/src/features/cv-builder/components/CVStepperTabs'
import JobOfferInput from '@/src/features/cv-builder/components/JobOfferInput'
import SkillGapPanel from '@/src/features/cv-builder/components/SkillGapPanel'

export default function CVBuilderPage() {
  return (
    <PageShell>
      <PageHeader
        title="Constructor de CV con IA"
        subtitle="Formato Harvard · Generado desde tu récord académico y reseñas de profesores"
      />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-base-100 border-b border-base-200 px-6">
          <CVStepperTabs />
        </div>
        <div className="p-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <JobOfferInput />
            <SkillGapPanel />
          </div>
        </div>
      </main>
    </PageShell>
  )
}
