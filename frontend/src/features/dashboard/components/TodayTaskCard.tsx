import { Calendar, Check } from 'lucide-react'
import { todayTaskByJob, defaultSelectedJobId } from '@/src/features/plan30d/data/mock-data'

export default function TodayTaskCard() {
  const task = todayTaskByJob[defaultSelectedJobId]

  return (
    <div className="card bg-rose-50 border border-rose-200 shadow-sm relative overflow-hidden">
      {/* Indicador de estado */}
      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
      
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-600" />
            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Plan 30 Días</p>
          </div>
          <span className="badge badge-rose text-rose-700 bg-rose-200/50 badge-sm font-semibold border-none">
            {task.date.split(' ')[1]} · {task.duration}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-rose-950 leading-tight mb-2">{task.title}</h3>
        <p className="text-sm text-rose-800/80 mb-5 leading-snug line-clamp-3">
          {task.description}
        </p>
        
        <button className="btn btn-sm bg-rose-600 hover:bg-rose-700 text-white border-none w-full shadow-sm shadow-rose-600/20">
          <Check className="w-4 h-4 mr-1" />
          Marcar como completado
        </button>
      </div>
    </div>
  )
}
