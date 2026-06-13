import type { ApplicationStep, OverallProgress, InterviewDetail, PrepQuestion } from '../types'

export const activeCompanies = [
  { id: '1', initial: 'S', name: 'Scotiabank', avatarColor: 'bg-red-500' },
  { id: '2', initial: 'B', name: 'BCP', avatarColor: 'bg-blue-600' },
  { id: '3', initial: 'I', name: 'Interbank', avatarColor: 'bg-yellow-500' },
]

export const applicationSteps: ApplicationStep[] = [
  { label: 'Aplicado', sublabel: 'CV enviado — Día 1', status: 'done' },
  { label: 'Test técnico', sublabel: 'Aprobado — Puntaje 82%', status: 'done', badge: '82%', badgeColor: 'bg-success' },
  { label: 'Entrevista RRHH', sublabel: 'Programado: Jueves 3:00 PM', status: 'active', badge: 'En 2 días', badgeColor: 'bg-warning' },
  { label: 'Entrevista final', sublabel: '', status: 'pending' },
  { label: 'Oferta', sublabel: '', status: 'pending' },
]

export const prepQuestions: PrepQuestion[] = [
  { id: 'q1', label: 'Trabajo bajo presión' },
  { id: 'q2', label: 'Manejo de prioridades' },
  { id: 'q3', label: 'Conflicto en equipo' },
  { id: 'q4', label: 'Por qué Scotiabank' },
]

export const overallProgress: OverallProgress[] = [
  { company: 'Scotiabank', initial: 'S', avatarColor: 'bg-red-500', phase: 3, totalPhases: 5, progressPercent: 60, barColor: 'progress-error' },
  { company: 'BCP', initial: 'B', avatarColor: 'bg-blue-600', phase: 1, totalPhases: 5, progressPercent: 20, barColor: 'progress-info' },
  { company: 'Interbank', initial: 'I', avatarColor: 'bg-yellow-500', phase: 2, totalPhases: 5, progressPercent: 40, barColor: 'progress-warning' },
]

export const interviewDetails: InterviewDetail[] = [
  { label: 'Empresa', value: 'Scotiabank Perú', highlight: true },
  { label: 'Rol', value: 'Junior Data Analyst', highlight: true },
  { label: 'Fecha', value: 'Jueves, Jun 13' },
  { label: 'Hora', value: '3:00 PM' },
  { label: 'Modalidad', value: 'Videollamada' },
  { label: 'Entrevistador', value: 'Recursos Humanos' },
]

export const resources = [
  { label: 'Simular entrevista IA', href: '/simulator' },
  { label: 'Revisar mi CV', href: '/cv-builder' },
  { label: 'Ver cursos de soporte', href: '/cursos' },
]
