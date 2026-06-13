import type {
  JobTarget,
  CalendarDay,
  DayStatusType,
  SkillGapLevel,
  TodayTaskData,
  WeekImpact,
  NextAction,
  CalendarEvent,
  CompanyChip,
  QuickWin,
  SimulationRecommendation,
  MentorRecommendation,
  CourseRecommendation,
} from '../types'

export const daysRemaining = 23

export const jobTargets: JobTarget[] = [
  {
    id: 'scotiabank-da',
    company: 'Scotiabank',
    companyCode: 'SCO',
    companyColor: 'bg-red-500',
    position: 'Junior Data Analyst',
    matchPercent: 82,
    difficulty: 'Media',
    badge: 'Recomendado',
    mainGaps: ['Python avanzado', 'SQL avanzado', 'Storytelling'],
    daysLeft: 12,
    deadlineDate: '25 de Junio',
  },
  {
    id: 'bcp-bi',
    company: 'BCP',
    companyCode: 'BCP',
    companyColor: 'bg-blue-800',
    position: 'Practicante BI',
    matchPercent: 76,
    difficulty: 'Alta',
    badge: 'Retador',
    mainGaps: ['Power BI avanzado', 'ETL básico', 'Data Warehouse'],
    daysLeft: 4,
    deadlineDate: '17 de Junio',
  },
  {
    id: 'interbank-dt',
    company: 'Interbank',
    companyCode: 'IBK',
    companyColor: 'bg-green-600',
    position: 'Data Trainee',
    matchPercent: 71,
    difficulty: 'Baja',
    badge: 'Alternativa',
    mainGaps: ['Excel avanzado', 'SQL intermedio'],
    daysLeft: 19,
    deadlineDate: '2 de Julio',
  },
]

export const defaultSelectedJobId = 'scotiabank-da'

export const companyChips: CompanyChip[] = jobTargets.map((j) => ({
  code: j.companyCode,
  color: j.companyColor,
}))

export const weekDays: CalendarDay[] = [
  { date: 9, dayLabel: 'Lun', status: 'completed', taskLabel: 'Intro a pandas' },
  { date: 10, dayLabel: 'Mar', status: 'completed', taskLabel: 'Limpieza de datos' },
  { date: 11, dayLabel: 'Mié', status: 'today', taskLabel: 'Manipulación pandas' },
  { date: 12, dayLabel: 'Jue', status: 'pending', taskLabel: 'VLOOKUP & Pivot' },
  { date: 13, dayLabel: 'Vie', status: 'pending', taskLabel: 'Simulacro entrevista' },
  { date: 14, dayLabel: 'Sáb', status: 'pending' },
  { date: 15, dayLabel: 'Dom', status: 'pending' },
]

const monthTaskLabels: Record<number, string> = {
  1: 'Setup perfil',
  2: 'CV review',
  3: 'Python básico',
  4: 'SQL intro',
  5: 'Ejercicio Excel',
  6: 'Mock interview',
  7: 'Descanso',
  8: 'Dashboard Power BI',
  9: 'Intro a pandas',
  10: 'Limpieza de datos',
  11: 'Manipulación pandas',
  12: 'VLOOKUP & Pivot',
  13: 'Simulacro entrevista',
  15: 'Entrevista práctica',
  18: 'Mentoría con Juan P.',
  22: 'Postulación Scotiabank',
  25: 'Simulación técnica',
}

const monthStatuses: Record<number, DayStatusType> = {
  1: 'completed', 2: 'completed', 3: 'completed', 4: 'completed',
  5: 'completed', 6: 'completed', 7: 'completed',
  8: 'overdue',
  9: 'completed', 10: 'completed',
  11: 'today',
  15: 'interview',
  18: 'mentorship',
  22: 'application',
  25: 'simulation',
}

export const monthDays: CalendarDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = i + 1
  return {
    date,
    dayLabel: '',
    status: monthStatuses[date] ?? 'pending',
    taskLabel: monthTaskLabels[date],
  }
})

