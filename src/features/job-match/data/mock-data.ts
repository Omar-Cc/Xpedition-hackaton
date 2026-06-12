import type { ActiveFilter, TodayMatch, SwipeJob, JobListItem } from '../types'

export const activeFilters: ActiveFilter[] = [
  { id: '1', label: 'Ing. Sistemas' },
  { id: '2', label: 'Prácticas' },
  { id: '3', label: 'Turno tarde' },
]

export const todayMatches: TodayMatch[] = [
  { id: '1', initial: 'S', company: 'Scotiabank', avatarColor: 'bg-red-500' },
  { id: '2', initial: 'A', company: 'Alicorp', avatarColor: 'bg-emerald-600' },
  { id: '3', initial: 'M', company: 'Maple', avatarColor: 'bg-violet-600' },
]

export const featuredJob: SwipeJob = {
  companyInitial: 'S',
  avatarColor: 'bg-red-500',
  matchPercent: 87,
  title: 'Junior Data Analyst',
  company: 'Scotiabank Perú',
  tags: ['Python', 'Excel', 'SQL'],
  schedule: 'Turno tarde · Remoto',
  requirement: 'Desde 8vo semestre',
  highlight: 'Compatible con tu horario',
}

export const allJobs: JobListItem[] = [
  { id: '1', initial: 'S', avatarColor: 'bg-red-500', matchPercent: 87, title: 'Junior Data Analyst', company: 'Scotiabank', status: 'Postulación abierta', statusColor: 'success' },
  { id: '2', initial: 'B', avatarColor: 'bg-blue-600', matchPercent: 79, title: 'Business Analyst', company: 'BCP', status: 'Cierra en 3 días', statusColor: 'warning' },
  { id: '3', initial: 'I', avatarColor: 'bg-yellow-500', matchPercent: 74, title: 'Data Science Intern', company: 'Interbank', status: 'Postulación abierta', statusColor: 'success' },
  { id: '4', initial: 'R', avatarColor: 'bg-red-400', matchPercent: 71, title: 'Analytics Intern', company: 'Rimac', status: 'Postulación abierta', statusColor: 'success' },
  { id: '5', initial: 'A', avatarColor: 'bg-orange-500', matchPercent: 65, title: 'Data Analyst Jr.', company: 'Alicorp', status: 'Cierra en 1 día', statusColor: 'error' },
]
