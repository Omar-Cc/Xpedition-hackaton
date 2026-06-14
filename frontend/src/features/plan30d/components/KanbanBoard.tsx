'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable
} from '@dnd-kit/core'
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Kanban,
  CheckCircle2,
  Clock,
  ListTodo,
  AlertCircle,
  MoreVertical,
  Play,
  ArrowRight,
  Eye,
  CheckSquare,
  Square,
  Lock,
  ChevronRight,
  Calendar,
  RefreshCw,
  X,
  GripVertical
} from 'lucide-react'
import type { TaskItem } from '../types'

interface KanbanBoardProps {
  tasks: TaskItem[]
  onUpdateTask: (taskId: string, updates: Partial<TaskItem>) => void
  onAdelantarTask: (task: TaskItem, option: 'reemplazar' | 'adicionar') => void
  onRecalcularPlan: (option: 'carga' | 'mantener') => void
}

interface DroppableColumnProps {
  id: string
  children: React.ReactNode
  isHighlighted: boolean
  className?: string
}

function DroppableColumn({ id, children, isHighlighted, className }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  
  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        isOver
          ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/10'
          : isHighlighted
          ? 'bg-indigo-50/20 border-dashed border-indigo-300'
          : 'bg-slate-50/50 border-slate-200/50'
      } border rounded-xl p-3 flex flex-col justify-between min-h-[260px] transition-all duration-200`}
    >
      {children}
    </div>
  )
}

// Helper badge functions moved to top level
const getCategoryBadgeClass = (category: TaskItem['category']) => {
  switch (category) {
    case 'técnica':
      return 'bg-violet-50 text-violet-700 border-violet-100 border'
    case 'CV':
      return 'bg-amber-50 text-amber-700 border-amber-100 border'
    case 'evento':
      return 'bg-blue-50 text-blue-700 border-blue-100 border'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-100 border'
  }
}

const renderSecondaryBadges = (task: TaskItem) => {
  const badges = []
  
  // 0. Activo (En progreso)
  if (task.status === 'inprogress') {
    badges.push(
      <span key="activo" className="text-[8px] font-extrabold px-1.5 py-0.5 bg-emerald-500 text-white rounded uppercase leading-none flex items-center gap-1 animate-pulse shadow-xs shrink-0">
        <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-ping shrink-0"></span>
        Activo
      </span>
    )
  }
  
  // 1. Hoy
  if (task.dayNumber === 7 && task.status !== 'done') {
    badges.push(
      <span key="hoy" className="text-[8px] font-bold px-1 py-0.5 bg-emerald-100 text-emerald-700 rounded uppercase leading-none">
        Hoy
      </span>
    )
  }
  
  // 2. Atrasada
  if (task.isOverdue || (task.dayNumber < 7 && task.status !== 'done')) {
    badges.push(
      <span key="atrasada" className="text-[8px] font-bold px-1 py-0.5 bg-rose-100 text-rose-700 rounded uppercase leading-none">
        Atrasada
      </span>
    )
  }
  
  // 3. Adelantada
  if (task.isAdelantada) {
    badges.push(
      <span key="adelantada" className="text-[8px] font-bold px-1 py-0.5 bg-purple-100 text-purple-700 rounded uppercase leading-none">
        Adelantada
      </span>
    )
  }
  
  // 4. Reprogramada
  if (task.isReprogramada) {
    badges.push(
      <span key="reprogramada" className="text-[8px] font-bold px-1 py-0.5 bg-amber-100 text-amber-700 rounded uppercase leading-none">
        Reprog.
      </span>
    )
  }
  
  // 5. Urgente
  if (task.isUrgente || (task.category === 'evento' && task.dayNumber <= 8 && task.status !== 'done')) {
    badges.push(
      <span key="urgente" className="text-[8px] font-bold px-1 py-0.5 bg-orange-100 text-orange-700 rounded uppercase leading-none">
        Urgente
      </span>
    )
  }
  
  // 6. Bloqueada
  if (task.isBloqueada) {
    badges.push(
      <span key="bloqueada" className="text-[8px] font-bold px-1 py-0.5 bg-slate-100 text-slate-500 rounded uppercase leading-none flex items-center gap-0.5">
        <Lock className="w-2 h-2" /> Bloqueada
      </span>
    )
  }
  
  return badges
}

interface SortableTaskCardProps {
  task: TaskItem
  onSelectTask: (task: TaskItem) => void
  onMakeToday: (task: TaskItem) => void
  onCompleteTask: (task: TaskItem) => void
  onMoveToTomorrow: (task: TaskItem) => void
  onOmitTask: (task: TaskItem) => void
  onReprogram: (task: TaskItem) => void
  menuTaskId: string | null
  setMenuTaskId: (id: string | null) => void
  onUpdateTask: (taskId: string, updates: Partial<TaskItem>) => void
  setLocalToast: (toast: { message: string; type: 'success' | 'info' | 'warning' } | null) => void
}

function SortableTaskCard({
  task,
  onSelectTask,
  onMakeToday,
  onCompleteTask,
  onMoveToTomorrow,
  onOmitTask,
  onReprogram,
  menuTaskId,
  setMenuTaskId,
  onUpdateTask,
  setLocalToast,
}: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-30' : ''}
    >
      {task.status === 'todo' && (
        <div
          className={`bg-base-100 border p-3 rounded-xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between gap-3 relative group ${
            task.isOverdue ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200/80'
          } ${task.isBloqueada ? 'opacity-85 border-dashed border-slate-300' : ''}`}
        >
          {/* Grab Indicator */}
          <div 
            {...listeners} 
            {...attributes} 
            className="absolute top-3 right-8 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 z-10"
            title="Arrastrar para mover de columna"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          {/* Card Content (Click opens detail) */}
          <div 
            className="cursor-pointer space-y-1.5 pr-4"
            onClick={() => onSelectTask(task)}
          >
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none ${getCategoryBadgeClass(task.category)}`}>
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              
              <span className="text-[9px] text-slate-400 font-bold uppercase shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            
            <p className={`text-xs font-bold leading-snug ${task.isBloqueada ? 'text-slate-400' : 'text-slate-800'}`}>
              {task.title}
            </p>
          </div>

          {/* Card Action footer */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            {task.isBloqueada ? (
              <span className="text-[10px] text-slate-400 font-medium leading-none flex items-center gap-1">
                <Lock className="w-3 h-3" /> {task.bloqueoInfo ? 'Falta simulación/mentoría' : 'Requiere simulación'}
              </span>
            ) : task.isOverdue || task.dayNumber < 7 ? (
              <button
                onClick={() => onMakeToday(task)}
                className="btn btn-ghost btn-xs text-rose-600 hover:bg-rose-50 font-bold text-[10px] rounded-lg px-2 flex items-center gap-0.5 cursor-pointer"
              >
                Hacer hoy
              </button>
            ) : task.dayNumber > 7 ? (
              <button
                onClick={() => onMakeToday(task)}
                className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50 font-bold text-[10px] rounded-lg px-2 flex items-center gap-0.5 cursor-pointer"
              >
                Adelantar
              </button>
            ) : (
              <button
                onClick={() => onMakeToday(task)}
                className="btn btn-ghost btn-xs text-emerald-600 hover:bg-emerald-50 font-bold text-[10px] rounded-lg px-2 flex items-center gap-0.5 cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-current" /> Iniciar
              </button>
            )}

            <div className="relative three-dots-menu-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (menuTaskId === task.id) {
                    setMenuTaskId(null);
                  } else {
                    setMenuTaskId(task.id);
                  }
                }}
                className="btn btn-ghost btn-circle btn-xs hover:bg-slate-100 cursor-pointer"
              >
                <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {menuTaskId === task.id && (
                <div className="absolute right-0 bottom-full mb-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1.5 w-48 animate-in slide-in-from-bottom-2 duration-150">
                  <button
                    onClick={() => { onMakeToday(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                    Iniciar
                  </button>
                  <button
                    onClick={() => { onCompleteTask(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Marcar completada
                  </button>
                  {task.dayNumber > 7 && (
                    <button
                      onClick={() => { onMakeToday(task); setMenuTaskId(null); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                      Adelantar a hoy
                    </button>
                  )}
                  <button
                    onClick={() => { onMoveToTomorrow(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Mover a mañana
                  </button>
                  <button
                    onClick={() => {
                      onReprogram(task);
                      setMenuTaskId(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Reprogramar
                  </button>
                  <button
                    onClick={() => { onOmitTask(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-rose-600 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 text-rose-500" />
                    Omitir del plan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {task.status === 'inprogress' && (
        <div
          className="bg-base-100 border border-emerald-300 ring-2 ring-emerald-500/5 p-3 rounded-xl shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between gap-3 relative group"
        >
          {/* Grab Indicator */}
          <div 
            {...listeners} 
            {...attributes} 
            className="absolute top-3 right-8 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 z-10"
            title="Arrastrar para mover de columna"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <div 
            className="cursor-pointer space-y-1.5 pr-4"
            onClick={() => onSelectTask(task)}
          >
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none ${getCategoryBadgeClass(task.category)}`}>
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              <span className="text-[8px] text-emerald-600 font-extrabold uppercase tracking-wider animate-pulse shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            <p className="text-xs font-extrabold text-slate-800 leading-snug">
              {task.title}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onSelectTask(task)}
              className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50 font-bold text-[10px] rounded-lg px-2 flex items-center gap-0.5 cursor-pointer"
            >
              Continuar
            </button>

            <div className="relative three-dots-menu-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (menuTaskId === task.id) {
                    setMenuTaskId(null);
                  } else {
                    setMenuTaskId(task.id);
                  }
                }}
                className="btn btn-ghost btn-circle btn-xs hover:bg-slate-100 cursor-pointer"
              >
                <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {menuTaskId === task.id && (
                <div className="absolute right-0 bottom-full mb-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1.5 w-48 animate-in slide-in-from-bottom-2 duration-150">
                  <button
                    onClick={() => { onCompleteTask(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Marcar completada
                  </button>
                  <button
                    onClick={() => { onMoveToTomorrow(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Mover a mañana
                  </button>
                  <button
                    onClick={() => {
                      onReprogram(task);
                      setMenuTaskId(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Reprogramar
                  </button>
                  <button
                    onClick={() => { onOmitTask(task); setMenuTaskId(null); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-rose-600 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 text-rose-500" />
                    Omitir del plan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {task.status === 'done' && (
        <div
          className="bg-base-100/70 border border-slate-200 p-3 rounded-xl opacity-85 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 relative group"
        >
          {/* Grab Indicator */}
          <div 
            {...listeners} 
            {...attributes} 
            className="absolute top-3 right-8 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 z-10"
            title="Arrastrar para reabrir"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <div 
            className="cursor-pointer space-y-1.5 pr-4"
            onClick={() => onSelectTask(task)}
          >
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 line-through">
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 line-through leading-snug">
              {task.title}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onSelectTask(task)}
              className="btn btn-ghost btn-xs text-emerald-600 hover:bg-emerald-50 font-bold text-[10px] rounded-lg px-2 flex items-center gap-0.5 cursor-pointer"
            >
              Ver resultado
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface TaskDragOverlayProps {
  task: TaskItem
}

function TaskDragOverlay({ task }: TaskDragOverlayProps) {
  return (
    <div className="bg-white border-2 border-indigo-400 p-3 rounded-xl shadow-2xl scale-102 rotate-2 opacity-95 w-full pointer-events-none z-50">
      {task.status === 'todo' && (
        <div
          className={`bg-base-100 border p-3 rounded-xl flex flex-col justify-between gap-3 relative ${
            task.isOverdue ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200/80'
          } ${task.isBloqueada ? 'opacity-85 border-dashed border-slate-300' : ''}`}
        >
          {/* Grab Indicator (Visual only, no listeners) */}
          <div className="absolute top-3 right-8 text-slate-400 p-1">
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          {/* Card Content */}
          <div className="space-y-1.5 pr-4">
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none ${getCategoryBadgeClass(task.category)}`}>
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              
              <span className="text-[9px] text-slate-400 font-bold uppercase shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            
            <p className={`text-xs font-bold leading-snug ${task.isBloqueada ? 'text-slate-400' : 'text-slate-800'}`}>
              {task.title}
            </p>
          </div>

          {/* Card Action footer */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            {task.isBloqueada ? (
              <span className="text-[10px] text-slate-400 font-medium leading-none flex items-center gap-1">
                <Lock className="w-3 h-3" /> {task.bloqueoInfo ? 'Falta simulación/mentoría' : 'Requiere simulación'}
              </span>
            ) : task.isOverdue || task.dayNumber < 7 ? (
              <span className="text-rose-600 font-bold text-[10px] px-2">Hacer hoy</span>
            ) : task.dayNumber > 7 ? (
              <span className="text-blue-600 font-bold text-[10px] px-2">Adelantar</span>
            ) : (
              <span className="text-emerald-600 font-bold text-[10px] px-2 flex items-center gap-0.5">
                <Play className="w-2.5 h-2.5 fill-current" /> Iniciar
              </span>
            )}
            <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      )}

      {task.status === 'inprogress' && (
        <div
          className="bg-base-100 border border-emerald-300 ring-2 ring-emerald-500/5 p-3 rounded-xl flex flex-col justify-between gap-3 relative"
        >
          <div className="absolute top-3 right-8 text-slate-400 p-1">
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <div className="space-y-1.5 pr-4">
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none ${getCategoryBadgeClass(task.category)}`}>
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              <span className="text-[8px] text-emerald-600 font-extrabold uppercase tracking-wider animate-pulse shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            <p className="text-xs font-extrabold text-slate-800 leading-snug">
              {task.title}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <span className="text-blue-600 font-bold text-[10px] px-2">Continuar</span>
            <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      )}

      {task.status === 'done' && (
        <div
          className="bg-base-100/70 border border-slate-200 p-3 rounded-xl opacity-85 flex flex-col justify-between gap-3 relative"
        >
          <div className="absolute top-3 right-8 text-slate-400 p-1">
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <div className="space-y-1.5 pr-4">
            <div className="flex justify-between items-start gap-2 pr-6">
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 line-through animate-none">
                  {task.category}
                </span>
                {renderSecondaryBadges(task)}
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase shrink-0">
                Día {task.dayNumber}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 line-through leading-snug">
              {task.title}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-bold text-[10px] px-2">Ver resultado</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function KanbanBoard({
  tasks,
  onUpdateTask,
  onAdelantarTask,
  onRecalcularPlan,
}: KanbanBoardProps) {
  const router = useRouter()

  // Modal states
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null)
  const [reprogrammingTask, setReprogrammingTask] = useState<TaskItem | null>(null)
  const [newDayVal, setNewDayVal] = useState(7)
  
  // Advance task flow states
  const [taskToAdvance, setTaskToAdvance] = useState<TaskItem | null>(null)
  const [showRecalculateDialog, setShowRecalculateDialog] = useState(false)

  // Drag and drop states
  const [activeDragTaskId, setActiveDragTaskId] = useState<string | null>(null)
  const [confirmDragAction, setConfirmDragAction] = useState<{
    type: 'complete' | 'reopen'
    task: TaskItem
    targetCol: 'todo' | 'inprogress' | 'done'
  } | null>(null)

  // Local feedback toast state
  const [localToast, setLocalToast] = useState<{
    message: string
    type: 'success' | 'info' | 'warning'
  } | null>(null)

  // Sensors configuration to avoid intercepting normal clicks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires 8px movement to start drag, ensuring simple clicks work fine
      },
    })
  )

  const activeDragTask = tasks.find(t => t.id === activeDragTaskId)

  // Auto-dismiss local toast
  useEffect(() => {
    if (localToast) {
      const timer = setTimeout(() => setLocalToast(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [localToast])

  // Click outside to close three dots menu
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (menuTaskId && !target.closest('.three-dots-menu-container')) {
        setMenuTaskId(null)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [menuTaskId])

  // Expand state for columns
  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({
    todo: false,
    inprogress: false,
    done: false,
  })

  const toggleExpand = (col: string) => {
    setExpandedCols((prev) => ({
      ...prev,
      [col]: !prev[col],
    }))
  }

  const handleVerDetalle = (task: TaskItem) => {
    if (task.category === 'CV') {
      router.push('/cv-builder')
    } else if (task.category === 'evento') {
      if (task.title.toLowerCase().includes('simul')) {
        router.push('/simulator')
      } else if (task.title.toLowerCase().includes('mentor')) {
        router.push('/mentoria')
      } else {
        router.push('/seguimiento')
      }
    } else if (task.category === 'técnica') {
      router.push('/cursos')
    } else {
      alert(`Redireccionando a la actividad "${task.title}"...`)
    }
  }

  // Filter tasks into columns
  const todoTasks = tasks.filter((t) => t.status === 'todo')
  const inprogressTasks = tasks.filter((t) => t.status === 'inprogress')
  const doneTasks = tasks.filter((t) => t.status === 'done')

  const getVisibleTasks = (taskList: TaskItem[], colKey: string) => {
    if (expandedCols[colKey]) return taskList
    return taskList.slice(0, 3)
  }

  // Handle task actions from Card or Menu
  const handleMakeToday = (task: TaskItem) => {
    if (task.dayNumber > 7) {
      // Future task: trigger advance flow
      setTaskToAdvance(task)
    } else {
      // Normal task or overdue task: move to inprogress
      onUpdateTask(task.id, { status: 'inprogress', isOverdue: false })
      setLocalToast({
        message: `🚀 "${task.title}" iniciada y movida a En progreso.`,
        type: 'success'
      })
    }
  }

  const handleCompleteTask = (task: TaskItem) => {
    // Complete all subtasks first if any
    const updatedCheckboxes = task.checkboxes?.map(c => ({ ...c, done: true }))
    onUpdateTask(task.id, { 
      status: 'done', 
      isOverdue: false, 
      checkboxes: updatedCheckboxes 
    })
  }

  const handleReopenTask = (task: TaskItem) => {
    if (confirm('¿Deseas reabrir esta actividad y moverla de nuevo a "Por hacer"?')) {
      onUpdateTask(task.id, { status: 'todo' })
      setLocalToast({
        message: `🔄 "${task.title}" reabierta.`,
        type: 'info'
      })
    }
  }

  const handleMoveToTomorrow = (task: TaskItem) => {
    onUpdateTask(task.id, { 
      dayNumber: task.dayNumber + 1, 
      isReprogramada: true 
    })
    setLocalToast({
      message: `📅 "${task.title}" movida a mañana.`,
      type: 'info'
    })
  }

  const handleOmitTask = (task: TaskItem) => {
    if (confirm('¿Deseas omitir esta tarea del plan? Podrás verla después en Aprende+.')) {
      onUpdateTask(task.id, { dayNumber: -999 }) // Hidden flag
      setLocalToast({
        message: `🗑️ "${task.title}" omitida del plan.`,
        type: 'info'
      })
    }
  }

  // Finish advance flow
  const handleConfirmAdvance = (option: 'reemplazar' | 'adicionar') => {
    if (!taskToAdvance) return
    onAdelantarTask(taskToAdvance, option)
    setTaskToAdvance(null)
    setShowRecalculateDialog(true)
  }

  const handleConfirmRecalculate = (option: 'carga' | 'mantener') => {
    onRecalcularPlan(option)
    setShowRecalculateDialog(false)
  }

  // Drag and drop event handlers
  const handleDragStart = (event: any) => {
    setActiveDragTaskId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    setActiveDragTaskId(null)
    const { active, over } = event
    if (!over) return

    const taskId = active.id
    
    let targetCol = over.id as string
    if (targetCol !== 'todo' && targetCol !== 'inprogress' && targetCol !== 'done') {
      const overTask = tasks.find(t => t.id === over.id)
      if (overTask) {
        targetCol = overTask.status
      } else {
        return
      }
    }
    
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    if (task.status === targetCol) return

    // Tarea bloqueada -> En progreso: impedir movimiento y mostrar mensaje de dependencia
    if (task.isBloqueada && targetCol === 'inprogress') {
      setLocalToast({
        message: `Movimiento denegado: "${task.title}" está bloqueada. Requiere completar simulación/mentoría primero.`,
        type: 'warning'
      })
      return
    }

    if (task.status === 'todo' && targetCol === 'inprogress') {
      // Por hacer -> En progreso: iniciar tarea
      if (task.dayNumber > 7) {
        setTaskToAdvance(task)
      } else {
        onUpdateTask(task.id, { status: 'inprogress', isOverdue: false })
        setLocalToast({
          message: `🚀 "${task.title}" iniciada y movida a En progreso.`,
          type: 'success'
        })
      }
    } else if (task.status === 'inprogress' && targetCol === 'done') {
      // En progreso -> Completado: marcar tarea como completada
      handleCompleteTask(task)
      setLocalToast({
        message: `🎉 ¡Excelente trabajo! "${task.title}" completada.`,
        type: 'success'
      })
    } else if (task.status === 'inprogress' && targetCol === 'todo') {
      // En progreso -> Por hacer: mover de regreso a Por hacer
      onUpdateTask(task.id, { status: 'todo' })
      setLocalToast({
        message: `🔄 "${task.title}" movida de nuevo a Por hacer.`,
        type: 'info'
      })
    } else if (task.status === 'todo' && targetCol === 'done') {
      // Por hacer -> Completado: pedir confirmación antes de completar
      setConfirmDragAction({
        type: 'complete',
        task,
        targetCol
      })
    } else if (task.status === 'done' && (targetCol === 'todo' || targetCol === 'inprogress')) {
      // Completado -> Por hacer/En progreso: pedir confirmación para reabrir
      setConfirmDragAction({
        type: 'reopen',
        task,
        targetCol
      })
    }
  }

  const handleConfirmDragComplete = () => {
    if (!confirmDragAction) return
    const { task } = confirmDragAction
    handleCompleteTask(task)
    setConfirmDragAction(null)
    setLocalToast({
      message: `🎉 ¡Excelente trabajo! "${task.title}" completada.`,
      type: 'success'
    })
  }

  const handleConfirmDragReopen = () => {
    if (!confirmDragAction) return
    const { task, targetCol } = confirmDragAction
    onUpdateTask(task.id, { status: targetCol })
    setConfirmDragAction(null)
    setLocalToast({
      message: `🔄 "${task.title}" reabierta y movida a ${targetCol === 'inprogress' ? 'En progreso' : 'Por hacer'}.`,
      type: 'info'
    })
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl relative">
        
        {/* Local Toast Alert */}
        {localToast && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className={`px-4 py-2.5 rounded-xl shadow-lg border text-xs font-bold flex items-center gap-2 ${
              localToast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              localToast.type === 'warning' ? 'bg-rose-50 border-rose-200 text-rose-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {localToast.type === 'success' ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 font-black" /> :
               localToast.type === 'warning' ? <AlertCircle className="w-4.5 h-4.5 text-rose-600" /> :
               <Clock className="w-4.5 h-4.5 text-blue-600" />}
              <span>{localToast.message}</span>
            </div>
          </div>
        )}

        <div className="card-body p-4 md:p-5 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-base-200 pb-3">
            <div className="flex items-center gap-2">
              <Kanban className="w-5 h-5 text-slate-500" />
              <h3 className="text-sm font-bold text-base-content uppercase tracking-wider">Tablero del plan</h3>
            </div>
            <div className="text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
              Hoy es Día 7
            </div>
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Por hacer */}
            <DroppableColumn 
              id="todo" 
              isHighlighted={!!activeDragTaskId && activeDragTask?.status !== 'todo'}
            >
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <ListTodo className="w-4 h-4 text-blue-500" />
                    <span>Por hacer</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                    {todoTasks.length}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {todoTasks.length === 0 ? (
                    <div className="text-[11px] text-slate-400 font-medium italic p-4 text-center">
                      Sin tareas pendientes
                    </div>
                  ) : (
                    <SortableContext items={todoTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      {getVisibleTasks(todoTasks, 'todo').map((task) => (
                        <SortableTaskCard
                          key={task.id}
                          task={task}
                          onSelectTask={setSelectedTask}
                          onMakeToday={handleMakeToday}
                          onCompleteTask={handleCompleteTask}
                          onMoveToTomorrow={handleMoveToTomorrow}
                          onOmitTask={handleOmitTask}
                          onReprogram={(t) => {
                            setReprogrammingTask(t)
                            setNewDayVal(t.dayNumber)
                          }}
                          menuTaskId={menuTaskId}
                          setMenuTaskId={setMenuTaskId}
                          onUpdateTask={onUpdateTask}
                          setLocalToast={setLocalToast}
                        />
                      ))}
                    </SortableContext>
                  )}
                </div>
              </div>

              {/* Expand button */}
              {todoTasks.length > 3 && (
                <button
                  onClick={() => toggleExpand('todo')}
                  className="btn btn-ghost btn-xs text-[10px] text-blue-600 font-bold hover:bg-transparent mt-2.5 flex items-center justify-center gap-1 w-full cursor-pointer"
                >
                  {expandedCols.todo ? 'Mostrar menos' : `Ver ${todoTasks.length - 3} tareas más`}
                </button>
              )}
            </DroppableColumn>

            {/* Column 2: En progreso */}
            <DroppableColumn 
              id="inprogress" 
              isHighlighted={!!activeDragTaskId && activeDragTask?.status !== 'inprogress'}
            >
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>En progreso</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                    {inprogressTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {inprogressTasks.length === 0 ? (
                    <div className="text-[11px] text-slate-400 font-medium italic p-4 text-center">
                      Sin tareas en progreso
                    </div>
                  ) : (
                    <SortableContext items={inprogressTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      {getVisibleTasks(inprogressTasks, 'inprogress').map((task) => (
                        <SortableTaskCard
                          key={task.id}
                          task={task}
                          onSelectTask={setSelectedTask}
                          onMakeToday={handleMakeToday}
                          onCompleteTask={handleCompleteTask}
                          onMoveToTomorrow={handleMoveToTomorrow}
                          onOmitTask={handleOmitTask}
                          onReprogram={(t) => {
                            setReprogrammingTask(t)
                            setNewDayVal(t.dayNumber)
                          }}
                          menuTaskId={menuTaskId}
                          setMenuTaskId={setMenuTaskId}
                          onUpdateTask={onUpdateTask}
                          setLocalToast={setLocalToast}
                        />
                      ))}
                    </SortableContext>
                  )}
                </div>
              </div>

              {/* Expand button */}
              {inprogressTasks.length > 3 && (
                <button
                  onClick={() => toggleExpand('inprogress')}
                  className="btn btn-ghost btn-xs text-[10px] text-blue-600 font-bold hover:bg-transparent mt-2.5 flex items-center justify-center gap-1 w-full cursor-pointer"
                >
                  {expandedCols.inprogress ? 'Mostrar menos' : `Ver ${inprogressTasks.length - 3} tareas más`}
                </button>
              )}
            </DroppableColumn>

            {/* Column 3: Completado */}
            <DroppableColumn 
              id="done" 
              isHighlighted={!!activeDragTaskId && activeDragTask?.status !== 'done'}
            >
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Completado</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                    {doneTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {doneTasks.length === 0 ? (
                    <div className="text-[11px] text-slate-400 font-medium italic p-4 text-center">
                      Aún no has completado tareas
                    </div>
                  ) : (
                    <SortableContext items={doneTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      {getVisibleTasks(doneTasks, 'done').map((task) => (
                        <SortableTaskCard
                          key={task.id}
                          task={task}
                          onSelectTask={setSelectedTask}
                          onMakeToday={handleMakeToday}
                          onCompleteTask={handleCompleteTask}
                          onMoveToTomorrow={handleMoveToTomorrow}
                          onOmitTask={handleOmitTask}
                          onReprogram={(t) => {
                            setReprogrammingTask(t)
                            setNewDayVal(t.dayNumber)
                          }}
                          menuTaskId={menuTaskId}
                          setMenuTaskId={setMenuTaskId}
                          onUpdateTask={onUpdateTask}
                          setLocalToast={setLocalToast}
                        />
                      ))}
                    </SortableContext>
                  )}
                </div>
              </div>

              {/* Expand button */}
              {doneTasks.length > 3 && (
                <button
                  onClick={() => toggleExpand('done')}
                  className="btn btn-ghost btn-xs text-[10px] text-blue-600 font-bold hover:bg-transparent mt-2.5 flex items-center justify-center gap-1 w-full cursor-pointer"
                >
                  {expandedCols.done ? 'Mostrar menos' : `Ver ${doneTasks.length - 3} tareas más`}
                </button>
              )}
            </DroppableColumn>

          </div>

        </div>

      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/50">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${getCategoryBadgeClass(selectedTask.category)}`}>
                {selectedTask.category}
              </span>
              <button
                onClick={() => setSelectedTask(null)}
                className="btn btn-ghost btn-sm btn-circle cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-slate-800 leading-snug">
                  {selectedTask.title}
                </h4>
                
                {/* Secondary Badges in detail */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                    selectedTask.status === 'todo' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                    selectedTask.status === 'inprogress' ? 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse font-bold' :
                    'bg-emerald-100 text-emerald-700 border-emerald-200'
                  }`}>
                    {selectedTask.status === 'todo' ? 'Por hacer' :
                     selectedTask.status === 'inprogress' ? 'Activo' : 'Completado'}
                  </span>
                  {renderSecondaryBadges(selectedTask)}
                </div>

                <p className="text-[11px] text-slate-400 mt-2 font-semibold">
                  Asignada al Día {selectedTask.dayNumber} · Duración sugerida: {selectedTask.duration}
                </p>
              </div>

              {selectedTask.description && (
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {selectedTask.description}
                </p>
              )}

              {/* Gaps / Impact Nudge */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-800 font-medium">
                <span className="font-bold">Impacto del plan:</span> {selectedTask.impact}
              </div>



              {/* Subtasks checklist if any */}
              {selectedTask.checkboxes && selectedTask.checkboxes.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subtareas</h5>
                  <div className="flex flex-col gap-1.5">
                    {selectedTask.checkboxes.map((cb) => {
                      const handleToggleModalCheckbox = (cbId: string, checked: boolean) => {
                        const updatedCheckboxes = selectedTask.checkboxes?.map((c) =>
                          c.id === cbId ? { ...c, done: checked } : c
                        ) || []
                        onUpdateTask(selectedTask.id, { checkboxes: updatedCheckboxes })
                        setSelectedTask((prev) => prev ? { ...prev, checkboxes: updatedCheckboxes } : null)
                      }
                      
                      return (
                        <label key={cb.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 cursor-pointer hover:bg-slate-100 transition-colors duration-150 min-h-[38px]">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-xs checkbox-success"
                            checked={cb.done}
                            disabled={selectedTask.status === 'done'}
                            onChange={(e) => handleToggleModalCheckbox(cb.id, e.target.checked)}
                          />
                          <span className={cb.done ? 'line-through text-slate-400' : 'text-slate-700 font-semibold text-xs'}>
                            {cb.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50 flex flex-wrap gap-2 justify-end">
              {/* Action: Iniciar (if status is todo, dayNumber <= 7, not blocked) */}
              {selectedTask.status === 'todo' && !selectedTask.isBloqueada && selectedTask.dayNumber <= 7 && (
                <button
                  onClick={() => { handleMakeToday(selectedTask); setSelectedTask(null); }}
                  className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold rounded-lg cursor-pointer"
                >
                  Iniciar
                </button>
              )}

              {/* Action: Hacer hoy (if status is todo, dayNumber > 7 or isOverdue, not blocked) */}
              {selectedTask.status === 'todo' && !selectedTask.isBloqueada && (selectedTask.dayNumber > 7 || selectedTask.isOverdue) && (
                <button
                  onClick={() => { handleMakeToday(selectedTask); setSelectedTask(null); }}
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white font-bold rounded-lg cursor-pointer"
                >
                  Hacer hoy
                </button>
              )}

              {/* Action: Marcar como completada (if status is todo or inprogress, not blocked) */}
              {selectedTask.status !== 'done' && !selectedTask.isBloqueada && (
                <button
                  onClick={() => { handleCompleteTask(selectedTask); setSelectedTask(null); }}
                  className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold rounded-lg cursor-pointer"
                >
                  Marcar como completada
                </button>
              )}

              {/* Action: Posponer (if status is todo or inprogress) */}
              {selectedTask.status !== 'done' && (
                <button
                  onClick={() => { handleMoveToTomorrow(selectedTask); setSelectedTask(null); }}
                  className="btn btn-sm btn-outline border-slate-300 text-slate-600 hover:bg-slate-50 font-bold rounded-lg cursor-pointer"
                >
                  Posponer
                </button>
              )}

              {/* Action: Reprogramar */}
              <button
                onClick={() => {
                  setReprogrammingTask(selectedTask);
                  setNewDayVal(selectedTask.dayNumber);
                  setSelectedTask(null);
                }}
                className="btn btn-sm btn-outline border-slate-300 text-slate-600 hover:bg-slate-50 font-bold rounded-lg cursor-pointer"
              >
                Reprogramar
              </button>

              {/* Action: Ver detalle */}
              <button
                onClick={() => {
                  setSelectedTask(null);
                  handleVerDetalle(selectedTask);
                }}
                className="btn btn-sm btn-primary bg-navy text-white hover:bg-navy/90 font-bold rounded-lg cursor-pointer border-none"
              >
                Ver detalle
              </button>

              {/* Action: Reabrir (if completed) */}
              {selectedTask.status === 'done' && (
                <button
                  onClick={() => { handleReopenTask(selectedTask); setSelectedTask(null); }}
                  className="btn btn-sm btn-outline border-rose-300 text-rose-600 hover:bg-rose-50 font-bold rounded-lg cursor-pointer"
                >
                  Reabrir tarea
                </button>
              )}

              <button
                onClick={() => setSelectedTask(null)}
                className="btn btn-sm btn-ghost text-slate-500 font-bold rounded-lg cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag confirmation complete modal */}
      {confirmDragAction?.type === 'complete' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5 animate-bounce" />
              <h4 className="text-base font-extrabold text-slate-800">
                ¿Completar actividad directamente?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Vas a marcar la actividad <span className="font-extrabold text-slate-800">"{confirmDragAction.task.title}"</span> como completada directamente sin pasar por "En progreso". ¿Confirmas esta acción?
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleConfirmDragComplete}
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Sí, marcar completada
              </button>
              <button
                onClick={() => setConfirmDragAction(null)}
                className="btn btn-sm btn-outline border-slate-300 text-slate-500 font-bold rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag confirmation reopen modal */}
      {confirmDragAction?.type === 'reopen' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-blue-600">
              <RefreshCw className="w-5 h-5 animate-spin duration-3000" />
              <h4 className="text-base font-extrabold text-slate-800">
                ¿Reabrir actividad?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Vas a reabrir la actividad <span className="font-extrabold text-slate-800">"{confirmDragAction.task.title}"</span> y moverla a "{confirmDragAction.targetCol === 'inprogress' ? 'En progreso' : 'Por hacer'}". ¿Confirmas esta acción?
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleConfirmDragReopen}
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Sí, reabrir
              </button>
              <button
                onClick={() => setConfirmDragAction(null)}
                className="btn btn-sm btn-outline border-slate-300 text-slate-500 font-bold rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advance Tarea Flow Dialog */}
      {taskToAdvance && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-blue-600">
              <Calendar className="w-5 h-5" />
              <h4 className="text-base font-extrabold text-slate-800">
                ¿Quieres hacer esta tarea hoy?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Vas a traer la actividad <span className="font-extrabold text-slate-800">"{taskToAdvance.title}"</span> (Día {taskToAdvance.dayNumber}) para realizarla <span className="font-extrabold text-emerald-600">hoy</span>.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => handleConfirmAdvance('adicionar')}
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Agregar a hoy
              </button>
              <button
                onClick={() => handleConfirmAdvance('reemplazar')}
                className="btn btn-sm btn-outline border-blue-500 text-blue-600 hover:bg-blue-50 font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Reemplazar prioridad de hoy
              </button>
              <button
                onClick={() => setTaskToAdvance(null)}
                className="btn btn-sm btn-ghost text-slate-500 font-bold rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recalculate Plan Dialog */}
      {showRecalculateDialog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-violet-600">
              <RefreshCw className="w-5 h-5 animate-spin duration-1000" />
              <h4 className="text-base font-extrabold text-slate-800">
                ¿Quieres recalcular el plan para reducir carga futura?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Has adelantado actividades del cronograma con éxito. ¿Deseas reorganizar tu carga de estudio futura?
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => handleConfirmRecalculate('carga')}
                className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Recalcular plan
              </button>
              <button
                onClick={() => handleConfirmRecalculate('mantener')}
                className="btn btn-sm btn-outline border-violet-500 text-violet-600 hover:bg-violet-50 font-bold rounded-xl cursor-pointer min-h-[36px]"
              >
                Mantener plan actual
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reprogram Drawer */}
      {reprogrammingTask && (
        <>
          {/* Subtle backdrop overlay (very light, e.g. bg-slate-900/[0.02], no blur) */}
          <div
            onClick={() => setReprogrammingTask(null)}
            className="fixed inset-0 bg-slate-900/[0.02] z-40 transition-opacity duration-300"
          />

          <div className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Reprogramar actividad</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Día actual: Día {reprogrammingTask.dayNumber}</p>
              </div>
              <button
                onClick={() => setReprogrammingTask(null)}
                className="btn btn-ghost btn-sm btn-circle cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nombre de la tarea</span>
                <h4 className="text-xs font-bold text-slate-800 leading-snug">
                  {reprogrammingTask.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Estado actual</span>
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                    reprogrammingTask.status === 'todo' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                    reprogrammingTask.status === 'inprogress' ? 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse' :
                    'bg-emerald-100 text-emerald-700 border-emerald-200'
                  }`}>
                    {reprogrammingTask.status === 'todo' ? 'Por hacer' :
                     reprogrammingTask.status === 'inprogress' ? 'Activo' : 'Completado'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Duración estimada</span>
                  <p className="text-xs text-slate-700 font-semibold">{reprogrammingTask.duration}</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-800 font-medium">
                <span className="font-bold">Impacto en el plan:</span> {reprogrammingTask.impact}
              </div>

              {/* Selector de Nuevo Día */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <label htmlFor="reprogram-new-day" className="text-xs font-extrabold text-slate-700 block">
                  ¿Para qué día quieres programar esta tarea?
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">Día destino (1-30):</span>
                  <input
                    id="reprogram-new-day"
                    type="number"
                    min={1}
                    max={30}
                    value={newDayVal}
                    onChange={(e) => setNewDayVal(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                    className="input input-sm border border-slate-300 rounded-lg w-20 text-center font-bold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy"
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                  Al cambiar el día, la tarea se reubicará automáticamente en el calendario flotante y en el tablero Kanban.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50 flex gap-2">
              <button
                onClick={() => {
                  onUpdateTask(reprogrammingTask.id, { dayNumber: newDayVal, isReprogramada: true })
                  setReprogrammingTask(null)
                  setLocalToast({
                    message: `📅 Actividad reprogramada para el Día ${newDayVal}.`,
                    type: 'info'
                  })
                }}
                className="btn btn-sm bg-navy text-white hover:bg-navy/90 font-bold rounded-xl cursor-pointer flex-1 border-none shadow-sm min-h-[38px]"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setReprogrammingTask(null)}
                className="btn btn-sm btn-outline border-slate-300 text-slate-600 hover:bg-slate-100 font-bold rounded-xl cursor-pointer flex-1 min-h-[38px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Drag Overlay Preview */}
      <DragOverlay>
        {activeDragTask ? (
          <TaskDragOverlay task={activeDragTask} />
        ) : null}
      </DragOverlay>

    </DndContext>
  )
}

