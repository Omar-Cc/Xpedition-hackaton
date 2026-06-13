export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado'

export type DayStatusType =
  | 'completed'
  | 'pending'
  | 'today'
  | 'overdue'
  | 'interview'
  | 'mentorship'
  | 'application'
  | 'simulation'

export type TaskCategory =
  | 'técnica'
  | 'blanda'
  | 'CV'
  | 'entrevista'
  | 'postulación'

export type JobBadgeType = 'Recomendado' | 'Retador' | 'Alternativa'

export type AcademicLoad = 'Normal' | 'Semana pesada' | 'Semana de exámenes'

export type CalendarEventType =
  | 'tarea'
  | 'entrevista'
  | 'mentoría'
  | 'fecha límite'
  | 'recordatorio'

export interface JobTarget {
  id: string
  company: string
  companyCode: string
  companyColor: string
  position: string
  matchPercent: number
  difficulty: 'Baja' | 'Media' | 'Alta'
  badge: JobBadgeType
  mainGaps: string[]
}

export interface CalendarDay {
  date: number
  dayLabel: string
  status: DayStatusType
  taskLabel?: string
}

export interface SkillGapLevel {
  skill: string
  currentLevel: SkillLevel
  requiredLevel: SkillLevel
  action: string
}

export interface TaskCheckbox {
  id: string
  label: string
  done: boolean
}

export interface TodayTaskData {
  date: string
  category: TaskCategory
  title: string
  duration: string
  description: string
  checkboxes: TaskCheckbox[]
  tomorrowPreview: string
}

export interface WeekImpact {
  currentMatch: number
  projectedMatch: number
  targetCompany: string
  deliverables: { label: string; done: boolean }[]
}

export interface CalendarEvent {
  id: string
  title: string
  time: string
  type: CalendarEventType
}

export interface NextAction {
  title: string
  reason: string
  impact: string
}

export interface CompanyChip {
  code: string
  color: string
}
