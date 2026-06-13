export interface ActiveFilter {
  id: string
  label: string
}

export interface TodayMatch {
  id: string
  initial: string
  company: string
  avatarColor: string
}

export interface SwipeJob {
  companyInitial: string
  avatarColor: string
  matchPercent: number
  title: string
  company: string
  tags: string[]
  schedule: string
  requirement: string
  highlight: string
}

export interface JobListItem {
  id: string
  initial: string
  avatarColor: string
  matchPercent: number
  title: string
  company: string
  status: string
  statusColor: 'success' | 'warning' | 'error'
}
