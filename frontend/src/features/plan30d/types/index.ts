// ── Enums & Literal Unions ──────────────────────────────────────────

/** Discrete skill level — rendered as a 3-step bar, never a percentage. */
export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado'

/** Day status for both the week strip and the full-month calendar. */
export type DayStatusType =
  | 'completed'
  | 'pending'
  | 'today'
  | 'overdue'
  | 'interview'
  | 'mentorship'
  | 'application'
  | 'simulation'

/** Category tag shown on today's task card. */
export type TaskCategory =
  | 'técnica'
  | 'blanda'
  | 'CV'
  | 'entrevista'
  | 'postulación'

/** Visual badge that appears on each job target card. */
export type JobBadgeType = 'Recomendado' | 'Retador' | 'Alternativa'

/** Academic load mode — adjusts daily task intensity. */
export type AcademicLoad = 'Normal' | 'Semana pesada' | 'Semana de exámenes'

/** Plan duration option in days */
export type PlanDuration = 5 | 7 | 15 | 30

/** Suggested plan intensity */
export type PlanIntensity = 'Baja' | 'Media' | 'Alta'

// ── Data Interfaces ─────────────────────────────────────────────────

/** A target job posting the student is preparing for. */
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
  daysLeft: number
  deadlineDate: string
}

/** Single day in the week-strip or full-month calendar. */
export interface CalendarDay {
  date: number
  dayLabel: string
  status: DayStatusType
  taskLabel?: string
}

/** A skill gap rendered with discrete level bars (not percentages). */
export interface SkillGapLevel {
  skill: string
  currentLevel: SkillLevel
  requiredLevel: SkillLevel
  action: string
}

/** Checkbox item inside today's task card. */
export interface TaskCheckbox {
  id: string
  label: string
  done: boolean
}

/** Full data model for the "Today's Task" card. */
export interface TodayTaskData {
  date: string
  category: TaskCategory
  title: string
  duration: string
  description: string
  checkboxes: TaskCheckbox[]
  tomorrowPreview: string
}

/** Right-column "week impact" panel data. */
export interface WeekImpact {
  currentMatch: number
  projectedMatch: number
  targetCompany: string
  deliverables: { label: string; done: boolean }[]
}

/** Event entry for the floating calendar panel. */
export interface CalendarEvent {
  id: string
  title: string
  time: string
  type: 'task' | 'interview' | 'mentorship' | 'deadline' | 'reminder'
}

/** The single "next best action" nudge shown prominently. */
export interface NextAction {
  title: string
  reason: string
  impact: string
}

/** Compact company chip rendered in the header area. */
export interface CompanyChip {
  code: string
  color: string
}

/** Quick Action to improve CV/Profile today */
export interface QuickWin {
  id: string
  label: string
  points: number
  done: boolean
}

/** Simulated interview recommendation */
export interface SimulationRecommendation {
  title: string
  topicList: string
  duration: string
}

/** Suggested mentor recommendation */
export interface MentorRecommendation {
  name: string
  position: string
  company: string
  achievement: string
  avatarInitial: string
}

/** Recommended courses and workshops integrated from UTP+Class and UTP+Portal */
export interface CourseRecommendation {
  title: string
  source: 'UTP+Class' | 'UTP+Portal'
  description: string
  benefit: string
}
