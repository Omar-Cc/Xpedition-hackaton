import type { CVStep, DetectedKeyword, SkillMatch } from '../types'

export const cvSteps: CVStep[] = [
  { id: 1, label: 'Oferta de empleo' },
  { id: 2, label: 'IA genera CV' },
  { id: 3, label: 'Revisar y enviar' },
]

export const detectedKeywords: DetectedKeyword[] = [
  { text: 'Python intermedio', colorClass: 'badge-soft badge-secondary' },
  { text: 'Excel avanzado', colorClass: 'badge-soft badge-success' },
  { text: 'Atención al cliente', colorClass: 'badge-soft badge-warning' },
  { text: '8vo semestre+', colorClass: 'badge-soft badge-secondary' },
  { text: 'Trabajo en equipo', colorClass: 'badge-soft badge-neutral' },
]

export const skillMatches: SkillMatch[] = [
  { skill: 'Python intermedio', status: 'covered' },
  { skill: 'Excel avanzado', status: 'covered' },
  { skill: 'Atención al cliente', status: 'covered' },
  { skill: 'Machine learning básico', status: 'gap' },
  { skill: 'Visualización de datos', status: 'gap' },
]
