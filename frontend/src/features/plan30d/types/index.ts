export interface DayStatus {
  day: string
  dayNum: number
  status: 'done' | 'today' | 'upcoming'
}

export interface SkillGap {
  skill: string
  gain: string
  progressPercent: number
  colorClass: string
}

export interface TaskCheckbox {
  id: string
  label: string
  done: boolean
}

export interface WeekDay {
  day: string
  task: string
  status: 'done' | 'today' | 'upcoming'
}

export interface CompanyChip {
  code: string
  color: string
}
