import type { SessionInfo, PreviousAnswer } from '../types'

export const sessionData = {
  company: 'Scotiabank Perú',
  round: 'Ronda conductual y técnica',
  currentQuestion: 3,
  totalQuestions: 8,
  question: '¿Cómo manejas prioridades que compiten entre sí?',
}

export const sessionInfo: SessionInfo[] = [
  { label: 'Empresa', value: 'Scotiabank Perú', highlight: true },
  { label: 'Tipo', value: 'Conductual + técnica' },
  { label: 'Preguntas totales', value: '8', highlight: true },
  { label: 'Completadas', value: '2' },
]

export const previousAnswers: PreviousAnswer[] = [
  {
    id: '1',
    question: 'Cuéntame sobre tu experiencia con Python',
    score: 82,
    feedback: 'Buena respuesta — agrega más ejemplos concretos',
    scoreColor: 'text-warning',
  },
  {
    id: '2',
    question: '¿Cuál es tu mayor fortaleza?',
    score: 90,
    feedback: 'Excelente — respuesta clara y con evidencia',
    scoreColor: 'text-success',
  },
]
