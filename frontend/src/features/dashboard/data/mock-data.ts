import { Mic, FileText, Search, Calendar } from 'lucide-react'
import type { StudentProfile, StatItem, QuickAction, JobMatch, Mentor, ProgressItem } from '../types'

export const studentProfile: StudentProfile = {
  name: 'Anibal Alejandro',
  career: 'Estudiante',
  completionPercent: 72,
  avatarInitial: 'A',
  email: 'u11111111@utp.edu.pe'
}

export const stats: StatItem[] = [
  { label: 'Postulaciones activas', value: '3', colorClass: 'text-base-content' },
  { label: 'Entrevistas simuladas', value: '12', colorClass: 'text-info' },
  { label: 'Talleres inscritos', value: '2', colorClass: 'text-warning' },
]

export const quickActions: QuickAction[] = [
  {
    title: 'Simular entrevista',
    description: 'IA te hace preguntas reales',
    icon: Mic,
    bgColorClass: 'bg-violet-100',
    iconColorClass: 'text-violet-600',
    href: '/simulator',
  },
  {
    title: 'Construir mi CV',
    description: 'Formato Harvard con IA',
    icon: FileText,
    bgColorClass: 'bg-emerald-100',
    iconColorClass: 'text-emerald-600',
    href: '/cv-builder',
  },
  {
    title: 'Buscar prácticas',
    description: 'Match con tu perfil',
    icon: Search,
    bgColorClass: 'bg-amber-100',
    iconColorClass: 'text-amber-600',
    href: '/job-match',
  },
  {
    title: 'Plan 30 días',
    description: 'Ruta personalizada',
    icon: Calendar,
    bgColorClass: 'bg-rose-100',
    iconColorClass: 'text-rose-600',
    href: '/plan-30d',
  },
]

export const jobMatches: JobMatch[] = [
  {
    id: '1',
    companyInitial: 'S',
    avatarColor: 'bg-red-500',
    matchPercent: 87,
    title: 'Junior Data Analyst',
    company: 'Scotiabank',
    tags: ['Python', 'SQL'],
  },
  {
    id: '2',
    companyInitial: 'B',
    avatarColor: 'bg-blue-600',
    matchPercent: 79,
    title: 'Business Analyst Intern',
    company: 'BCP',
    tags: ['Power BI', 'Excel'],
  },
  {
    id: '3',
    companyInitial: 'I',
    avatarColor: 'bg-yellow-500',
    matchPercent: 74,
    title: 'Data Science Intern',
    company: 'Interbank',
    tags: ['Python', 'TensorFlow'],
  },
  {
    id: '4',
    companyInitial: 'E',
    avatarColor: 'bg-cyan-500',
    matchPercent: 68,
    title: 'Data Engineer Intern',
    company: 'Entel',
    tags: ['AWS', 'Spark'],
  },
]

export const mentor: Mentor = {
  name: 'Ana Torres',
  position: 'Ing. Sistemas',
  company: 'BCP',
  timeAgo: '10mo',
  avatarInitial: 'A',
}

export const progressItems: ProgressItem[] = [
  { label: 'Calidad del CV (IA)', current: 85, total: 100, colorClass: 'progress-primary' },
  { label: 'Talleres y cursos completados', current: 4, total: 5, colorClass: 'progress-info' },
  { label: 'Asistencia a eventos de UTP', current: 2, total: 3, colorClass: 'progress-secondary' },
  { label: 'Desafíos del Plan 30 Días', current: 5, total: 7, colorClass: 'progress-success' },
]

export const newsItems = [
  {
    id: '1',
    title: 'Feria Laboral UTP: ¡Postula a las mejores ofertas!',
    imageUrl: '/image.png',
    link: 'https://portal.utp.edu.pe',
  },
  {
    id: '2',
    title: 'Concurso Startup UTP: Inspírate y da el siguiente paso',
    imageUrl: '/image 2png',
    link: 'https://portal.utp.edu.pe',
  },
  {
    id: '3',
    title: 'Competencia E-SPORTS UTP: Vive la experiencia gamer',
    imageUrl: '/image 3.png',
    link: 'https://portal.utp.edu.pe',
  }
]
