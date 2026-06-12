import type { MentorProfile, MiniMentor, Connection } from '../types'

export const featuredMentor: MentorProfile = {
  name: 'Ana Torres',
  career: 'Ing. Sistemas',
  semester: '10mo semestre',
  company: 'BCP',
  skills: ['Data Engineering', 'SQL', 'Liderazgo'],
  bio: 'Liderando actualmente un proyecto de pipeline de datos en BCP. Apasionada por ayudar a juniors a navegar su primera práctica.',
  rating: 4.8,
  sessions: 12,
  avatarInitial: 'A',
  avatarColor: 'bg-emerald-600',
  isOnline: true,
}

export const moreMentors: MiniMentor[] = [
  { id: '1', name: 'Luis Quispe', company: 'Scotiabank', rating: 4.6, avatarInitial: 'L', avatarColor: 'bg-violet-600' },
  { id: '2', name: 'María Chávez', company: 'Interbank', rating: 4.9, avatarInitial: 'M', avatarColor: 'bg-amber-500' },
]

export const connections: Connection[] = [
  { id: '1', name: 'Rosa', company: 'Entel', avatarInitial: 'R', avatarColor: 'bg-red-500' },
]

export const howItWorks = [
  'Desliza o conecta con un mentor',
  'Agenda una sesión gratuita de 30 min',
  'Recibe guía de alguien que ya está en prácticas',
]
