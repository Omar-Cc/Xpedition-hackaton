import { sessionInfo } from '../data/mock-data'

export default function SessionInfoCard() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <h3 className="text-sm font-semibold mb-3">Esta sesión</h3>
        <div className="flex flex-col gap-2.5">
          {sessionInfo.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-base-content/50">{item.label}</span>
              <span className={`font-medium ${item.highlight ? 'text-primary' : ''}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
