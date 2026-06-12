import type { DayStatus, SkillGap, TaskCheckbox, WeekDay, CompanyChip } from '../types'

export const daysRemaining = 23
export const targetJob = 'Junior Data Analyst'

export const companyChips: CompanyChip[] = [
  { code: 'SCO', color: 'bg-red-500' },
  { code: 'BCP', color: 'bg-gray-800' },
  { code: 'IBK', color: 'bg-yellow-500' },
]

export const weekDays: DayStatus[] = [
  { day: 'Lun', dayNum: 1, status: 'done' },
  { day: 'Mar', dayNum: 2, status: 'done' },
  { day: 'Mié', dayNum: 3, status: 'today' },
  { day: 'Jue', dayNum: 4, status: 'upcoming' },
  { day: 'Vie', dayNum: 5, status: 'upcoming' },
  { day: 'Sáb', dayNum: 6, status: 'upcoming' },
  { day: 'Dom', dayNum: 7, status: 'upcoming' },
]

export const skillGaps: SkillGap[] = [
  { skill: 'Python', gain: '+20%', progressPercent: 75, colorClass: 'progress-success' },
  { skill: 'Excel', gain: '+20%', progressPercent: 60, colorClass: 'progress-success' },
  { skill: 'SQL', gain: '+10%', progressPercent: 80, colorClass: 'progress-success' },
]

export const todayTask = {
  date: 'MIÉRCOLES 3',
  badge: 'Habilidad técnica',
  title: 'Practica manipulación de datos con pandas — 45 min',
  description: 'Basado en: oferta de Scotiabank — requiere Python intermedio',
  checkboxes: [
    { id: 'c1', label: 'Completar ejercicios de pandas 1–3', done: false },
    { id: 'c2', label: 'Ver tutorial de manipulación de datos', done: false },
  ] as TaskCheckbox[],
}

export const weekProgress: WeekDay[] = [
  { day: 'Lunes', task: 'Intro a pandas', status: 'done' },
  { day: 'Martes', task: 'Limpieza de datos', status: 'done' },
  { day: 'Miércoles', task: 'Manipulación pandas', status: 'today' },
  { day: 'Jueves', task: 'VLOOKUP & Pivot', status: 'upcoming' },
  { day: 'Viernes', task: 'Simulacro de entrevista', status: 'upcoming' },
]
