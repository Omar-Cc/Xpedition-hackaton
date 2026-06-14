import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import MentorCard from '@/src/features/mentoria/components/MentorCard'
import MoreMentors from '@/src/features/mentoria/components/MoreMentors'
import ConnectionsPanel from '@/src/features/mentoria/components/ConnectionsPanel'
import HowItWorksPanel from '@/src/features/mentoria/components/HowItWorksPanel'

export default function MentoriaPage() {
  return (
    <PageShell>
      <PageHeader
        title="Mentoría entre pares"
        subtitle="Conecta con estudiantes UTP que ya están haciendo prácticas"
        maxWidthClassName="max-w-6xl"
      />
      <main className="flex-1 overflow-y-auto p-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <MentorCard />
            <MoreMentors />
          </div>
          <div className="flex flex-col gap-4">
            <ConnectionsPanel />
            <HowItWorksPanel />
          </div>
        </div>
      </main>
    </PageShell>
  )
}