export const skillGapsByJob: Record<string, SkillGapLevel[]> = {
  'scotiabank-da': [
    { skill: 'Python', currentLevel: 'Intermedio', requiredLevel: 'Avanzado', action: 'Completar curso de pandas y numpy' },
    { skill: 'Excel', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Practicar tablas dinámicas y VLOOKUP' },
    { skill: 'SQL', currentLevel: 'Intermedio', requiredLevel: 'Avanzado', action: 'Ejercicios de JOINs y subqueries' },
    { skill: 'Storytelling', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Curso de visualización de datos' },
  ],
  'bcp-bi': [
    { skill: 'Power BI', currentLevel: 'Básico', requiredLevel: 'Avanzado', action: 'Curso completo de Power BI Desktop' },
    { skill: 'SQL', currentLevel: 'Intermedio', requiredLevel: 'Avanzado', action: 'Práctica con CTEs y Window Functions' },
    { skill: 'ETL', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Aprender flujos de transformación' },
    { skill: 'Excel', currentLevel: 'Intermedio', requiredLevel: 'Avanzado', action: 'Macros y automatización' },
  ],
  'interbank-dt': [
    { skill: 'Excel', currentLevel: 'Básico', requiredLevel: 'Avanzado', action: 'Curso intensivo de Excel avanzado' },
    { skill: 'SQL', currentLevel: 'Intermedio', requiredLevel: 'Intermedio', action: 'Repasar consultas básicas' },
    { skill: 'Python', currentLevel: 'Intermedio', requiredLevel: 'Intermedio', action: 'Mantener nivel actual' },
  ],
}

export const todayTaskByJob: Record<string, TodayTaskData> = {
  'scotiabank-da': {
    date: 'HOY',
    category: 'técnica',
    title: 'Practica manipulación de datos con pandas',
    duration: '45 min',
    description:
      'Esta tarea fue seleccionada porque las ofertas de Junior Data Analyst suelen requerir limpieza, transformación y análisis de datos con Python.',
    checkboxes: [
      { id: 'c1', label: 'Completar ejercicios de pandas 1–3', done: false },
      { id: 'c2', label: 'Ver tutorial de manipulación de datos', done: false },
      { id: 'c3', label: 'Resolver mini caso práctico', done: false },
    ],
    tomorrowPreview: 'Mañana: VLOOKUP & tablas dinámicas en Excel — 40 min',
  },
  'bcp-bi': {
    date: 'HOY',
    category: 'técnica',
    title: 'Crea tu primer dashboard en Power BI',
    duration: '60 min',
    description:
      'BCP busca practicantes que dominen Power BI para crear reportes ejecutivos. Esta tarea te acerca a ese nivel.',
    checkboxes: [
      { id: 'c1', label: 'Importar dataset de ejemplo', done: false },
      { id: 'c2', label: 'Crear 3 visualizaciones básicas', done: false },
      { id: 'c3', label: 'Publicar dashboard en Power BI Service', done: false },
    ],
    tomorrowPreview: 'Mañana: Modelado de datos con DAX — 50 min',
  },
  'interbank-dt': {
    date: 'HOY',
    category: 'técnica',
    title: 'Domina tablas dinámicas en Excel',
    duration: '35 min',
    description:
      'Interbank valora el dominio de Excel para análisis rápido de datos. Las tablas dinámicas son una habilidad clave.',
    checkboxes: [
      { id: 'c1', label: 'Crear tabla dinámica con dataset ventas', done: false },
      { id: 'c2', label: 'Agregar campos calculados', done: false },
      { id: 'c3', label: 'Exportar reporte resumen', done: false },
    ],
    tomorrowPreview: 'Mañana: Fórmulas avanzadas BUSCARV e INDICE — 30 min',
  },
}

export const weekImpactByJob: Record<string, WeekImpact> = {
  'scotiabank-da': {
    currentMatch: 68,
    projectedMatch: 76,
    targetCompany: 'Scotiabank',
    deliverables: [
      { label: '1 práctica técnica completada', done: true },
      { label: '1 simulación de entrevista', done: false },
      { label: '1 mejora al CV', done: false },
      { label: '1 postulación enviada', done: false },
      { label: '1 sesión de feedback', done: false },
    ],
  },
  'bcp-bi': {
    currentMatch: 58,
    projectedMatch: 67,
    targetCompany: 'BCP',
    deliverables: [
      { label: '1 dashboard Power BI creado', done: false },
      { label: '1 ejercicio de SQL avanzado', done: true },
      { label: '1 mejora al CV', done: false },
      { label: '1 postulación enviada', done: false },
      { label: '1 sesión de mentoría', done: false },
    ],
  },
  'interbank-dt': {
    currentMatch: 63,
    projectedMatch: 71,
    targetCompany: 'Interbank',
    deliverables: [
      { label: '1 práctica de Excel avanzado', done: false },
      { label: '1 repaso de SQL básico', done: true },
      { label: '1 mejora al CV', done: false },
      { label: '1 postulación enviada', done: false },
      { label: '1 sesión de feedback', done: false },
    ],
  },
}

export const nextActionByJob: Record<string, NextAction> = {
  'scotiabank-da': {
    title: 'Completa la práctica de pandas',
    reason: 'Esta actividad mejora tu preparación para 3 ofertas activas.',
    impact: '+8% compatibilidad con Scotiabank',
  },
  'bcp-bi': {
    title: 'Inicia tu dashboard en Power BI',
    reason: 'Es la habilidad más demandada para el puesto de Practicante BI.',
    impact: '+9% compatibilidad con BCP',
  },
  'interbank-dt': {
    title: 'Practica tablas dinámicas',
    reason: 'Excel avanzado es requisito clave para Data Trainee.',
    impact: '+8% compatibilidad con Interbank',
  },
}

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Práctica pandas', time: 'Hoy, 3:00 PM', type: 'task' },
  { id: 'e2', title: 'Entrevista práctica', time: 'Vie 13, 10:00 AM', type: 'interview' },
  { id: 'e3', title: 'Mentoría con Juan P.', time: 'Mié 18, 4:00 PM', type: 'mentorship' },
  { id: 'e4', title: 'Deadline: Postulación SCO', time: 'Dom 22, 11:59 PM', type: 'deadline' },
  { id: 'e5', title: 'Simulación técnica', time: 'Mié 25, 2:00 PM', type: 'reminder' },
]

// ── New Mock Data for the Redesigned "Mi Plan" ──────────────────────────

export const quickWinsByJob: Record<string, QuickWin[]> = {
  'scotiabank-da': [
    { id: 'qw1', label: 'Agregar keywords "Pandas" y "Limpieza de datos" a tu perfil', points: 3, done: false },
    { id: 'qw2', label: 'Resolver el mini-ejercicio de SQL JOINs en el simulador', points: 4, done: false },
    { id: 'qw3', label: 'Subir tu último proyecto académico sobre Análisis Financiero como portafolio', points: 5, done: false },
  ],
  'bcp-bi': [
    { id: 'qw1', label: 'Alinear tu sección de experiencia con Power BI y modelado DAX', points: 4, done: false },
    { id: 'qw2', label: 'Ver el video de 5 minutos sobre Storytelling Financiero', points: 3, done: false },
    { id: 'qw3', label: 'Actualizar tu promedio ponderado en el perfil UTP', points: 2, done: false },
  ],
  'interbank-dt': [
    { id: 'qw1', label: 'Añadir certificado de Excel Intermedio en tu CV', points: 5, done: false },
    { id: 'qw2', label: 'Practicar la pregunta de entrevista "Háblame de ti"', points: 3, done: false },
    { id: 'qw3', label: 'Registrar tu asistencia al webinar de Data Analytics de Interbank', points: 2, done: false },
  ],
}

export const simulationsByJob: Record<string, SimulationRecommendation> = {
  'scotiabank-da': {
    title: 'Entrevista técnica para Junior Data Analyst',
    topicList: 'Python (Pandas), SQL Joins, Visualización de Datos',
    duration: '20 min',
  },
  'bcp-bi': {
    title: 'Entrevista de Business Intelligence',
    topicList: 'Power BI DAX, Modelamiento dimensional, Flujos ETL',
    duration: '25 min',
  },
  'interbank-dt': {
    title: 'Fit cultural y técnico para Data Trainee',
    topicList: 'Preguntas conductuales, Excel avanzado, Consultas SQL',
    duration: '15 min',
  },
}

export const mentorshipsByJob: Record<string, MentorRecommendation> = {
  'scotiabank-da': {
    name: 'Ana Torres',
    position: 'Analista de Datos Senior',
    company: 'Scotiabank',
    achievement: 'Ana consiguió prácticas preprofesionales en Scotiabank y hoy lidera el equipo de Business Analytics.',
    avatarInitial: 'A',
  },
  'bcp-bi': {
    name: 'Diego Flores',
    position: 'Consultor de Business Intelligence',
    company: 'BCP',
    achievement: 'Diego es egresado UTP y tiene más de 3 años asesorando a practicantes BI en el BCP.',
    avatarInitial: 'D',
  },
  'interbank-dt': {
    name: 'Milagros Soto',
    position: 'Data Scientist',
    company: 'Interbank',
    achievement: 'Milagros ingresó como Data Trainee y hoy lidera los modelos de riesgo financiero analítico.',
    avatarInitial: 'M',
  },
}

export const coursesByJob: Record<string, CourseRecommendation[]> = {
  'scotiabank-da': [
    {
      title: 'Programación Avanzada con Python',
      source: 'UTP+Class',
      description: 'Curso matriculado en tu ciclo actual (semana 12).',
      benefit: 'Acredita tu nivel avanzado frente a Scotiabank.',
    },
    {
      title: 'Taller de Querys y Subconsultas Complejas en SQL',
      source: 'UTP+Portal',
      description: 'Taller extracurricular programado por la facultad para este jueves.',
      benefit: 'Cierra tu brecha actual de SQL avanzado rápidamente.',
    },
  ],
  'bcp-bi': [
    {
      title: 'Herramientas de Inteligencia de Negocios',
      source: 'UTP+Class',
      description: 'Curso de tu plan de estudios de Ingeniería (Ciclo pasado, nota: 17).',
      benefit: 'Valida tu capacidad para diseñar Dashboards e ETLs.',
    },
    {
      title: 'Taller de Modelamiento de Data Warehouse',
      source: 'UTP+Portal',
      description: 'Seminario de la bolsa de trabajo disponible en tu portal.',
      benefit: 'Suma puntaje en la evaluación técnica de bases de datos de BCP.',
    },
  ],
  'interbank-dt': [
    {
      title: 'Estadística Aplicada para los Negocios',
      source: 'UTP+Class',
      description: 'Curso aprobado con nota destacada (18).',
      benefit: 'Demuestra bases analíticas sólidas al reclutador.',
    },
    {
      title: 'Webinar: Liderazgo y Transformación Digital Financiera',
      source: 'UTP+Portal',
      description: 'Charla magistral online organizada por Interbank esta semana.',
      benefit: 'Potencia tu fit cultural y entendimiento del negocio bancario.',
    },
  ],
}
