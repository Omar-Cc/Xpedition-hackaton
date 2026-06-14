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
  TaskItem,
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
  {
    id: 'bbva-at',
    company: 'BBVA',
    companyCode: 'BBVA',
    companyColor: 'bg-[#004481]',
    position: 'Practicante de Analítica',
    matchPercent: 68,
    difficulty: 'Media',
    badge: 'Alternativa',
    mainGaps: ['Tableau básico', 'SQL intermedio', 'Análisis de negocio'],
    daysLeft: 8,
    deadlineDate: '21 de Junio',
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
  'bbva-at': [
    { skill: 'Tableau', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Curso rápido de diseño de dashboards' },
    { skill: 'SQL', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Práctica de queries agregados y filtros' },
    { skill: 'Análisis de negocio', currentLevel: 'Básico', requiredLevel: 'Intermedio', action: 'Repasar KPIs comerciales comunes' },
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
  'bbva-at': {
    date: 'HOY',
    category: 'técnica',
    title: 'Aprende filtros y parámetros en Tableau',
    duration: '40 min',
    description:
      'BBVA utiliza Tableau para visualizar reportes de desempeño de sus productos. Dominar filtros te permitirá responder preguntas comerciales ágilmente.',
    checkboxes: [
      { id: 'c1', label: 'Ver tutorial de acciones en Tableau', done: false },
      { id: 'c2', label: 'Crear filtro dinámico de fechas', done: false },
      { id: 'c3', label: 'Publicar vista en Tableau Public', done: false },
    ],
    tomorrowPreview: 'Mañana: Queries complejos con GROUP BY en SQL — 35 min',
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
  'bbva-at': {
    currentMatch: 60,
    projectedMatch: 68,
    targetCompany: 'BBVA',
    deliverables: [
      { label: '1 reporte de Tableau completado', done: false },
      { label: '1 repaso de SQL intermedio', done: true },
      { label: '1 sección de portafolio actualizada', done: false },
      { label: '1 postulación enviada', done: false },
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
  'bbva-at': {
    title: 'Crea un dashboard comercial en Tableau',
    reason: 'Habilidad indispensable para el equipo de analítica comercial en BBVA.',
    impact: '+8% compatibilidad con BBVA',
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
  'bbva-at': [
    { id: 'qw1', label: 'Agregar keywords "Tableau" y "KPIs" a tu perfil', points: 3, done: false },
    { id: 'qw2', label: 'Resolver test básico de SQL en la plataforma', points: 3, done: false },
    { id: 'qw3', label: 'Revisar reporte financiero público de BBVA', points: 2, done: false },
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
  'bbva-at': {
    title: 'Analítica Comercial y Negocios en Banca',
    topicList: 'Tableau Dashboards, SQL básico, KPIs comerciales',
    duration: '20 min',
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
  'bbva-at': {
    name: 'Carlos Mendoza',
    position: 'Analista de Negocio Senior',
    company: 'BBVA',
    achievement: 'Carlos es egresado UTP y lidera la transformación de reportería comercial en BBVA.',
    avatarInitial: 'C',
  },
}

export const coursesByJob: Record<string, CourseRecommendation[]> = {
  'scotiabank-da': [
    {
      title: 'Programación Avanzada con Python',
      source: 'UTP+Class',
      description: 'Curso matriculado en tu ciclo actual (semana 12).',
      benefit: 'Acredita tu nivel avanzado frente a Scotiabank.',
      reinforces: 'Python avanzado',
      impact: '+4% match',
      actionLabel: 'Añadir al plan',
    },
    {
      title: 'Taller de Querys y Subconsultas Complejas en SQL',
      source: 'UTP+Portal',
      description: 'Taller extracurricular programado por la facultad para este jueves.',
      benefit: 'Cierra tu brecha actual de SQL avanzado rápidamente.',
      reinforces: 'SQL avanzado',
      impact: '+3% match',
      actionLabel: 'Reservar / Añadir al plan',
    },
  ],
  'bcp-bi': [
    {
      title: 'Herramientas de Inteligencia de Negocios',
      source: 'UTP+Class',
      description: 'Curso de tu plan de estudios de Ingeniería (Ciclo pasado, nota: 17).',
      benefit: 'Valida tu capacidad para diseñar Dashboards e ETLs.',
      reinforces: 'Power BI avanzado',
      impact: '+5% match',
      actionLabel: 'Añadir al plan',
    },
    {
      title: 'Taller de Modelamiento de Data Warehouse',
      source: 'UTP+Portal',
      description: 'Seminario de la bolsa de trabajo disponible en tu portal.',
      benefit: 'Suma puntaje en la evaluación técnica de bases de datos de BCP.',
      reinforces: 'Data Warehouse',
      impact: '+4% match',
      actionLabel: 'Reservar / Añadir al plan',
    },
  ],
  'interbank-dt': [
    {
      title: 'Estadística Aplicada para los Negocios',
      source: 'UTP+Class',
      description: 'Curso aprobado con nota destacada (18).',
      benefit: 'Demuestra bases analíticas sólidas al reclutador.',
      reinforces: 'Excel avanzado',
      impact: '+4% match',
      actionLabel: 'Añadir al plan',
    },
    {
      title: 'Webinar: Liderazgo y Transformación Digital Financiera',
      source: 'UTP+Portal',
      description: 'Charla magistral online organizada por Interbank esta semana.',
      benefit: 'Potencia tu fit cultural y entendimiento del negocio bancario.',
      reinforces: 'SQL intermedio',
      impact: '+3% match',
      actionLabel: 'Reservar / Añadir al plan',
    },
  ],
  'bbva-at': [
    {
      title: 'Visualización de Información Financiera',
      source: 'UTP+Class',
      description: 'Curso electivo de tu malla curricular (Ciclo actual).',
      benefit: 'Acredita tu manejo de herramientas de visualización como Tableau.',
      reinforces: 'Tableau básico',
      impact: '+4% match',
      actionLabel: 'Añadir al plan',
    },
  ],
}

export const initialTasksByJob: Record<string, TaskItem[]> = {
  'scotiabank-da': [
    {
      id: 'sb-t1',
      title: 'Configurar entorno de Python e instalar Anaconda',
      dayNumber: 1,
      status: 'done',
      category: 'técnica',
      duration: '30 min',
      impact: '+3% match',
      description: 'Prepara tu entorno local para poder ejecutar scripts de análisis de datos de forma autónoma.'
    },
    {
      id: 'sb-t2',
      title: 'Optimizar perfil de LinkedIn con keywords de Datos',
      dayNumber: 3,
      status: 'done',
      category: 'CV',
      duration: '20 min',
      impact: '+2% match',
      description: 'Destaca tus habilidades en Python, SQL y visualización de datos para que los reclutadores de Scotiabank te encuentren fácilmente.'
    },
    {
      id: 'sb-t3',
      title: 'Conceptos básicos de SQL SELECT y WHERE',
      dayNumber: 5,
      status: 'done',
      category: 'técnica',
      duration: '40 min',
      impact: '+4% match',
      description: 'Domina los filtros y selecciones de campos esenciales en bases de datos relacionales, clave para la evaluación técnica.'
    },
    {
      id: 'sb-t4',
      title: 'Revisión de CV con la herramienta UTP',
      dayNumber: 6,
      status: 'todo',
      isOverdue: true,
      category: 'CV',
      duration: '30 min',
      impact: '+5% match',
      description: 'Sube tu CV al validador automático de la UTP para identificar brechas de redacción e impacto profesional.'
    },
    {
      id: 'sb-t5',
      title: 'Practica manipulación de datos con pandas',
      dayNumber: 7,
      status: 'todo',
      category: 'técnica',
      duration: '45 min',
      impact: '+8% match',
      description: 'Esta tarea fue seleccionada porque las ofertas de Junior Data Analyst suelen requerir limpieza, transformación y análisis de datos con Python.',
      checkboxes: [
        { id: 'c1', label: 'Completar ejercicios de pandas 1–3', done: false },
        { id: 'c2', label: 'Ver tutorial de manipulación de datos', done: false },
        { id: 'c3', label: 'Resolver mini caso práctico', done: false },
      ]
    },
    {
      id: 'sb-t6',
      title: 'VLOOKUP & tablas dinámicas en Excel',
      dayNumber: 8,
      status: 'todo',
      category: 'técnica',
      duration: '40 min',
      impact: '+4% match',
      description: 'Aprende a cruzar datasets y resumir métricas comerciales con tablas dinámicas de forma rápida.'
    },
    {
      id: 'sb-t7',
      title: 'Simulacro de entrevista técnica',
      dayNumber: 10,
      status: 'todo',
      isBloqueada: true,
      bloqueoInfo: 'Requiere completar la simulación de entrevista en el módulo UTP primero',
      category: 'evento',
      duration: '50 min',
      impact: '+6% match',
      description: 'Pon a prueba tus conocimientos en vivo respondiendo preguntas conceptuales de Python y SQL bajo presión de tiempo.'
    },
    {
      id: 'sb-t8',
      title: 'Mentoría con Ana Torres',
      dayNumber: 12,
      status: 'todo',
      category: 'evento',
      duration: '45 min',
      impact: '+5% match',
      description: 'Reúnete con Ana, graduada de UTP que trabaja en Scotiabank, para recibir feedback sobre tu preparación y perfil.'
    },
    {
      id: 'sb-t9',
      title: 'Postulación a la oferta de Scotiabank',
      dayNumber: 15,
      status: 'todo',
      category: 'evento',
      duration: '30 min',
      impact: '+10% match',
      description: 'Envía tu perfil optimizado y portafolio técnico directamente a la postulación interna en Scotiabank.'
    },
    {
      id: 'sb-t10',
      title: 'Entrevista de práctica final',
      dayNumber: 22,
      status: 'todo',
      category: 'evento',
      duration: '45 min',
      impact: '+5% match',
      description: 'Sesión final con simulador IA para pulir tu expresión oral e impacto antes de la llamada oficial.'
    }
  ],
  'bcp-bi': [
    {
      id: 'bcp-t1',
      title: 'Fundamentos de bases de datos relacionales',
      dayNumber: 1,
      status: 'done',
      category: 'técnica',
      duration: '35 min',
      impact: '+3% match',
      description: 'Entiende cómo se organizan las tablas, llaves primarias y foráneas en los sistemas del BCP.'
    },
    {
      id: 'bcp-t2',
      title: 'Alinear experiencia con Power BI en CV',
      dayNumber: 3,
      status: 'done',
      category: 'CV',
      duration: '25 min',
      impact: '+4% match',
      description: 'Refleja tus proyectos e integraciones usando Power BI y modelado DAX dentro de tu currículum formativo.'
    },
    {
      id: 'bcp-t3',
      title: 'Práctica de SQL con Window Functions',
      dayNumber: 5,
      status: 'done',
      category: 'técnica',
      duration: '50 min',
      impact: '+5% match',
      description: 'Domina funciones analíticas como ROW_NUMBER, RANK y PARTITION BY, muy evaluadas en pruebas del BCP.'
    },
    {
      id: 'bcp-t4',
      title: 'Ver video sobre Storytelling Financiero',
      dayNumber: 6,
      status: 'todo',
      isOverdue: true,
      category: 'repaso',
      duration: '15 min',
      impact: '+3% match',
      description: 'Aprende a narrar los datos para que los gerentes de BI puedan tomar decisiones rápidas basadas en tus reportes.'
    },
    {
      id: 'bcp-t5',
      title: 'Crea tu primer dashboard en Power BI',
      dayNumber: 7,
      status: 'todo',
      category: 'técnica',
      duration: '60 min',
      impact: '+9% match',
      description: 'BCP busca practicantes que dominen Power BI para crear reportes ejecutivos. Esta tarea te acerca a ese nivel.',
      checkboxes: [
        { id: 'c1', label: 'Importar dataset de ejemplo', done: false },
        { id: 'c2', label: 'Crear 3 visualizaciones básicas', done: false },
        { id: 'c3', label: 'Publicar dashboard en Power BI Service', done: false }
      ]
    },
    {
      id: 'bcp-t6',
      title: 'Modelado de datos con DAX',
      dayNumber: 8,
      status: 'todo',
      category: 'técnica',
      duration: '50 min',
      impact: '+5% match',
      description: 'Escribe medidas y columnas calculadas en Power BI usando expresiones de DAX básicas.'
    },
    {
      id: 'bcp-t7',
      title: 'Simulación de entrevista de Business Intelligence',
      dayNumber: 10,
      status: 'todo',
      isBloqueada: true,
      bloqueoInfo: 'Bloqueada hasta completar el módulo de simulador técnico de BI',
      category: 'evento',
      duration: '45 min',
      impact: '+8% match',
      description: 'Práctica de fit y habilidades técnicas de análisis y presentación de tableros comerciales.'
    },
    {
      id: 'bcp-t8',
      title: 'Mentoría con Diego Flores',
      dayNumber: 12,
      status: 'todo',
      category: 'evento',
      duration: '50 min',
      impact: '+5% match',
      description: 'Conversación directa con Diego Flores, analista en BCP, para revisar tu dashboard y recibir sugerencias.'
    },
    {
      id: 'bcp-t9',
      title: 'Postulación en el Portal BCP',
      dayNumber: 15,
      status: 'todo',
      category: 'evento',
      duration: '30 min',
      impact: '+10% match',
      description: 'Envía formalmente tu postulación adjuntando tus proyectos destacados en Power BI.'
    }
  ],
  'interbank-dt': [
    {
      id: 'ib-t1',
      title: 'Instalación de SQL Server y conceptos básicos',
      dayNumber: 1,
      status: 'done',
      category: 'técnica',
      duration: '30 min',
      impact: '+3% match',
      description: 'Instala y pon a punto tu base de datos de pruebas local para practicar queries.'
    },
    {
      id: 'ib-t2',
      title: 'Añadir certificado de Excel Intermedio a CV',
      dayNumber: 3,
      status: 'done',
      category: 'CV',
      duration: '20 min',
      impact: '+5% match',
      description: 'Registra y adjunta tu certificación oficial en el CV UTP para validar tu nivel analítico inicial.'
    },
    {
      id: 'ib-t3',
      title: 'Repasar consultas SQL básicas (SELECT, WHERE, ORDER BY)',
      dayNumber: 5,
      status: 'done',
      category: 'técnica',
      duration: '40 min',
      impact: '+4% match',
      description: 'Consolida la selección y ordenación de filas en tablas con múltiples criterios de filtro.'
    },
    {
      id: 'ib-t4',
      title: 'Practicar la pregunta de entrevista "Háblame de ti"',
      dayNumber: 6,
      status: 'todo',
      isOverdue: true,
      category: 'repaso',
      duration: '15 min',
      impact: '+3% match',
      description: 'Prepara tu pitch personal de 2 minutos destacando tu formación académica en UTP y motivación por Interbank.'
    },
    {
      id: 'ib-t5',
      title: 'Domina tablas dinámicas en Excel',
      dayNumber: 7,
      status: 'todo',
      category: 'técnica',
      duration: '35 min',
      impact: '+8% match',
      description: 'Interbank valora el dominio de Excel para análisis rápido de datos. Las tablas dinámicas son una habilidad clave.',
      checkboxes: [
        { id: 'c1', label: 'Crear tabla dinámica con dataset ventas', done: false },
        { id: 'c2', label: 'Agregar campos calculados', done: false },
        { id: 'c3', label: 'Exportar reporte resumen', done: false }
      ]
    },
    {
      id: 'ib-t6',
      title: 'Fórmulas avanzadas BUSCARV e INDICE',
      dayNumber: 8,
      status: 'todo',
      category: 'técnica',
      duration: '30 min',
      impact: '+4% match',
      description: 'Cruza datos entre hojas distintas utilizando coincidencia exacta y búsqueda bidimensional.'
    },
    {
      id: 'ib-t7',
      title: 'Simulación de entrevista técnica',
      dayNumber: 10,
      status: 'todo',
      isBloqueada: true,
      bloqueoInfo: 'Requiere completar el test de Excel avanzado primero',
      category: 'evento',
      duration: '30 min',
      impact: '+7% match',
      description: 'Resuelve preguntas de lógica y cruces de información comunes en el ingreso a Interbank.'
    },
    {
      id: 'ib-t8',
      title: 'Mentoría con Milagros Soto',
      dayNumber: 12,
      status: 'todo',
      category: 'evento',
      duration: '45 min',
      impact: '+5% match',
      description: 'Reúnete con Milagros para conocer la cultura de Interbank y qué esperan de un Data Trainee.'
    },
    {
      id: 'ib-t9',
      title: 'Postulación a Data Trainee en Interbank',
      dayNumber: 15,
      status: 'todo',
      category: 'evento',
      duration: '30 min',
      impact: '+10% match',
      description: 'Completa la postulación formal y sube tus avances del plan como portafolio.'
    }
  ],
  'bbva-at': [
    {
      id: 'bbva-t1',
      title: 'Conceptos básicos de Tableau e instalación',
      dayNumber: 1,
      status: 'done',
      category: 'técnica',
      duration: '30 min',
      impact: '+3% match',
      description: 'Prepara tu entorno descargando Tableau Public para poder crear dashboards locales.'
    },
    {
      id: 'bbva-t2',
      title: 'Agregar keywords "Tableau" y "KPIs" a perfil',
      dayNumber: 3,
      status: 'done',
      category: 'CV',
      duration: '20 min',
      impact: '+3% match',
      description: 'Actualiza tu perfil y CV para reflejar tus competencias en reportería comercial bancaria.'
    },
    {
      id: 'bbva-t3',
      title: 'Resolver test básico de SQL en la plataforma',
      dayNumber: 5,
      status: 'done',
      category: 'técnica',
      duration: '30 min',
      impact: '+3% match',
      description: 'Pon a prueba tus consultas de agregación y filtros antes del filtro oficial.'
    },
    {
      id: 'bbva-t4',
      title: 'Revisar reporte financiero público de BBVA',
      dayNumber: 6,
      status: 'todo',
      isOverdue: true,
      category: 'repaso',
      duration: '20 min',
      impact: '+2% match',
      description: 'Familiarízate con los términos y variables de rentabilidad que maneja el banco.'
    },
    {
      id: 'bbva-t5',
      title: 'Aprende filtros y parámetros en Tableau',
      dayNumber: 7,
      status: 'todo',
      category: 'técnica',
      duration: '40 min',
      impact: '+8% match',
      description: 'BBVA utiliza Tableau para visualizar reportes de desempeño de sus productos. Dominar filtros te permitirá responder preguntas comerciales rápidamente.',
      checkboxes: [
        { id: 'c1', label: 'Ver tutorial de acciones en Tableau', done: false },
        { id: 'c2', label: 'Crear filtro dinámico de fechas', done: false },
        { id: 'c3', label: 'Publicar vista en Tableau Public', done: false }
      ]
    },
    {
      id: 'bbva-t6',
      title: 'Queries complejos con GROUP BY en SQL',
      dayNumber: 8,
      status: 'todo',
      category: 'técnica',
      duration: '35 min',
      impact: '+4% match',
      description: 'Agrupa datos por sucursales y productos bancarios usando condiciones HAVING y ordenaciones avanzadas.'
    },
    {
      id: 'bbva-t7',
      title: 'Simulación técnica Analítica Comercial',
      dayNumber: 10,
      status: 'todo',
      isBloqueada: true,
      bloqueoInfo: 'Bloqueada hasta resolver el test práctico de Tableau',
      category: 'evento',
      duration: '40 min',
      impact: '+8% match',
      description: 'Práctica de análisis de rentabilidad y presentación interactiva de métricas comerciales.'
    },
    {
      id: 'bbva-t8',
      title: 'Mentoría con Carlos Mendoza',
      dayNumber: 12,
      status: 'todo',
      category: 'evento',
      duration: '40 min',
      impact: '+5% match',
      description: 'Conversación directa con Carlos para pulir tu presentación del caso técnico.'
    },
    {
      id: 'bbva-t9',
      title: 'Postulación Practicante de Analítica BBVA',
      dayNumber: 15,
      status: 'todo',
      category: 'evento',
      duration: '30 min',
      impact: '+10% match',
      description: 'Envía tu CV optimizado directamente para la vacante en el área de analítica comercial.'
    }
  ]
}

