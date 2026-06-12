import type { CourseStat, CourseMatch, TopCourse } from '../types'

export const targetJob = { title: 'Junior Data Analyst', company: 'Scotiabank Perú' }

export const courseStats: CourseStat[] = [
  { label: 'Habilidades cubiertos', value: 2, bgClass: 'bg-teal-50', textClass: 'text-teal-600' },
  { label: 'Coincidencias parciales', value: 3, bgClass: 'bg-orange-50', textClass: 'text-orange-500' },
  { label: 'Brechas identificadas', value: 1, bgClass: 'bg-red-50', textClass: 'text-red-500' },
  { label: 'Fortalezas a destacar', value: 2, bgClass: 'bg-violet-50', textClass: 'text-violet-600' },
]

export const courseMatches: CourseMatch[] = [
  { requirement: 'Python intermedio', course: 'Programación II', grade: 17, status: 'covered' },
  { requirement: 'Visualización de datos', course: 'Estadística para Ingenieros', grade: 16, status: 'partial' },
  { requirement: 'Machine learning básico', course: 'Sin curso', grade: 0, status: 'gap', hasLink: true },
  { requirement: 'Excel avanzado', course: 'Herramientas Ofimáticas', grade: 14, status: 'partial' },
  { requirement: 'SQL intermedio', course: 'Base de Datos I', grade: 18, status: 'covered' },
  { requirement: 'Comunicación efectiva', course: 'Comunicación Empresarial', grade: 15, status: 'partial' },
]

export const topCourses: TopCourse[] = [
  { id: '1', name: 'Programación II', grade: 17, professor: 'Dr. García', period: '2024-I', tags: ['Python', 'Algoritmos'] },
  { id: '2', name: 'Base de Datos I', grade: 18, professor: 'Mg. Torres', period: '2023-I', tags: ['SQL', 'Modelado'] },
]
