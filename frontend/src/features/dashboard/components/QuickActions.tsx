import ActionCard from './ActionCard'
import { quickActions } from '../data/mock-data'

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-wide text-base-content/50 font-medium mb-3">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <ActionCard key={action.href} action={action} />
        ))}
      </div>
    </section>
  )
}
