export interface ApplicationStep {
  label: string
  sublabel: string
  status: 'done' | 'active' | 'pending'
  badge?: string
  badgeColor?: string
}

export interface OverallProgress {
  company: string
  initial: string
  avatarColor: string
  phase: number
  totalPhases: number
  progressPercent: number
  barColor: string
}

export interface InterviewDetail {
  label: string
  value: string
  highlight?: boolean
}

export interface PrepQuestion {
  id: string
  label: string
}
