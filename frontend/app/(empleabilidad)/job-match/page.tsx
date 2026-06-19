"use client"

import { useEffect, useMemo, useState, useRef } from 'react'
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import { useJobMatch, type JobItem } from '@/src/contexts/JobMatchContext'
import {
  Bookmark,
  Cake,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  DollarSign,
  Filter,
  GraduationCap,

  Info,
  MapPin,
  Plus,
  Briefcase,
  Target,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { useFakeFetch } from './_hooks/useFakeFetch'
import JobOfferSkeleton from './_components/JobOfferSkeleton'

const TieIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 2H9l-1.5 5 4.5 3.5L16.5 7z" />
    <path d="M10 8.5 6.5 18 12 23l5.5-5-3.5-9.5Z" />
  </svg>
)

type AppliedFilters = {
  query: string
  address: string
  modes: string[]
  salaryMin: string
  salaryMax: string
  levels: string[]
  ageMin: string
  ageMax: string
  sources: string[]
}

const workModes = ['Full Time', 'Part Time', 'Remoto', 'Híbrido', 'Presencial']
const levels = ['Practicante', 'Pasantía', 'Junior', 'Semi Senior', 'Senior']
const jobCatalog: JobItem[] = [
  {
    id: '1',
    initial: 'SCO',
    avatarColor: 'bg-red-600',
    matchPercent: 82,
    title: 'Junior Data Analyst',
    company: 'Scotiabank',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Remoto',
    salaryMin: 1800,
    salaryMax: 2600,
    level: 'Junior',
    ageMin: 18,
    ageMax: 28,
    tags: ['Python', 'SQL', 'Data'],
    highlight: 'Compatible con tu horario',
    requirement: 'Desde 8vo semestre',
    description: 'Únete a nuestro equipo de analítica para transformar datos financieros en decisiones estratégicas de impacto.',
    functions: ['Análisis exploratorio de bases de datos relacionales.', 'Generación de dashboards gerenciales.', 'Automatización de reportes diarios.'],
    skills: ['Python avanzado', 'SQL avanzado', 'Storytelling'],
    matchFeedback: 'Tienes un gran fit porque dominas la lógica de programación y entiendes el ecosistema de datos.',
    matchMissing: 'Aumentarías al 100% mejorando tus habilidades avanzadas de Python y SQL.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Faltan 12 días',
  },
  {
    id: '2',
    initial: 'BCP',
    avatarColor: 'bg-blue-700',
    matchPercent: 76,
    title: 'Practicante BI',
    company: 'BCP',
    status: 'Urgente',
    statusColor: 'warning',
    location: 'La Molina, Lima',
    mode: 'Híbrido',
    salaryMin: 1200,
    salaryMax: 1500,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['Power BI', 'ETL', 'BI'],
    highlight: 'Líder en banca peruana',
    requirement: 'Estudiantes de 7mo a 9no ciclo',
    description: 'Apoya en el modelado de datos y generación de reportes en Power BI para el negocio comercial.',
    functions: ['Apoyo en el desarrollo de tableros de control.', 'Consultas y mantenimiento de bases de datos SQL.', 'Análisis de tendencias.'],
    skills: ['Power BI avanzado', 'ETL básico', 'Data Warehouse'],
    matchFeedback: 'Tu interés por la analítica de negocios y conocimientos base de SQL son un buen inicio.',
    matchMissing: 'Necesitas profundizar urgentemente en herramientas de visualización como Power BI.',
    source: 'Bumeran',
    contractType: 'Prácticas',
    postedDate: 'Faltan 4 días',
  },
  {
    id: '3',
    initial: 'IBK',
    avatarColor: 'bg-emerald-600',
    matchPercent: 71,
    title: 'Data Trainee',
    company: 'Interbank',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 2000,
    salaryMax: 2500,
    level: 'Practicante',
    ageMin: 20,
    ageMax: 30,
    tags: ['Excel', 'SQL', 'Data'],
    highlight: 'Oportunidad de crecimiento',
    requirement: 'Recién egresados',
    description: 'Buscamos talento joven para nuestro programa de trainees enfocado en el área de datos e innovación.',
    functions: ['Limpieza y estructuración de bases de datos de clientes.', 'Elaboración de macros y automatizaciones en Excel.', 'Apoyo a científicos de datos.'],
    skills: ['Excel avanzado', 'SQL intermedio'],
    matchFeedback: 'Manejando las herramientas básicas de analítica podrías destacar rápidamente.',
    matchMissing: 'Aún te falta consolidar el nivel avanzado de hojas de cálculo y queries intermedios.',
    source: 'Computrabajo',
    contractType: 'Tiempo Completo',
    postedDate: 'Faltan 19 días',
  },
  {
    id: '4',
    initial: 'BBVA',
    avatarColor: 'bg-blue-900',
    matchPercent: 68,
    title: 'Practicante de Analytics',
    company: 'BBVA',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 1100,
    salaryMax: 1400,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 26,
    tags: ['Tableau', 'SQL', 'Analytics'],
    highlight: 'Innovación constante',
    requirement: 'Conocimientos de estadística',
    description: 'Participa en el análisis de campañas de marketing y comportamiento del consumidor mediante datos.',
    functions: ['Construcción de dashboards de seguimiento en Tableau.', 'Levantamiento de requerimientos de negocio.', 'Extracción de datos en SQL.'],
    skills: ['Tableau básico', 'SQL intermedio', 'Análisis de negocio'],
    matchFeedback: 'Tu capacidad analítica será fundamental para este puesto orientado al negocio.',
    matchMissing: 'Aún te falta aprender Tableau básico y conceptos de inteligencia comercial.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Prácticas',
    postedDate: 'Faltan 8 días',
  },
  {
    id: '5',
    initial: 'I',
    avatarColor: 'bg-slate-800',
    matchPercent: 84,
    title: 'Junior Backend Developer',
    company: 'IBM Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'La Molina, Lima',
    mode: 'Presencial',
    salaryMin: 3000,
    salaryMax: 4200,
    level: 'Junior',
    ageMin: 21,
    ageMax: 32,
    tags: ['Node.js', 'Express', 'MongoDB'],
    highlight: 'Tecnología de vanguardia',
    requirement: '1 año de experiencia',
    description: 'Únete a nuestro equipo para diseñar e implementar la lógica de servidor de nuestras soluciones empresariales Cloud.',
    functions: ['Diseño y optimización de APIs REST en Node.js.', 'Modelado de bases de datos relacionales y no relacionales.', 'Implementación de medidas de seguridad en el backend.'],
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    matchFeedback: 'Tu lógica de bases de datos y desarrollo backend con Node.js es robusta.',
    matchMissing: 'Aprender Docker te ayudará a estandarizar mejor tus despliegues.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 4 días',
  },
  {
    id: '6',
    initial: 'B',
    avatarColor: 'bg-indigo-600',
    matchPercent: 77,
    title: 'UX/UI Designer',
    company: 'BBVA Perú',
    status: 'Urgente',
    statusColor: 'warning',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 2800,
    salaryMax: 4000,
    level: 'Junior',
    ageMin: 20,
    ageMax: 30,
    tags: ['Figma', 'Prototipado', 'UX'],
    highlight: 'Foco en accesibilidad',
    requirement: 'Portafolio indispensable',
    description: 'Diseña experiencias intuitivas y atractivas para millones de clientes bancarios móviles en el país.',
    functions: ['Creación de flujos de usuario y wireframes interactivos.', 'Diseño de interfaces basadas en el sistema de diseño global.', 'Ejecución de pruebas de usabilidad rápidas.'],
    skills: ['Figma', 'UX Research', 'UI Design', 'Design Systems'],
    matchFeedback: 'Tienes un portafolio sólido y manejas Figma a nivel intermedio-avanzado.',
    matchMissing: 'Profundizar en investigación cualitativa (UX Research) mejoraría tu perfil.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '7',
    initial: 'I',
    avatarColor: 'bg-amber-600',
    matchPercent: 74,
    title: 'Practicante de Data Analytics',
    company: 'Interbank',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 1200,
    salaryMax: 1500,
    level: 'Practicante',
    ageMin: 19,
    ageMax: 26,
    tags: ['Excel', 'SQL', 'Power BI'],
    highlight: 'Flexibilidad horaria',
    requirement: 'Excel Avanzado',
    description: 'Apoya en la recopilación y procesamiento de datos comerciales para generar valor y reportes analíticos.',
    functions: ['Limpieza y estructuración de bases de datos comerciales.', 'Actualización de tableros de control en Power BI.', 'Generación de reportes periódicos en Excel.'],
    skills: ['Excel', 'SQL', 'Power BI', 'ETL'],
    matchFeedback: 'Manejas Excel de manera avanzada y entiendes las bases del análisis de datos.',
    matchMissing: 'Aprender sobre almacenamiento y queries complejas en SQL te dará ventaja.',
    source: 'Computrabajo',
    contractType: 'Prácticas',
    postedDate: 'Hace 5 días',
  },
  {
    id: '8',
    initial: 'G',
    avatarColor: 'bg-teal-600',
    matchPercent: 82,
    title: 'Junior Software Developer',
    company: 'Globant',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Remoto',
    salaryMin: 2800,
    salaryMax: 3800,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['Python', 'React', 'Git'],
    highlight: 'Línea de carrera global',
    requirement: 'Graduados de Sistemas o afines',
    description: 'Desarrolla código limpio y participa en proyectos de escala internacional en un ecosistema ágil y colaborativo.',
    functions: ['Desarrollo de módulos utilizando Python o Javascript.', 'Integración y control de versiones a través de Git.', 'Participar en revisiones de código en equipo.'],
    skills: ['Python', 'React', 'Git', 'Agile'],
    matchFeedback: 'Buen dominio de algoritmia y entendimiento claro del control de versiones.',
    matchMissing: 'Te vendría bien conocer de arquitectura cloud (AWS o GCP).',
    source: 'UTP Bolsa Laboral',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 1 semana',
  },
  {
    id: '9',
    initial: 'A',
    avatarColor: 'bg-emerald-700',
    matchPercent: 80,
    title: 'Practicante de Marketing Digital',
    company: 'Alicorp',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Callao, Lima',
    mode: 'Híbrido',
    salaryMin: 1100,
    salaryMax: 1300,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['SEO', 'Copywriting', 'Google Ads'],
    highlight: 'Consumo masivo líder',
    requirement: 'Inglés intermedio',
    description: 'Apoya en la implementación y seguimiento de campañas digitales para nuestras principales marcas.',
    functions: ['Redacción de copies para redes sociales y blogs.', 'Apoyo en el monitoreo de métricas SEO en Google Analytics.', 'Coordinación con agencias de diseño.'],
    skills: ['SEO', 'Redes Sociales', 'Google Analytics', 'Canva'],
    matchFeedback: 'Excelente redacción y comprensión de las tendencias digitales del mercado.',
    matchMissing: 'Tener una certificación de Google Ads te haría destacar aún más.',
    source: 'LinkedIn',
    contractType: 'Prácticas',
    postedDate: 'Hace 3 días',
  },
  {
    id: '10',
    initial: 'E',
    avatarColor: 'bg-yellow-600',
    matchPercent: 77,
    title: 'Business Analyst',
    company: 'EY Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 3200,
    salaryMax: 4500,
    level: 'Junior',
    ageMin: 22,
    ageMax: 32,
    tags: ['Procesos', 'BPMN', 'Excel'],
    highlight: 'Prestigio internacional',
    requirement: 'Egresados de Ing. Industrial o Sistemas',
    description: 'Analiza, documenta y optimiza procesos de negocio de nuestros principales clientes corporativos.',
    functions: ['Modelado de procesos en Bizagi (BPMN).', 'Levantamiento de requerimientos funcionales con usuarios clave.', 'Análisis financiero y operativo básico.'],
    skills: ['BPMN', 'Bizagi', 'Excel Avanzado', 'Análisis de datos'],
    matchFeedback: 'Gran capacidad de análisis y excelente comunicación interpersonal.',
    matchMissing: 'Conocer sobre metodologías ágiles a fondo sumaría mucho valor.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 6 días',
  },
  {
    id: '11',
    initial: 'T',
    avatarColor: 'bg-violet-700',
    matchPercent: 79,
    title: 'QA Tester',
    company: 'Tata Consultancy Services',
    status: 'Urgente',
    statusColor: 'warning',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 2400,
    salaryMax: 3300,
    level: 'Junior',
    ageMin: 19,
    ageMax: 29,
    tags: ['Selenium', 'Jira', 'QA Manual'],
    highlight: 'Proyecto de larga duración',
    requirement: 'Fundamentos de testing',
    description: 'Asegura la calidad de nuestras aplicaciones móviles y web ejecutando casos de prueba y reportando incidentes.',
    functions: ['Diseño y ejecución de casos de prueba manuales y automatizados.', 'Registro y seguimiento de bugs en Jira.', 'Elaboración de informes de conformidad de software.'],
    skills: ['Selenium', 'Jira', 'SQL Básico', 'ISTQB'],
    matchFeedback: 'Muy detallista y con buena lógica para encontrar casos de borde erróneos.',
    matchMissing: 'Aprender a automatizar APIs con Postman aumentaría tu potencial.',
    source: 'Computrabajo',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 1 día',
  },
  {
    id: '12',
    initial: 'M',
    avatarColor: 'bg-neutral-800',
    matchPercent: 75,
    title: 'Junior Data Scientist',
    company: 'McKinsey & Company',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Híbrido',
    salaryMin: 4000,
    salaryMax: 5500,
    level: 'Junior',
    ageMin: 22,
    ageMax: 32,
    tags: ['Python', 'Machine Learning', 'SQL'],
    highlight: 'Consultoría estratégica top',
    requirement: 'Conocimiento intermedio de Python',
    description: 'Desarrolla modelos predictivos estadísticos para resolver problemáticas de negocio complejas.',
    functions: ['Entrenamiento e implementación de algoritmos supervisados.', 'Extracción y procesamiento de datos a gran escala.', 'Presentación de resultados a stakeholders.'],
    skills: ['Python', 'SQL', 'Scikit-learn', 'Pandas'],
    matchFeedback: 'Excelente base matemática y sólido conocimiento en machine learning.',
    matchMissing: 'Mejorar el uso de Spark/Hadoop para big data aumentaría tu fit.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '13',
    initial: 'R',
    avatarColor: 'bg-red-600',
    matchPercent: 85,
    title: 'Product Analyst',
    company: 'Rappi',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 3000,
    salaryMax: 4300,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['Product Management', 'SQL', 'Amplitude'],
    highlight: 'Crecimiento acelerado',
    requirement: 'Orientado a datos',
    description: 'Monitorea métricas de uso y comportamiento para proponer mejoras en la UX del aplicativo Rappi.',
    functions: ['Análisis de embudos de conversión (funnels) con Amplitude.', 'Generación de queries SQL para entender retención de usuarios.', 'Coordinación directa con ingenieros de producto.'],
    skills: ['SQL', 'Amplitude', 'Analytics', 'A/B Testing'],
    matchFeedback: 'Muy orientado al producto y con destreza analítica sobresaliente.',
    matchMissing: 'Experiencia previa con prototipado en Figma te ayudaría a iterar.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 4 días',
  },
  {
    id: '14',
    initial: 'F',
    avatarColor: 'bg-orange-600',
    matchPercent: 79,
    title: 'DevOps Engineer',
    company: 'Falabella Tecnología',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 3800,
    salaryMax: 5000,
    level: 'Junior',
    ageMin: 21,
    ageMax: 31,
    tags: ['CI/CD', 'AWS', 'Docker'],
    highlight: 'Cultura devops moderna',
    requirement: 'Conocimientos de Linux',
    description: 'Automatiza pipelines de despliegue y gestiona la infraestructura en la nube para garantizar alta disponibilidad.',
    functions: ['Mantenimiento de pipelines en Jenkins o GitHub Actions.', 'Orquestación básica con Docker e infraestructura AWS.', 'Monitoreo de logs y estabilidad de servidores.'],
    skills: ['AWS', 'Docker', 'Jenkins', 'Bash Scripting'],
    matchFeedback: 'Excelente base de scripting en Bash and conocimientos sólidos en AWS.',
    matchMissing: 'Saber sobre Kubernetes te impulsaría a un nivel superior.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 3 días',
  },
  {
    id: '15',
    initial: 'M',
    avatarColor: 'bg-blue-800',
    matchPercent: 73,
    title: 'Machine Learning Engineer',
    company: 'Microsoft Perú',
    status: 'Urgente',
    statusColor: 'warning',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 4500,
    salaryMax: 6000,
    level: 'Junior',
    ageMin: 22,
    ageMax: 34,
    tags: ['TensorFlow', 'PyTorch', 'Python'],
    highlight: 'IA a nivel global',
    requirement: 'Proyectos demostrables de ML',
    description: 'Diseña, construye y pon en producción modelos de aprendizaje profundo e inteligencia artificial avanzada.',
    functions: ['Desarrollo e implementación de arquitecturas de ML en Azure.', 'Monitoreo y ajuste de hiperparámetros en modelos de Deep Learning.', 'Optimización de inferencia de modelos.'],
    skills: ['Python', 'TensorFlow', 'Azure', 'MLOps'],
    matchFeedback: 'Tus proyectos personales demuestran un gran dominio de redes neuronales.',
    matchMissing: 'Un mayor dominio en contenedores Docker y MLOps elevaría tu fit.',
    source: 'Computrabajo',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 5 días',
  },
  {
    id: '16',
    initial: 'T',
    avatarColor: 'bg-teal-700',
    matchPercent: 79,
    title: 'Soporte Técnico',
    company: 'Teleperformance',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Santiago de Surco, Lima',
    mode: 'Presencial',
    salaryMin: 1400,
    salaryMax: 1800,
    level: 'Junior',
    ageMin: 18,
    ageMax: 28,
    tags: ['Redes', 'Windows Server', 'Helpdesk'],
    highlight: 'Contratación inmediata',
    requirement: 'Estudios técnicos en computación',
    description: 'Brinda soporte técnico de hardware y software a los usuarios de la red corporativa de la compañía.',
    functions: ['Configuración y mantenimiento de computadoras de oficina.', 'Resolución de problemas de red local y VPN.', 'Atención y registro de tickets en sistema interno.'],
    skills: ['Redes', 'Windows', 'Hardware', 'Servicio al Cliente'],
    matchFeedback: 'Tienes gran disposición de servicio y buena base técnica de hardware.',
    matchMissing: 'Aprender sobre Linux a nivel de administrador enriquecería tu perfil.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 1 semana',
  },
  {
    id: '17',
    initial: 'R',
    avatarColor: 'bg-purple-600',
    matchPercent: 83,
    title: 'Analista Funcional',
    company: 'Rimac Seguros',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 3000,
    salaryMax: 4000,
    level: 'Junior',
    ageMin: 22,
    ageMax: 31,
    tags: ['Requerimientos', 'Scrum', 'UML'],
    highlight: 'Sector seguros sólido',
    requirement: 'Habilidades de comunicación',
    description: 'Traduce los requerimientos de las áreas de negocio a especificaciones técnicas legibles para desarrollo.',
    functions: ['Elaboración de historias de usuario detalladas.', 'Modelado de diagramas de casos de uso UML.', 'Coordinación de pruebas de aceptación de usuario (UAT).'],
    skills: ['UML', 'User Stories', 'Scrum', 'SQL Básico'],
    matchFeedback: 'Tu capacidad de documentación es muy estructurada y limpia.',
    matchMissing: 'Aumentarías tu match entendiendo sobre arquitectura básica de APIs.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '18',
    initial: 'M',
    avatarColor: 'bg-rose-500',
    matchPercent: 74,
    title: 'Community Manager',
    company: 'McCann Lima',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Presencial',
    salaryMin: 1200,
    salaryMax: 1600,
    level: 'Junior',
    ageMin: 18,
    ageMax: 26,
    tags: ['Copywriting', 'Redes Sociales', 'Analytics'],
    highlight: 'Agencia de primer nivel',
    requirement: 'Creatividad orientada a marca',
    description: 'Gestiona la presencia digital e interactúa con las audiencias de importantes marcas de consumo.',
    functions: ['Creación y publicación de contenidos semanales.', 'Respuesta inmediata a dudas y comentarios de usuarios.', 'Monitoreo de engagement e informes mensuales.'],
    skills: ['Social Media', 'Copywriting', 'Metrics', 'Diseño Básico'],
    matchFeedback: 'Gran empatía en comunicación escrita y excelente ortografía.',
    matchMissing: 'Tener una certificación de video básica con Premiere sumará puntos.',
    source: 'Bumeran',
    contractType: 'Tiempo Parcial',
    postedDate: 'Hace 4 días',
  },
  {
    id: '19',
    initial: 'C',
    avatarColor: 'bg-sky-600',
    matchPercent: 74,
    title: 'Diseñador Gráfico',
    company: 'Circus Grey',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Barranco, Lima',
    mode: 'Híbrido',
    salaryMin: 1500,
    salaryMax: 2000,
    level: 'Junior',
    ageMin: 19,
    ageMax: 28,
    tags: ['Photoshop', 'Illustrator', 'Indesign'],
    highlight: 'Proyectos retadores',
    requirement: 'Portafolio digital',
    description: 'Desarrolla piezas gráficas publicitarias innovadoras para campañas impresas y digitales.',
    functions: ['Diseño de banners web y creatividades para redes.', 'Adaptación tipográfica y maquetación de folletos.', 'Participar en lluvia de ideas de campañas creativas.'],
    skills: ['Photoshop', 'Illustrator', 'Branding', 'Creatividad'],
    matchFeedback: 'Tu portafolio refleja un estilo dinámico y un excelente uso del color.',
    matchMissing: 'Saber animación básica en After Effects es sumamente deseable.',
    source: 'Computrabajo',
    contractType: 'Tiempo Parcial',
    postedDate: 'Hace 3 días',
  },
  {
    id: '20',
    initial: 'E',
    avatarColor: 'bg-blue-600',
    matchPercent: 76,
    title: 'Practicante de Ciberseguridad',
    company: 'Entel Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Borja, Lima',
    mode: 'Híbrido',
    salaryMin: 1250,
    salaryMax: 1550,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['Redes', 'Ethical Hacking', 'Linux'],
    highlight: 'Telecomunicaciones top',
    requirement: 'Conocimientos de TCP/IP',
    description: 'Apoya en el monitoreo de incidentes de seguridad y evaluación de vulnerabilidades en sistemas internos.',
    functions: ['Análisis de logs de seguridad en firewalls e IPS.', 'Apoyo en escaneos de vulnerabilidades periódicos.', 'Participar en la concientización de seguridad de usuarios.'],
    skills: ['Redes', 'Linux', 'Security', 'Wireshark'],
    matchFeedback: 'Tu sólida base en redes e interés en pentesting se alinea con el equipo.',
    matchMissing: 'Aprender sobre herramientas SIEM te daría mucho valor.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Prácticas',
    postedDate: 'Hace 6 días',
  },
  {
    id: '21',
    initial: 'O',
    avatarColor: 'bg-red-700',
    matchPercent: 70,
    title: 'Junior Cloud Administrator',
    company: 'Oracle Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 3200,
    salaryMax: 4400,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['Cloud', 'Linux', 'OCI'],
    highlight: 'Formación constante',
    requirement: 'Graduados universitarios',
    description: 'Apoya en la administración y soporte de infraestructura en la nube para nuestros clientes corporativos.',
    functions: ['Aprovisionamiento de recursos de cómputo en la nube.', 'Soporte y diagnóstico de incidencias Cloud.', 'Monitoreo preventivo del rendimiento de bases de datos.'],
    skills: ['Cloud Computing', 'Linux', 'Databases', 'Networking'],
    matchFeedback: 'Excelente comprensión conceptual del modelo Cloud y de sistemas Linux.',
    matchMissing: 'Contar con una certificación OCI Cloud Associate potenciará tu perfil.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '22',
    initial: 'S',
    avatarColor: 'bg-red-500',
    matchPercent: 72,
    title: 'Scrum Master Junior',
    company: 'Scotiabank',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 3000,
    salaryMax: 4000,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['Agile', 'Scrum', 'Facilitación'],
    highlight: 'Banca ágil líder',
    requirement: 'Certificación Scrum básica',
    description: 'Facilita la aplicación del marco Scrum en nuestras células de desarrollo digital bancario.',
    functions: ['Facilitación de eventos ágiles diarias, planning, retrospectivas.', 'Identificación y apoyo en la remoción de impedimentos.', 'Promoción de la autoorganización del equipo.'],
    skills: ['Scrum', 'Agile Coach', 'Jira', 'Liderazgo Servicial'],
    matchFeedback: 'Tu estilo de comunicación y empatía es idóneo para guiar equipos ágiles.',
    matchMissing: 'Requerimos un entendimiento más técnico de los flujos de código git.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 5 días',
  },
  {
    id: '23',
    initial: 'T',
    avatarColor: 'bg-cyan-700',
    matchPercent: 74,
    title: 'Junior Database Administrator',
    company: 'Telefónica',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Cercado de Lima',
    mode: 'Presencial',
    salaryMin: 2600,
    salaryMax: 3600,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['SQL', 'Oracle DBA', 'Backups'],
    highlight: 'Infraestructura robusta',
    requirement: 'Sólida base en bases de datos',
    description: 'Monitorea el correcto funcionamiento, indexación, y planes de respaldo de nuestras bases de datos.',
    functions: ['Monitoreo de queries pesadas y optimización de índices.', 'Ejecución y verificación de planes de copias de seguridad.', 'Otorgamiento de privilegios y accesos a analistas.'],
    skills: ['SQL', 'Oracle', 'SQL Server', 'Backups'],
    matchFeedback: 'Excelente lógica para optimizar consultas de bases de datos.',
    matchMissing: 'Aprender sobre automatización en servidores Unix (Bash) te ayudará.',
    source: 'Computrabajo',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 1 semana',
  },
  {
    id: '24',
    initial: 'N',
    avatarColor: 'bg-emerald-800',
    matchPercent: 71,
    title: 'Junior SEO Specialist',
    company: 'Neo Consulting',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Borja, Lima',
    mode: 'Remoto',
    salaryMin: 2000,
    salaryMax: 2800,
    level: 'Junior',
    ageMin: 20,
    ageMax: 28,
    tags: ['SEO', 'Search Console', 'Keywords'],
    highlight: 'Consultora de analítica top',
    requirement: 'Experiencia práctica en SEO',
    description: 'Optimiza la estructura interna y el contenido de los sitios web de nuestros clientes para incrementar tráfico orgánico.',
    functions: ['Estudio exhaustivo de palabras clave (keyword research).', 'Optimización on-page: meta tags, headers y optimización móvil.', 'Seguimiento de indexación y errores en Search Console.'],
    skills: ['SEO', 'Google Analytics', 'Ahrefs', 'Search Console'],
    matchFeedback: 'Gran comprensión de la intención de búsqueda y estructuración web.',
    matchMissing: 'Un entendimiento de HTML/CSS técnico mejoraría tu interacción con desarrolladores.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 3 días',
  },
  {
    id: '25',
    initial: 'P',
    avatarColor: 'bg-amber-700',
    matchPercent: 75,
    title: 'Practicante IT Auditor',
    company: 'PwC Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 1200,
    salaryMax: 1500,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['Auditoría', 'Controles TI', 'COBIT'],
    highlight: 'Excelente aprendizaje corporativo',
    requirement: 'Estudiantes de ciclos finales',
    description: 'Apoya en la auditoría de seguridad física y lógica de sistemas TI de clientes externos importantes.',
    functions: ['Revisión preliminar de políticas de accesos y perfiles.', 'Documentación de controles de IT general (ITGC).', 'Coordinación de requerimientos con auditados.'],
    skills: ['Audit', 'COBIT', 'Excel', 'Sistemas de Información'],
    matchFeedback: 'Muy metódico, ordenado y excelente ética profesional.',
    matchMissing: 'Nociones generales de seguridad en redes sumará puntos.',
    source: 'LinkedIn',
    contractType: 'Prácticas',
    postedDate: 'Hace 1 día',
  },
  {
    id: '26',
    initial: 'C',
    avatarColor: 'bg-orange-600',
    matchPercent: 78,
    title: 'Junior Mobile Developer',
    company: 'Cabify',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Santiago de Surco, Lima',
    mode: 'Híbrido',
    salaryMin: 3000,
    salaryMax: 4200,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['Flutter', 'Android', 'Dart'],
    highlight: 'Movilidad inteligente',
    requirement: '6 meses de experiencia móvil',
    description: 'Únete a nuestro equipo para mantener y optimizar los flujos móviles de nuestra app de transporte de pasajeros.',
    functions: ['Maquetación de vistas e interfaces multiplataforma en Flutter.', 'Consumo e integración de APIs del mapa en tiempo real.', 'Corrección de fallos reportados en producción.'],
    skills: ['Flutter', 'Dart', 'Git', 'Mobile Architecture'],
    matchFeedback: 'Tus proyectos personales en Flutter demuestran buena base de arquitectura móvil.',
    matchMissing: 'Aprender sobre animaciones nativas en iOS aportaría al equipo.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 4 días',
  },
  {
    id: '27',
    initial: 'Y',
    avatarColor: 'bg-yellow-500',
    matchPercent: 84,
    title: 'Practicante DevOps',
    company: 'Yape',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 1300,
    salaryMax: 1600,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 26,
    tags: ['Docker', 'Pipelines', 'Linux'],
    highlight: 'La billetera digital del Perú',
    requirement: 'Interés genuino en DevOps',
    description: 'Apoya en la automatización del despliegue y mantenimiento de microservicios utilizados por millones de usuarios.',
    functions: ['Apoyo en el mantenimiento de contenedores Docker de desarrollo.', 'Colaboración en la configuración de flujos Git.', 'Monitoreo de métricas del sistema.'],
    skills: ['Docker', 'Git', 'Linux', 'CI/CD Básico'],
    matchFeedback: 'Tu nivel de curiosidad técnica y tus fundamentos de Linux son excelentes.',
    matchMissing: 'Aprender lo básico de la nube de AWS acelerará tu inclusión.',
    source: 'Computrabajo',
    contractType: 'Prácticas',
    postedDate: 'Hace 2 días',
  },
  {
    id: '28',
    initial: 'C',
    avatarColor: 'bg-red-600',
    matchPercent: 81,
    title: 'Soporte de Infraestructura',
    company: 'Claro Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'La Victoria, Lima',
    mode: 'Presencial',
    salaryMin: 2000,
    salaryMax: 2700,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['Servidores', 'Networking', 'VMware'],
    highlight: 'Infraestructura masiva',
    requirement: 'Estudios de redes y telecomunicaciones',
    description: 'Realiza el mantenimiento preventivo y configuración de servidores y equipos de red del centro de datos corporativo.',
    functions: ['Instalación física de servidores y cableado estructurado.', 'Monitoreo preventivo del clúster de virtualización VMware.', 'Atención a incidentes y reemplazo de hardware.'],
    skills: ['Networking', 'VMware', 'Linux Server', 'Cisco CCNA'],
    matchFeedback: 'Excelente disposición al trabajo en sitio y entendimiento de cableado/redes.',
    matchMissing: 'Obtener la certificación CCNA te daría un gran respaldo formal.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 5 días',
  },
  {
    id: '29',
    initial: 'R',
    avatarColor: 'bg-purple-800',
    matchPercent: 84,
    title: 'Junior Product Owner',
    company: 'Ripley',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 3200,
    salaryMax: 4500,
    level: 'Junior',
    ageMin: 22,
    ageMax: 32,
    tags: ['Agile', 'Product Backlog', 'User Stories'],
    highlight: 'E-commerce retail líder',
    requirement: 'Habilidades de priorización',
    description: 'Gestiona la cola de trabajo del equipo técnico para el desarrollo de nuevas funcionalidades en el carrito de compras.',
    functions: ['Priorización del backlog en base a métricas comerciales.', 'Definición de criterios de aceptación para el equipo de desarrollo.', 'Alineamiento periódico de expectativas con stakeholders.'],
    skills: ['Product Backlog', 'Agile', 'UX Mindset', 'SQL Básico'],
    matchFeedback: 'Excelente entendimiento de negocio y buena visión de cara a la experiencia de usuario.',
    matchMissing: 'Aprender a medir conversión con Google Analytics elevaría tu fit.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 3 días',
  },
  {
    id: '30',
    initial: 'C',
    avatarColor: 'bg-emerald-600',
    matchPercent: 78,
    title: 'BI Developer Junior',
    company: 'Cencosud',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Híbrido',
    salaryMin: 2200,
    salaryMax: 3200,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['SQL', 'Power BI', 'ETL'],
    highlight: 'Gran corporación retail',
    requirement: 'Conocimientos sólidos en bases de datos relacionales',
    description: 'Desarrolla, automatiza y mantiene los procesos ETL y reportes ejecutivos para el área comercial.',
    functions: ['Desarrollo de stored procedures SQL y cargas de datos ETL.', 'Diseño de dashboards en Power BI con fórmulas DAX eficientes.', 'Mantenimiento del almacén de datos (Data Warehouse).'],
    skills: ['SQL Server', 'Power BI', 'DAX', 'SSIS ETL'],
    matchFeedback: 'Excelente estructura lógica y un muy buen manejo de modelamiento estrella.',
    matchMissing: 'Aprender Python orientado a datos facilitaría automatizaciones.',
    source: 'Computrabajo',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 4 días',
  },
  {
    id: '31',
    initial: 'Y',
    avatarColor: 'bg-yellow-500',
    matchPercent: 86,
    title: 'Practicante Product Manager',
    company: 'Yape',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 1400,
    salaryMax: 1700,
    level: 'Practicante',
    ageMin: 19,
    ageMax: 26,
    tags: ['Product Management', 'Métricas', 'Agile'],
    highlight: 'La billetera del Perú',
    requirement: 'Orientado al usuario y datos',
    description: 'Apoya al equipo de producto en la definición, priorización y seguimiento de nuevas funcionalidades de la app Yape.',
    functions: ['Análisis de métricas de producto con Amplitude y SQL.', 'Redacción de historias de usuario y criterios de aceptación.', 'Participación en sprints y revisión de roadmap.'],
    skills: ['SQL', 'Amplitude', 'Jira', 'Google Slides'],
    matchFeedback: 'Tu orientación al usuario y habilidades analíticas encajan con la cultura de producto de Yape.',
    matchMissing: 'Conocer A/B testing y experimentación potenciará tu perfil.',
    source: 'LinkedIn',
    contractType: 'Prácticas',
    postedDate: 'Hace 1 día',
  },
  {
    id: '32',
    initial: 'ML',
    avatarColor: 'bg-yellow-400',
    matchPercent: 80,
    title: 'Junior Full Stack Developer',
    company: 'Mercado Libre',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 3200,
    salaryMax: 4500,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['React', 'Node.js', 'PostgreSQL'],
    highlight: 'Mayor e-commerce de LATAM',
    requirement: 'Proyectos fullstack demostrables',
    description: 'Desarrolla y mantiene funcionalidades del marketplace para millones de usuarios en América Latina.',
    functions: ['Desarrollo de vistas React conectadas a APIs internas.', 'Construcción de microservicios backend en Node.js.', 'Escritura de pruebas unitarias e integración.'],
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    matchFeedback: 'Tu stack React + Node.js es exactamente lo que busca el equipo de sellers.',
    matchMissing: 'Aprender sobre arquitectura de microservicios escalaría tu perfil.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 3 días',
  },
  {
    id: '33',
    initial: 'B',
    avatarColor: 'bg-indigo-700',
    matchPercent: 73,
    title: 'Analista E-commerce Junior',
    company: 'Belcorp',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Surco, Lima',
    mode: 'Híbrido',
    salaryMin: 2000,
    salaryMax: 2800,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['E-commerce', 'Google Analytics', 'Excel'],
    highlight: 'Marca de belleza líder',
    requirement: 'Experiencia en plataformas digitales',
    description: 'Analiza el desempeño del canal digital de ventas directas para las marcas L\'Bel, Ésika y Cyzone.',
    functions: ['Seguimiento de KPIs del canal digital (conversión, tráfico, ticket promedio).', 'Elaboración de reportes de ventas e-commerce semanales.', 'Coordinación con agencias digitales para optimizar campañas.'],
    skills: ['Google Analytics', 'Excel avanzado', 'Meta Ads', 'Shopify'],
    matchFeedback: 'Tu conocimiento en analítica web y métricas de venta online es valorado en el equipo.',
    matchMissing: 'Tener experiencia directa con plataformas Shopify o Vtex suma mucho.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 5 días',
  },
  {
    id: '34',
    initial: 'SAP',
    avatarColor: 'bg-blue-500',
    matchPercent: 69,
    title: 'Consultor Junior SAP FI',
    company: 'SAP Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Presencial',
    salaryMin: 3000,
    salaryMax: 4000,
    level: 'Junior',
    ageMin: 22,
    ageMax: 32,
    tags: ['SAP', 'Contabilidad', 'Finanzas'],
    highlight: 'ERP líder global',
    requirement: 'Conocimientos de finanzas o contabilidad',
    description: 'Apoya en implementaciones del módulo financiero SAP FI para clientes del sector bancario y retail en Perú.',
    functions: ['Configuración básica de módulos financieros SAP FI/CO.', 'Levantamiento de requerimientos con usuarios clave de finanzas.', 'Documentación de pruebas funcionales y manuales de usuario.'],
    skills: ['SAP FI', 'Contabilidad', 'Excel', 'Finanzas corporativas'],
    matchFeedback: 'Tu base en contabilidad y finanzas es la puerta de entrada al mundo SAP.',
    matchMissing: 'Certificarte en SAP FI Associate elevaría significativamente tu candidatura.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '35',
    initial: 'KW',
    avatarColor: 'bg-green-600',
    matchPercent: 77,
    title: 'Practicante Ciberseguridad Ofensiva',
    company: 'Kibernum Perú',
    status: 'Urgente',
    statusColor: 'warning',
    location: 'San Borja, Lima',
    mode: 'Híbrido',
    salaryMin: 1500,
    salaryMax: 1800,
    level: 'Practicante',
    ageMin: 19,
    ageMax: 26,
    tags: ['Pentesting', 'Linux', 'Kali Linux'],
    highlight: 'Seguridad ofensiva real',
    requirement: 'Conocimientos de redes y Linux',
    description: 'Participa en ejercicios de red team y evaluación de vulnerabilidades para clientes del sector financiero.',
    functions: ['Reconocimiento y análisis de superficie de ataque.', 'Ejecución de pruebas de penetración en aplicaciones web.', 'Elaboración de reportes técnicos de hallazgos.'],
    skills: ['Kali Linux', 'Burp Suite', 'OWASP', 'Nmap'],
    matchFeedback: 'Tu base en redes y entusiasmo por la seguridad ofensiva es un buen punto de partida.',
    matchMissing: 'Practicar en plataformas como HackTheBox o TryHackMe potenciará tu perfil.',
    source: 'Computrabajo',
    contractType: 'Prácticas',
    postedDate: 'Hace 1 día',
  },
  {
    id: '36',
    initial: 'PE',
    avatarColor: 'bg-red-500',
    matchPercent: 81,
    title: 'Junior Frontend React Developer',
    company: 'PedidosYa Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Remoto',
    mode: 'Remoto',
    salaryMin: 2800,
    salaryMax: 3800,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['React', 'TypeScript', 'Figma'],
    highlight: 'Delivery tech en expansión',
    requirement: 'Dominio de React y TypeScript',
    description: 'Construye componentes de la interfaz de la app de delivery más rápida de Latinoamérica.',
    functions: ['Desarrollo de componentes React reutilizables con TypeScript.', 'Implementación de diseños Figma con pixel-perfect accuracy.', 'Optimización de rendimiento y accesibilidad (a11y).'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Jest'],
    matchFeedback: 'Tu manejo de React con TypeScript y atención al detalle de UI es exactamente lo que busca el equipo.',
    matchMissing: 'Aprender testing con React Testing Library fortalecería tu posición.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 4 días',
  },
  {
    id: '37',
    initial: 'PRO',
    avatarColor: 'bg-violet-600',
    matchPercent: 74,
    title: 'Practicante UX Research',
    company: 'Promart',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Presencial',
    salaryMin: 1300,
    salaryMax: 1600,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['UX Research', 'Figma', 'Entrevistas'],
    highlight: 'Retail mejoramiento del hogar',
    requirement: 'Interés genuino en psicología del usuario',
    description: 'Investiga comportamientos de compradores para mejorar la experiencia en la app y tiendas digitales de Promart.',
    functions: ['Planificación y conducción de entrevistas con usuarios.', 'Análisis de datos cualitativos y síntesis de hallazgos.', 'Elaboración de mapas de empatía y journey maps.'],
    skills: ['Figma', 'Miro', 'UX Research', 'Análisis cualitativo'],
    matchFeedback: 'Tu perfil analítico y capacidad de escucha activa es clave para el research de usuarios.',
    matchMissing: 'Aprender métodos de investigación cuantitativa (encuestas, estadística) te diferenciaría.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Prácticas',
    postedDate: 'Hace 6 días',
  },
  {
    id: '38',
    initial: 'IZI',
    avatarColor: 'bg-cyan-600',
    matchPercent: 88,
    title: 'Junior Python Developer',
    company: 'Izipay',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 2800,
    salaryMax: 3600,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    highlight: 'Fintech de pagos en crecimiento',
    requirement: 'Python con orientación a servicios',
    description: 'Desarrolla microservicios de procesamiento de pagos y conciliación bancaria para el ecosistema Izipay.',
    functions: ['Construcción de APIs REST con FastAPI y Python.', 'Integración con pasarelas de pago (Visa, Mastercard).', 'Diseño de modelos de base de datos en PostgreSQL.'],
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    matchFeedback: 'Tu sólido conocimiento en Python y APIs REST es exactamente el stack del equipo backend.',
    matchMissing: 'Familiarizarte con conceptos de PCI DSS (seguridad en pagos) suma mucho.',
    source: 'LinkedIn',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 2 días',
  },
  {
    id: '39',
    initial: 'BC',
    avatarColor: 'bg-fuchsia-600',
    matchPercent: 76,
    title: 'Analista de Riesgo Crediticio Jr',
    company: 'BanBif',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 2200,
    salaryMax: 3000,
    level: 'Junior',
    ageMin: 21,
    ageMax: 30,
    tags: ['Riesgo', 'Excel', 'SAS'],
    highlight: 'Banca boutique con crecimiento',
    requirement: 'Formación en finanzas o economía',
    description: 'Evalúa solicitudes de crédito y monitorea la cartera para minimizar el riesgo de mora en segmento PYME.',
    functions: ['Análisis de estados financieros de empresas solicitantes.', 'Modelado de scoring crediticio en Excel y SAS.', 'Elaboración de informes de riesgo para el comité de créditos.'],
    skills: ['Excel avanzado', 'SAS básico', 'Finanzas', 'Riesgo crediticio'],
    matchFeedback: 'Tu formación en finanzas y análisis cuantitativo encaja con el perfil de riesgo.',
    matchMissing: 'Conocer herramientas como Python para scoring automatizado te diferenciaría.',
    source: 'Bumeran',
    contractType: 'Tiempo Completo',
    postedDate: 'Hace 3 días',
  },
  {
    id: '40',
    initial: 'KON',
    avatarColor: 'bg-orange-700',
    matchPercent: 70,
    title: 'Practicante Business Intelligence',
    company: 'Konecta BPO',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Surco, Lima',
    mode: 'Híbrido',
    salaryMin: 1200,
    salaryMax: 1500,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 25,
    tags: ['Power BI', 'SQL', 'Excel'],
    highlight: 'BPO con presencia en 20 países',
    requirement: 'Interés en datos y reporting',
    description: 'Apoya en la construcción de dashboards operativos y análisis de KPIs del contact center para múltiples clientes.',
    functions: ['Diseño de reportes de KPIs operativos en Power BI.', 'Extracción y transformación de datos con SQL.', 'Soporte en el análisis de tendencias de llamadas y satisfacción.'],
    skills: ['Power BI', 'SQL', 'Excel', 'DAX básico'],
    matchFeedback: 'Tu manejo de Power BI y SQL te da base sólida para el análisis operativo.',
    matchMissing: 'Aprender Python para automatizar reportes sería una ventaja competitiva.',
    source: 'UTP Bolsa Laboral',
    contractType: 'Prácticas',
    postedDate: 'Hace 2 días',
  },
]

const defaultFilters: AppliedFilters = {
  query: '',
  address: '',
  modes: [],
  salaryMin: '',
  salaryMax: '',
  levels: [],
  ageMin: '',
  ageMax: '',
  sources: [],
}

function toggleItem(items: string[], value: string) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

function JobInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-base-200/60 px-4 py-3 text-sm">
      <span className="text-base-content/60">{label}</span>
      <span className="font-medium text-base-content">{value}</span>
    </div>
  )
}

function getSourceBadgeStyle(source: string) {
  switch (source) {
    case 'LinkedIn':
      return 'bg-info/10 text-info border-info/20'
    case 'Bumeran':
      return 'bg-secondary/10 text-secondary border-secondary/20'
    case 'Computrabajo':
      return 'bg-warning/10 text-warning border-warning/20'
    case 'UTP Bolsa Laboral':
      return 'bg-error/10 text-error border-error/20'
    default:
      return 'bg-base-200 text-base-content/85 border-base-300'
  }
}

export default function JobMatchPage() {
  const [filters, setFilters] = useState<AppliedFilters>(defaultFilters)
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickIndex, setQuickIndex] = useState(0)
  const { matchedJobs, setMatchedJobs, matchesDrawerOpen, setMatchesDrawerOpen } = useJobMatch()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobItem | null>(null)
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null)

  const topFiltersRef = useRef<HTMLDivElement>(null)
  const [isTopFiltersVisible, setIsTopFiltersVisible] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const [activeTab, setActiveTab] = useState<'explorar' | 'matches'>('explorar')

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const [removedJobs, setRemovedJobs] = useState<string[]>([])
  const [lastRemovedJob, setLastRemovedJob] = useState<string | null>(null)
  const [removedUndoTimer, setRemovedUndoTimer] = useState<NodeJS.Timeout | null>(null)

  const { data: catalogData, isLoading: isCatalogLoading } = useFakeFetch(jobCatalog)
  const effectiveCatalog = catalogData ?? []

  const [displayedJob, setDisplayedJob] = useState<JobItem | null>(null)
  const [panelAnimClass, setPanelAnimClass] = useState('animate__backInRight')

  const filterCounts = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const address = filters.address.trim().toLowerCase()

    const counts = {
      modes: {} as Record<string, number>,
      levels: {} as Record<string, number>,
      sources: {} as Record<string, number>,
    }

    workModes.forEach(m => counts.modes[m] = 0)
    levels.forEach(l => counts.levels[l] = 0)
    const allSources = ['LinkedIn', 'Bumeran', 'Computrabajo', 'UTP Bolsa Laboral']
    allSources.forEach(s => counts.sources[s] = 0)

    effectiveCatalog.forEach(job => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchesAddress = !address || job.location.toLowerCase().includes(address)

      if (matchesQuery && matchesAddress) {
        if (counts.modes[job.mode] !== undefined) counts.modes[job.mode]++
        if (counts.levels[job.level] !== undefined) counts.levels[job.level]++
        if (counts.sources[job.source] !== undefined) counts.sources[job.source]++
      }
    })

    return counts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.query, filters.address, effectiveCatalog])

  const filteredJobs = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const address = filters.address.trim().toLowerCase()
    const salaryMin = filters.salaryMin ? Number(filters.salaryMin) : null
    const salaryMax = filters.salaryMax ? Number(filters.salaryMax) : null
    const ageMin = filters.ageMin ? Number(filters.ageMin) : null
    const ageMax = filters.ageMax ? Number(filters.ageMax) : null

    return effectiveCatalog.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchesAddress = !address || job.location.toLowerCase().includes(address)
      const matchesMode = filters.modes.length === 0 || filters.modes.includes(job.mode)
      const matchesLevel = filters.levels.length === 0 || filters.levels.includes(job.level)
      const matchesSalary =
        (salaryMin === null || job.salaryMax >= salaryMin) &&
        (salaryMax === null || job.salaryMin <= salaryMax)
      const matchesAge =
        (ageMin === null || job.ageMax >= ageMin) &&
        (ageMax === null || job.ageMin <= ageMax)
      const matchesSource = filters.sources.length === 0 || filters.sources.includes(job.source)

      return matchesQuery && matchesAddress && matchesMode && matchesLevel && matchesSalary && matchesAge && matchesSource && !removedJobs.includes(job.id)
    }).sort((a, b) => {
      // Prioritize the Scotiabank Junior Data Analyst (ID '1') to show first
      if (a.id === '1') return -1
      if (b.id === '1') return 1
      return b.matchPercent - a.matchPercent
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, removedJobs, effectiveCatalog])

  const activeJobsList = useMemo(() => {
    return activeTab === 'explorar' ? filteredJobs : matchedJobs
  }, [activeTab, filteredJobs, matchedJobs])

  const selectedJob = useMemo(() => {
    if (selectedJobId) {
      const found = activeJobsList.find((j) => j.id === selectedJobId)
      if (found) return found
    }
    return activeJobsList[0] || null
  }, [selectedJobId, activeJobsList])

  const getMatchColorStroke = (percent: number) => {
    if (percent >= 80) return 'stroke-success'
    if (percent >= 75) return 'stroke-warning'
    return 'stroke-error'
  }

  const getMatchColorText = (percent: number) => {
    if (percent >= 80) return 'text-success'
    if (percent >= 75) return 'text-warning'
    return 'text-error'
  }

  const getMatchColorBg = (percent: number) => {
    if (percent >= 80) return 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    if (percent >= 75) return 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800'
  }

  const getMatchDotColor = (percent: number) => {
    if (percent >= 80) return 'bg-success'
    if (percent >= 75) return 'bg-warning'
    return 'bg-error'
  }

  const currentQuickJob = filteredJobs[quickIndex] ?? null
  const selectedJobs = useMemo(() => matchedJobs, [matchedJobs])

  const totalPages = Math.ceil(activeJobsList.length / itemsPerPage)
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return activeJobsList.slice(start, start + itemsPerPage)
  }, [activeJobsList, currentPage, itemsPerPage])

  const activeFilterChips = useMemo(() => {
    const chips: { type: string; value: string; label: string }[] = []

    filters.modes.forEach(mode => {
      chips.push({ type: 'mode', value: mode, label: `Modalidad: ${mode}` })
    })
    filters.levels.forEach(level => {
      chips.push({ type: 'level', value: level, label: `Nivel: ${level}` })
    })
    filters.sources.forEach(source => {
      chips.push({ type: 'source', value: source, label: `Portal: ${source}` })
    })
    if (filters.salaryMin) {
      chips.push({ type: 'salaryMin', value: filters.salaryMin, label: `Sueldo Mín: S/ ${filters.salaryMin}` })
    }
    if (filters.salaryMax) {
      chips.push({ type: 'salaryMax', value: filters.salaryMax, label: `Sueldo Máx: S/ ${filters.salaryMax}` })
    }
    if (filters.query) {
      chips.push({ type: 'query', value: filters.query, label: `Buscar: "${filters.query}"` })
    }
    if (filters.address) {
      chips.push({ type: 'address', value: filters.address, label: `Ubicación: "${filters.address}"` })
    }

    return chips
  }, [filters])

  function removeFilterChip(type: string, value: string) {
    if (type === 'mode') {
      setFilters(f => ({ ...f, modes: f.modes.filter(m => m !== value) }))
    } else if (type === 'level') {
      setFilters(f => ({ ...f, levels: f.levels.filter(l => l !== value) }))
    } else if (type === 'source') {
      setFilters(f => ({ ...f, sources: f.sources.filter(s => s !== value) }))
    } else if (type === 'salaryMin') {
      setFilters(f => ({ ...f, salaryMin: '' }))
    } else if (type === 'salaryMax') {
      setFilters(f => ({ ...f, salaryMax: '' }))
    } else if (type === 'query') {
      setFilters(f => ({ ...f, query: '' }))
    } else if (type === 'address') {
      setFilters(f => ({ ...f, address: '' }))
    }
    setCurrentPage(1)
  }

  useEffect(() => {
    if (!quickOpen) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setQuickOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [quickOpen])

  useEffect(() => {
    const checkVisibility = () => {
      if (topFiltersRef.current) {
        const rect = topFiltersRef.current.getBoundingClientRect()
        // Está visible si su parte inferior es mayor a 0 (no se ha ocultado por arriba)
        setIsTopFiltersVisible(rect.bottom > 0)
      }
    }

    // Escuchar scroll en la ventana
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility, { passive: true })

    // También creamos un observer por si acaso el contenedor cambia de tamaño o scroll interno
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopFiltersVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (topFiltersRef.current) {
      observer.observe(topFiltersRef.current)
    }

    checkVisibility()

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (quickIndex >= filteredJobs.length) {
      setQuickIndex(0)
    }
  }, [filteredJobs.length, quickIndex])

  function applyFilters() {
    setFiltersOpen(false)
  }

  function clearFilters() {
    setFilters(defaultFilters)
    setQuickIndex(0)
    setCurrentPage(1)
    setSelectedJobId(null)
  }

  function openQuickSearch() {
    setQuickIndex(0)
    setQuickOpen(true)
  }

  function advanceQuick() {
    const nextIndex = quickIndex + 1
    if (nextIndex >= filteredJobs.length) {
      setQuickIndex(0)
      setQuickOpen(false)
      return
    }
    setQuickIndex(nextIndex)
  }

  function rejectCurrent() {
    advanceQuick()
  }

  function matchCurrent() {
    if (currentQuickJob && !matchedJobs.some((job) => job.id === currentQuickJob.id)) {
      setMatchedJobs((prev) => [...prev, currentQuickJob])
    }
    advanceQuick()
  }

  useEffect(() => {
    if (!selectedJob) {
      setDisplayedJob(null)
      return
    }
    if (!displayedJob || displayedJob.id === selectedJob.id) {
      setDisplayedJob(selectedJob)
      setPanelAnimClass('animate__backInRight')
      return
    }
    setPanelAnimClass('animate__backOutRight')
    const timer = setTimeout(() => {
      setDisplayedJob(selectedJob)
      setPanelAnimClass('animate__backInRight')
    }, 380)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJob?.id])

  return (
    <PageShell>
      <PageHeader
        title="Job match"
        subtitle="Encuentra empleos que encajen contigo."
        maxWidthClassName="max-w-[1600px]"
      />

      <div 
        className="flex-1 overflow-y-auto bg-transparent"
        onScroll={(e) => {
          if (topFiltersRef.current) {
            const rect = topFiltersRef.current.getBoundingClientRect()
            setIsTopFiltersVisible(rect.bottom > 0)
          }
        }}
      >
        <main className="max-w-[1600px] mx-auto px-6 pb-12 pt-2">
          {/* Card de Filtros de Búsqueda Rápida */}
          <div ref={topFiltersRef} className="bg-base-100 border border-base-200 rounded-3xl p-6 mb-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1.2fr_auto] items-end">
              <label className="relative flex flex-col gap-1.5 flex-1">
                <span className="text-xs font-bold text-base-content/60">Puesto o empresa</span>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
                  <input
                    aria-label="Puesto o empresa"
                    placeholder="Puesto, empresa o palabra clave"
                    value={filters.query}
                    onChange={(e) => {
                      setFilters({ ...filters, query: e.target.value })
                      setCurrentPage(1)
                    }}
                    className="w-full rounded-2xl border border-base-300 bg-base-100 py-3.5 pl-11 pr-4 text-sm text-base-content outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </label>

              <label className="relative flex flex-col gap-1.5 flex-1">
                <span className="text-xs font-bold text-base-content/60">Dirección</span>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
                  <input
                    aria-label="Dirección"
                    placeholder="Ciudad, país, distrito o 'Remoto'"
                    value={filters.address}
                    onChange={(e) => {
                      setFilters({ ...filters, address: e.target.value })
                      setCurrentPage(1)
                    }}
                    className="w-full rounded-2xl border border-base-300 bg-base-100 py-3.5 pl-11 pr-4 text-sm text-base-content outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </label>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(prev => !prev)}
                  className={`inline-flex h-[48px] items-center justify-center gap-2 rounded-2xl border px-6 text-sm font-bold transition cursor-pointer flex-1 md:flex-none ${
                    filtersOpen
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-base-200 hover:bg-base-300 border-base-300 text-base-content'
                  }`}
                >
                  <Filter className="h-4.5 w-4.5" />
                  Filtros
                  {filtersOpen ? <ChevronUp className="h-4 w-4 ml-0.5" /> : <ChevronDown className="h-4 w-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={openQuickSearch}
                  className="inline-flex h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary/90 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 flex-1 md:flex-none cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  Búsqueda rápida
                </button>
              </div>
            </div>

            {/* Expandable filters panel (Desktop Inline, Mobile Drawer) */}
            {filtersOpen && (
              <>
                {/* Mobile Backdrop */}
                <div
                  className="fixed inset-0 z-[60] bg-base-content/40 backdrop-blur-sm lg:hidden animate-fadeIn"
                  onClick={() => setFiltersOpen(false)}
                />

                {/* Filters Container */}
                <div className="fixed bottom-0 left-0 right-0 z-[70] max-h-[85vh] flex flex-col bg-base-100 rounded-t-3xl shadow-2xl animate-slideUp lg:static lg:mt-6 lg:pt-6 lg:border-t lg:border-base-200 lg:animate-slideDown lg:max-h-none lg:bg-transparent lg:shadow-none lg:rounded-none lg:block">

                  {/* Mobile Header */}
                  <div className="flex shrink-0 items-center justify-between px-6 py-5 border-b border-base-200 bg-base-100/95 backdrop-blur-md rounded-t-3xl lg:hidden">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Filter className="h-4.5 w-4.5" />
                      </div>
                      <h2 className="text-sm font-extrabold text-base-content uppercase tracking-wider">Filtros</h2>
                    </div>
                    <button onClick={() => setFiltersOpen(false)} className="rounded-full p-2 text-base-content/40 hover:bg-base-200 cursor-pointer">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Content (Grid) */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 lg:p-0 lg:overflow-visible">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Modalidad Filter */}
                      <section className="rounded-2xl bg-base-200/40 p-4 border border-base-200/60">
                        <div className="mb-3 flex items-center gap-2 text-base-content/60">
                          <Clock3 className="h-4 w-4" />
                          <h3 className="text-xs font-bold uppercase tracking-wider">Modalidad</h3>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {workModes.map((mode) => {
                            const selected = filters.modes.includes(mode)
                            const count = filterCounts.modes[mode] || 0
                            return (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => {
                                  setFilters({ ...filters, modes: toggleItem(filters.modes, mode) })
                                  setCurrentPage(1)
                                }}
                                className={`flex items-center justify-between w-full rounded-xl border px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${selected
                                    ? 'border-primary bg-primary/10 text-primary shadow-2xs'
                                    : 'border-transparent bg-base-100 text-base-content/80 hover:border-base-300 hover:bg-base-200/50'
                                  }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`flex h-4 w-4 items-center justify-center rounded-md border transition-all ${selected ? 'border-primary bg-primary text-white' : 'border-base-300 bg-base-100'
                                    }`}>
                                    {selected && <Check className="h-3 w-3 stroke-[3]" />}
                                  </div>
                                  <span>{mode}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${selected ? 'bg-primary/20 text-primary' : 'bg-base-200 text-base-content/60'
                                  }`}>
                                  {count}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </section>

                      {/* Rango Salarial Filter */}
                      <section className="rounded-2xl bg-base-200/40 p-4 border border-base-200/60">
                        <div className="mb-3 flex items-center gap-2 text-base-content/60">
                          <DollarSign className="h-4 w-4" />
                          <h3 className="text-xs font-bold uppercase tracking-wider">Rango Salarial</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Min (S/)"
                            value={filters.salaryMin}
                            onChange={(e) => {
                              setFilters({ ...filters, salaryMin: e.target.value })
                              setCurrentPage(1)
                            }}
                            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base-content"
                          />
                          <input
                            type="number"
                            placeholder="Max (S/)"
                            value={filters.salaryMax}
                            onChange={(e) => {
                              setFilters({ ...filters, salaryMax: e.target.value })
                              setCurrentPage(1)
                            }}
                            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base-content"
                          />
                        </div>
                      </section>

                      {/* Nivel Filter */}
                      <section className="rounded-2xl bg-base-200/40 p-4 border border-base-200/60">
                        <div className="mb-3 flex items-center gap-2 text-base-content/60">
                          <GraduationCap className="h-4 w-4" />
                          <h3 className="text-xs font-bold uppercase tracking-wider">Nivel</h3>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {levels.map((level) => {
                            const selected = filters.levels.includes(level)
                            const count = filterCounts.levels[level] || 0
                            return (
                              <button
                                key={level}
                                type="button"
                                onClick={() => {
                                  setFilters({ ...filters, levels: toggleItem(filters.levels, level) })
                                  setCurrentPage(1)
                                }}
                                className={`flex items-center justify-between w-full rounded-xl border px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${selected
                                    ? 'border-primary bg-primary/10 text-primary shadow-2xs'
                                    : 'border-transparent bg-base-100 text-base-content/80 hover:border-base-300 hover:bg-base-200/50'
                                  }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`flex h-4 w-4 items-center justify-center rounded-md border transition-all ${selected ? 'border-primary bg-primary text-white' : 'border-base-300 bg-base-100'
                                    }`}>
                                    {selected && <Check className="h-3 w-3 stroke-[3]" />}
                                  </div>
                                  <span>{level}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${selected ? 'bg-primary/20 text-primary' : 'bg-base-200 text-base-content/60'
                                  }`}>
                                  {count}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </section>

                      {/* Portal Filter */}
                      <section className="rounded-2xl bg-base-200/40 p-4 border border-base-200/60">
                        <div className="mb-3 flex items-center gap-2 text-base-content/60">
                          <Briefcase className="h-4 w-4" />
                          <h3 className="text-xs font-bold uppercase tracking-wider">Portal</h3>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {['LinkedIn', 'Bumeran', 'Computrabajo', 'UTP Bolsa Laboral'].map((source) => {
                            const selected = filters.sources.includes(source)
                            const count = filterCounts.sources[source] || 0
                            return (
                              <button
                                key={source}
                                type="button"
                                onClick={() => {
                                  setFilters({ ...filters, sources: toggleItem(filters.sources, source) })
                                  setCurrentPage(1)
                                }}
                                className={`flex items-center justify-between w-full rounded-xl border px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${selected
                                    ? 'border-primary bg-primary/10 text-primary shadow-2xs'
                                    : 'border-transparent bg-base-100 text-base-content/80 hover:border-base-300 hover:bg-base-200/50'
                                  }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`flex h-4 w-4 items-center justify-center rounded-md border transition-all ${selected ? 'border-primary bg-primary text-white' : 'border-base-300 bg-base-100'
                                    }`}>
                                    {selected && <Check className="h-3 w-3 stroke-[3]" />}
                                  </div>
                                  <span>{source}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${selected ? 'bg-primary/20 text-primary' : 'bg-base-200 text-base-content/60'
                                  }`}>
                                  {count}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </section>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex shrink-0 items-center justify-end gap-3 p-5 border-t border-base-200 bg-base-50/50 backdrop-blur-sm lg:bg-transparent lg:border-t lg:border-base-200/60 lg:mt-6 lg:pt-6 lg:p-0">
                    <button type="button" onClick={clearFilters} className="flex-1 lg:flex-none px-5 py-3 lg:py-2.5 text-sm font-bold text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-xl transition cursor-pointer text-center">
                      Limpiar
                    </button>
                    <button type="button" onClick={() => setFiltersOpen(false)} className="flex-1 lg:flex-none px-6 py-3 lg:py-2.5 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded-xl shadow-sm transition cursor-pointer flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" />
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {showDisclaimer && (
            <div className="mb-6 rounded-2xl bg-amber-100/50 border border-amber-200 p-4 sm:p-5 flex items-start gap-4 shadow-sm relative animate-fadeIn">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800">
                <Info className="h-5 w-5" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-bold text-amber-900">Sobre el Porcentaje de Match</h3>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">
                  El porcentaje de match mide la compatibilidad técnica entre tu perfil y los requisitos de la vacante basado en palabras clave y habilidades. <strong>No significa el éxito de la entrevista ni asegura la contratación.</strong> Te sugerimos usar esta herramienta como guía para identificar qué áreas puedes mejorar.
                </p>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="absolute top-4 right-4 text-amber-700 hover:bg-amber-300 p-1.5 rounded-full transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="w-full">
            {/* ── Main content area ── */}
            <div className="w-full">
              {/* Tab Navigation replaced with title */}
              <div className="mb-6 pb-4 border-b border-base-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-base-content">Explorar Vacantes</h2>
                  <span className="text-xs px-2.5 py-1 rounded-full font-extrabold bg-primary/10 text-primary">
                    {filteredJobs.length} encontradas
                  </span>
                </div>
              </div>

              {/* Empty state when no jobs found */}
              {isCatalogLoading ? (
                <div className="lg:grid lg:grid-cols-[1.1fr_1.3fr] gap-6 items-start">
                  {/* Skeleton list */}
                  <div className="flex flex-col h-[calc(100vh-200px)]">
                    <div className="flex-1 overflow-y-auto pr-3 space-y-4 pb-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                      <div className="grid grid-cols-1 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <JobOfferSkeleton key={i} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Skeleton detail panel */}
                  <div className="sticky top-6 hidden lg:block">
                    <div className="border border-base-200 rounded-3xl bg-base-100 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-4 border-b border-base-200 pb-5">
                        <div className="skeleton h-14 w-14 rounded-2xl flex-shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="skeleton h-5 w-3/4" />
                          <div className="skeleton h-3 w-1/2" />
                        </div>
                      </div>
                      <div className="skeleton h-28 w-full rounded-2xl" />
                      <div className="grid grid-cols-2 gap-2.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="skeleton h-16 rounded-xl" />
                        ))}
                      </div>
                      <div className="skeleton h-20 w-full rounded-xl" />
                      <div className="skeleton h-16 w-full rounded-xl" />
                      <div className="border-t border-base-200 pt-4 flex gap-3">
                        <div className="skeleton flex-1 h-12 rounded-2xl" />
                        <div className="skeleton flex-1 h-12 rounded-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeJobsList.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-12 text-center shadow-xs">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/60 mb-4">
                    {activeTab === 'explorar' ? <Search className="h-6 w-6" /> : <TieIcon className="h-6 w-6" />}
                  </div>
                  <h3 className="text-base font-bold text-base-content">
                    {activeTab === 'explorar' ? 'No se encontraron resultados' : 'Aún no tienes matches'}
                  </h3>
                  <p className="mt-1.5 text-xs text-base-content/60 max-w-sm mx-auto leading-relaxed">
                    {activeTab === 'explorar'
                      ? 'Intenta cambiar las palabras clave, escribir otra dirección o limpiar los filtros seleccionados.'
                      : 'Explora las ofertas laborales y haz clic en el botón de corazón para guardar tus vacantes favoritas aquí.'}
                  </p>
                  {activeTab === 'explorar' && (
                    <button
                      onClick={clearFilters}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/90 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Restablecer filtros
                    </button>
                  )}
                </div>
              ) : (
                /* Split Screen Layout (Cards on Left, Details on Right) */
                <div className="lg:grid lg:grid-cols-[1.1fr_1.3fr] gap-6 items-start">
                  {/* Left Pane: Job list */}
                  <div className="flex flex-col h-[calc(100vh-130px)] pb-14 lg:pb-0">
                    <div className="flex-1 min-h-0 overflow-y-auto pr-3 space-y-4 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                      <div className="grid grid-cols-1 gap-4">
                        {paginatedJobs.map((job, index) => {
                          const isMatched = matchedJobs.some((m) => m.id === job.id)
                          const isSelected = selectedJob?.id === job.id
                          return (
                            <article
                              key={job.id}
                              onClick={() => {
                                if (window.innerWidth < 1024) {
                                  setSelectedJobDetail(job)
                                } else {
                                  setSelectedJobId(job.id)
                                }
                              }}
                              className={`animate__animated animate__fadeInUp animate__faster group relative flex flex-col justify-between h-full rounded-2xl border bg-base-100 p-5 shadow-xs transition-all duration-350 cursor-pointer hover:border-base-300 hover:shadow-md hover:scale-[1.005] ${isSelected
                                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                                  : 'border-base-200'
                                }`}
                              style={{ animationDelay: `${index * 80}ms` }}
                            >
                              <div className="flex flex-col h-full">
                                {/* Top Bar of the Card */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`${job.avatarColor} flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs font-extrabold text-sm flex-shrink-0 transition-transform group-hover:scale-105`}>
                                      {job.initial}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                                        {job.title}
                                      </h4>
                                      <p className="text-xs text-base-content/70 font-medium">
                                        {job.company}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getMatchColorBg(job.matchPercent)}`}>
                                      <span className={`h-1.5 w-1.5 rounded-full ${getMatchDotColor(job.matchPercent)}`} />
                                      {job.matchPercent}% match
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        if (isMatched) {
                                          setMatchedJobs((prev) => prev.filter((m) => m.id !== job.id))
                                        } else {
                                          setMatchedJobs((prev) => [...prev, job])
                                        }
                                      }}
                                      className={`rounded-full p-1.5 transition-all hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer ${isMatched
                                          ? 'text-rose-500 fill-rose-500 scale-110'
                                          : 'text-base-content/40 hover:text-rose-500'
                                        }`}
                                      title={isMatched ? "Quitar de matches" : "Guardar en Matches"}
                                    >
                                      <TieIcon className="h-4.5 w-4.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Removed Recommended & Difficulty Tags as requested */}

                                {/* Mid section description */}
                                <p className="text-xs text-base-content/65 line-clamp-2 mb-3 leading-relaxed">
                                  {job.description}
                                </p>

                                {/* Info tags list */}
                                <div className="flex flex-wrap gap-1.5 mb-3.5">
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-base-200 px-2 py-0.5 text-[10px] font-bold text-base-content/80 border border-base-200">
                                    <MapPin className="h-3 w-3 text-base-content/50" />
                                    {job.location}
                                  </span>
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-base-200 px-2 py-0.5 text-[10px] font-bold text-base-content/80 border border-base-200">
                                    <Clock3 className="h-3 w-3 text-base-content/50" />
                                    {job.mode}
                                  </span>
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-base-200 px-2 py-0.5 text-[10px] font-bold text-base-content/80 border border-base-200">
                                    <Briefcase className="h-3 w-3 text-base-content/50" />
                                    {job.contractType}
                                  </span>
                                </div>

                                {/* Skills preview tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {job.skills.slice(0, 3).map((skill) => (
                                    <span key={skill} className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-xl px-2.5 py-1 text-[10px] font-bold">
                                      {skill}
                                    </span>
                                  ))}
                                  {job.skills.length > 3 && (
                                    <span className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-xl px-2.5 py-1 text-[10px] font-bold">
                                      +{job.skills.length - 3}
                                    </span>
                                  )}
                                </div>

                                {/* Footer section (Salary & Buttons) */}
                                <div className="mt-auto pt-3 border-t border-base-200 flex items-center justify-between gap-2">
                                  <div>
                                    <span className="block text-[8px] text-base-content/50 uppercase font-bold tracking-wider leading-none mb-0.5">Sueldo Estimado</span>
                                    <span className="text-sm font-extrabold text-base-content">
                                      S/ {job.salaryMin} - {job.salaryMax}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    {/* Mobile details indicator, hidden on desktop */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedJobDetail(job)
                                      }}
                                      className="lg:hidden inline-flex items-center justify-center gap-1 rounded-lg bg-base-200 hover:bg-base-300 border border-base-300 px-3 py-2 text-[10px] font-bold text-base-content/85 cursor-pointer"
                                    >
                                      Detalles
                                    </button>

                                  </div>
                                </div>
                              </div>
                            </article>
                          )
                        })}
                      </div>

                    </div>

                    {/* Pagination — outside scroll, pinned at bottom of left pane */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 pt-3 border-t border-base-200 bg-base-50/80">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-base-250 bg-base-100 text-base-content/75 transition hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          aria-label="Página anterior"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <span className="text-xs font-bold text-base-content/70">
                          Página <strong className="text-base-content">{currentPage}</strong> de {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-base-250 bg-base-100 text-base-content/75 transition hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          aria-label="Página siguiente"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Pane: Sticky detailed panel */}
                  <div className="sticky top-6 hidden lg:block h-[calc(100vh-130px)]">
                    {displayedJob ? (
                      <div className="border border-base-200 rounded-3xl bg-base-100 p-6 shadow-sm h-full overflow-y-auto overflow-x-hidden flex flex-col [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {/* Animated content wrapper — backInRight on select, backOutRight on deselect */}
                        <div className={`animate__animated animate__faster ${panelAnimClass} flex flex-col flex-1`}>
                        {/* Header details */}
                        <div className="flex items-start justify-between border-b border-base-200 pb-5 mb-5">
                          <div className="flex items-center gap-4">
                            <div className={`${displayedJob.avatarColor} flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xs font-extrabold text-xl flex-shrink-0`}>
                              {displayedJob.initial}
                            </div>
                            <div>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-1.5 border ${selectedJob.status === 'Urgente'
                                  ? 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                                  : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                }`}>
                                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${selectedJob.status === 'Urgente' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                                {selectedJob.status}
                              </span>
                              <h3 className="text-lg font-extrabold text-base-content leading-tight">
                                {displayedJob.title}
                              </h3>
                              <p className="text-xs text-base-content/70 mt-1 flex items-center gap-2">
                                <span className="font-semibold text-base-content/90">{displayedJob.company}</span>
                                <span>•</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${getSourceBadgeStyle(displayedJob.source)}`}>
                                  {displayedJob.source}
                                </span>
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (matchedJobs.some(m => m.id === displayedJob.id)) {
                                setMatchedJobs(prev => prev.filter(m => m.id !== displayedJob.id))
                              } else {
                                setMatchedJobs(prev => [...prev, displayedJob])
                              }
                            }}
                            className={`rounded-full p-2.5 border transition-all cursor-pointer ${matchedJobs.some(m => m.id === displayedJob.id)
                                ? 'bg-rose-500/15 border-rose-500/30 text-rose-500 fill-rose-500'
                                : 'bg-base-200 border-base-300 text-base-content/40 hover:text-rose-500 hover:border-rose-200'
                              }`}
                            title={matchedJobs.some(m => m.id === displayedJob.id) ? "Quitar de matches" : "Guardar en Matches"}
                          >
                            <TieIcon className="h-4.5 w-4.5" />
                          </button>
                        </div>

                        {/* Match Indicator Circle */}
                        <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-success/5 p-4 border border-primary/10 mb-5">
                          <div className="flex items-center gap-4.5 mb-3.5">
                            <div className="relative flex items-center justify-center h-12 w-12 flex-shrink-0">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" className="stroke-base-200" strokeWidth="4.5" fill="transparent" />
                                <circle cx="24" cy="24" r="20" className={getMatchColorStroke(displayedJob.matchPercent)} strokeWidth="4.5" fill="transparent"
                                  strokeDasharray={2 * Math.PI * 20}
                                  strokeDashoffset={2 * Math.PI * 20 * (1 - displayedJob.matchPercent / 100)}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-xs font-black text-base-content">{displayedJob.matchPercent}%</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-base-content flex items-center gap-1">
                                <Sparkles className={`h-3.5 w-3.5 ${getMatchColorText(displayedJob.matchPercent)}`} /> Compatibilidad de Perfil
                              </h4>
                              <p className="text-[10px] text-base-content/60 mt-0.5">
                                Comparación automatizada con las habilidades de tu perfil de egreso.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="bg-base-200/80 p-3 rounded-xl border border-base-250 text-base-content/80">
                              <strong className="text-base-content block mb-0.5 text-[11px]">¿Por qué este match?</strong>
                              <p className="leading-relaxed">{displayedJob.matchFeedback}</p>
                            </div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs">
                          <div className="rounded-xl border border-base-200 bg-base-200/40 p-3 flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-base-content/50 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Ubicación</span>
                              <span className="font-semibold text-base-content">{displayedJob.location}</span>
                            </div>
                          </div>
                          <div className="rounded-xl border border-base-200 bg-base-200/40 p-3 flex items-start gap-2">
                            <Clock3 className="h-4 w-4 text-base-content/50 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Modalidad</span>
                              <span className="font-semibold text-base-content">{displayedJob.mode}</span>
                            </div>
                          </div>
                          <div className="rounded-xl border border-base-200 bg-base-200/40 p-3 flex items-start gap-2">
                            <Briefcase className="h-4 w-4 text-base-content/50 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Contrato</span>
                              <span className="font-semibold text-base-content">{displayedJob.contractType}</span>
                            </div>
                          </div>
                          <div className="rounded-xl border border-base-200 bg-base-200/40 p-3 flex items-start gap-2">
                            <DollarSign className="h-4 w-4 text-base-content/50 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Sueldo Estimado</span>
                              <span className="font-semibold text-base-content">S/ {displayedJob.salaryMin} - {displayedJob.salaryMax}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content parts */}
                        <div className="space-y-5 pr-1">
                          <div>
                            <h4 className="text-xs font-bold text-base-content uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 text-base-content/50" /> Sobre el puesto
                            </h4>
                            <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                              {displayedJob.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-base-content uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-base-content/50" /> Funciones Principales
                            </h4>
                            <ul className="space-y-1.5">
                              {displayedJob.functions.map((fn, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-base-content/85">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span className="leading-relaxed">{fn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-base-content uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <Sparkles className="h-4 w-4 text-base-content/50" /> Habilidades Requeridas
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {displayedJob.skills.map((skill, idx) => (
                                <span key={idx} className="rounded-lg bg-base-200 border border-base-300 px-2.5 py-1.5 text-xs font-medium text-base-content/80">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className="border-t border-base-200 pt-4 mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              if (matchedJobs.some(m => m.id === displayedJob.id)) {
                                setMatchedJobs(prev => prev.filter(m => m.id !== displayedJob.id))
                              } else {
                                setMatchedJobs(prev => [...prev, displayedJob])
                              }
                            }}
                            className={`flex-1 rounded-2xl py-3 text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${matchedJobs.some(m => m.id === displayedJob.id)
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-450'
                                : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'
                              }`}
                          >
                            <TieIcon className={`h-4 w-4 ${matchedJobs.some(m => m.id === displayedJob.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                            {matchedJobs.some(m => m.id === displayedJob.id) ? 'Quitar Match' : 'Hacer Match'}
                          </button>

                          <button
                            type="button"
                            onClick={() => alert(`Redirigiendo a postular en ${displayedJob.source}...`)}
                            className="flex-1 rounded-2xl bg-primary hover:bg-primary/90 py-3 text-xs font-bold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                          >
                            Postular ahora
                          </button>
                        </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-dashed border-base-300 rounded-3xl bg-base-200/50 p-8 text-center h-[350px] flex flex-col items-center justify-center shadow-2xs">
                        <Briefcase className="h-10 w-10 text-base-content/30 mb-3" />
                        <h4 className="font-bold text-base-content/80">Ningún empleo seleccionado</h4>
                        <p className="text-xs text-base-content/60 mt-1 max-w-[200px]">
                          Haz clic en cualquier oferta de la lista para ver su análisis de compatibilidad y especificaciones.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Actions on Mobile */}
          {!isTopFiltersVisible && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center bg-base-100 border border-base-300 text-base-content backdrop-blur-md px-6 py-3 rounded-full shadow-lg xl:hidden animate-fadeIn">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 text-base-content text-xs font-bold hover:text-primary transition cursor-pointer"
              >
                <Filter className="h-4 w-4 text-base-content/40" />
                Filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Tinder-style Quick Search Modal */}
      {quickOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8 backdrop-blur-xs"
          onClick={() => setQuickOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-base-200 p-4 shadow-2xl border border-base-300 animate-fadeIn"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-3 py-1 text-xs font-bold text-base-content/80 shadow-xs border border-base-200">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Búsqueda rápida
              </div>
              <button
                type="button"
                onClick={() => setQuickOpen(false)}
                className="rounded-full p-2 text-base-content/40 hover:bg-base-100 hover:text-base-content cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {currentQuickJob ? (
              <div className="rounded-2xl bg-base-100 p-5 shadow-xs border border-base-200">
                <div className="mb-4 flex items-start gap-4">
                  <div className={`${currentQuickJob.avatarColor} flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-xs font-extrabold text-lg shrink-0`}>
                    {currentQuickJob.initial}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-black text-base-content leading-tight">
                        {currentQuickJob.title}
                      </h3>
                      <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {currentQuickJob.matchPercent}% match
                      </span>
                    </div>
                    <p className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-base-content/75">
                      <span className="truncate">{currentQuickJob.company}</span>
                      <span className={`shrink-0 text-[9px] px-2 py-0.5 rounded-full font-bold border ${getSourceBadgeStyle(currentQuickJob.source)}`}>
                        {currentQuickJob.source}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {currentQuickJob.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-4 max-h-[35vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-base-200 border border-base-300 px-3 py-2 text-xs text-base-content/80">
                      <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Modalidad</span>
                      <span className="font-semibold">{currentQuickJob.mode}</span>
                    </div>
                    <div className="rounded-xl bg-base-200 border border-base-300 px-3 py-2 text-xs text-base-content/80">
                      <span className="block text-[9px] text-base-content/50 font-bold uppercase tracking-wider">Ubicación</span>
                      <span className="font-semibold">{currentQuickJob.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-base-content mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-base-content/40" /> Sobre el puesto
                    </h4>
                    <p className="text-xs text-base-content/80 leading-relaxed">
                      {currentQuickJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-base-content mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-base-content/40" /> Funciones principales
                    </h4>
                    <ul className="space-y-1.5">
                      {currentQuickJob.functions.map((fn, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-base-content/80 leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                          <span>{fn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-base-content mb-2 flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-emerald-500" /> Análisis de Match
                    </h4>
                    <div className="rounded-xl bg-success/5 p-3 text-xs text-success-content border border-success/15">
                      <p className="leading-relaxed"><strong>¿Por qué?</strong> {currentQuickJob.matchFeedback}</p>
                      <p className="border-t border-success-content/20 pt-2 mt-2 text-warning-content leading-relaxed"><strong>Para mejorar:</strong> {currentQuickJob.matchMissing}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-base-content mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-base-content/40" /> Habilidades
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuickJob.skills.map((skill, idx) => (
                        <span key={idx} className="rounded-lg bg-base-200 px-2.5 py-1 text-[10px] font-semibold text-base-content/85">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={rejectCurrent}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-rose-400 bg-base-100 text-rose-500 hover:scale-105 transition-all shadow-xs cursor-pointer"
                    aria-label="Rechazar empleo"
                  >
                    <X className="h-6 w-6 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={matchCurrent}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400 bg-base-100 text-emerald-500 hover:scale-105 transition-all shadow-xs cursor-pointer"
                    aria-label="Hacer match"
                  >
                    <Check className="h-6 w-6 stroke-[3]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-base-100 p-8 text-center border border-base-200">
                <p className="text-base font-bold text-base-content">Búsqueda rápida completada</p>
                <p className="mt-1.5 text-xs text-base-content/60 leading-relaxed">No hay más vacantes que coincidan con tu criterio actual. Ajusta los filtros para recargar.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Job Details Modal (Popup) */}
      {selectedJobDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-base-content/40 p-4 backdrop-blur-xs"
          onClick={() => setSelectedJobDetail(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-base-100 shadow-2xl border border-base-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-base-200 bg-base-100/90 px-6 py-4.5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={`${selectedJobDetail.avatarColor} flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-xs font-bold text-sm flex-shrink-0`}>
                  {selectedJobDetail.initial}
                </div>
                <div>
                  <h3 className="font-extrabold text-base-content flex flex-wrap items-center gap-2 text-sm leading-snug">
                    {selectedJobDetail.title}
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${getSourceBadgeStyle(selectedJobDetail.source)}`}>
                      {selectedJobDetail.source}
                    </span>
                  </h3>
                  <p className="text-[11px] text-base-content/60">{selectedJobDetail.company}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobDetail(null)}
                className="rounded-full p-2 text-base-content/40 hover:bg-base-200 hover:text-base-content cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <section>
                <h4 className="flex items-center gap-1.5 font-bold text-base-content uppercase tracking-wider text-xs mb-2">
                  <Briefcase className="h-4 w-4 text-base-content/50" /> Sobre el puesto
                </h4>
                <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed">
                  {selectedJobDetail.description}
                </p>
              </section>

              {/* Functions */}
              <section>
                <h4 className="flex items-center gap-1.5 font-bold text-base-content uppercase tracking-wider text-xs mb-2.5">
                  <CheckCircle2 className="h-4 w-4 text-base-content/50" /> Funciones principales
                </h4>
                <ul className="space-y-2">
                  {selectedJobDetail.functions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-base-content/85">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-relaxed">{fn}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Match overview */}
              <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-success/5 p-4.5 border border-primary/10">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-bold text-base-content flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-emerald-500" /> Compatibilidad de Perfil: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{selectedJobDetail.matchPercent}% match</span>
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-base-200/85 p-3 rounded-xl border border-base-250 text-base-content/80">
                    <strong className="text-base-content block mb-0.5">¿Por qué?</strong>
                    <p className="leading-relaxed">{selectedJobDetail.matchFeedback}</p>
                  </div>
                  <div className="bg-warning/5 p-3 rounded-xl border border-warning/15 text-warning-content">
                    <strong className="text-base-content block mb-0.5">¿Qué falta?</strong>
                    <p className="leading-relaxed">{selectedJobDetail.matchMissing}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <section>
                <h4 className="flex items-center gap-1.5 font-bold text-base-content uppercase tracking-wider text-xs mb-2.5">
                  <Sparkles className="h-4 w-4 text-base-content/50" /> Habilidades requeridas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobDetail.skills.map((skill, idx) => (
                    <span key={idx} className="rounded-lg bg-base-200 border border-base-300 px-3 py-1.5 text-xs font-semibold text-base-content/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Specs info */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-base-200 p-4 text-xs border border-base-300">
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Modalidad</span>
                  <span className="font-bold text-base-content">{selectedJobDetail.mode}</span>
                </div>
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Ubicación</span>
                  <span className="font-bold text-base-content">{selectedJobDetail.location}</span>
                </div>
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Nivel</span>
                  <span className="font-bold text-base-content">{selectedJobDetail.level}</span>
                </div>
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Salario</span>
                  <span className="font-bold text-base-content">S/ {selectedJobDetail.salaryMin} - {selectedJobDetail.salaryMax}</span>
                </div>
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Contrato</span>
                  <span className="font-bold text-base-content">{selectedJobDetail.contractType}</span>
                </div>
                <div>
                  <span className="block text-base-content/50 font-bold uppercase tracking-wider text-[9px] mb-0.5">Publicado</span>
                  <span className="font-bold text-base-content">{selectedJobDetail.postedDate}</span>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-base-200 bg-base-100/95 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  if (matchedJobs.some((m) => m.id === selectedJobDetail.id)) {
                    setMatchedJobs((prev) => prev.filter((m) => m.id !== selectedJobDetail.id))
                  } else {
                    setMatchedJobs((prev) => [...prev, selectedJobDetail])
                  }
                  setSelectedJobDetail(null)
                }}
                className={`flex-1 rounded-xl py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 border cursor-pointer ${matchedJobs.some(m => m.id === selectedJobDetail.id)
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-600'
                    : 'bg-base-200 border-base-300 text-base-content/80 hover:bg-base-300'
                  }`}
              >
                <TieIcon className={`h-4.5 w-4.5 ${matchedJobs.some(m => m.id === selectedJobDetail.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                {matchedJobs.some(m => m.id === selectedJobDetail.id) ? 'Quitar Match' : 'Hacer Match'}
              </button>
              <button
                onClick={() => {
                  alert(`Redirigiendo a postular en ${selectedJobDetail.source}...`)
                }}
                className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90 cursor-pointer"
              >
                Postular
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Removed Job Bubble */}
      {lastRemovedJob && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
          <div className="flex items-center gap-4 rounded-2xl bg-base-800 text-white px-5 py-3 shadow-2xl border border-white/10 backdrop-blur-md">
            <span className="text-sm font-medium">Anuncio eliminado</span>
            <button
              onClick={() => {
                setRemovedJobs(prev => prev.filter(id => id !== lastRemovedJob))
                setLastRemovedJob(null)
                if (removedUndoTimer) clearTimeout(removedUndoTimer)
              }}
              className="text-sm font-bold text-primary hover:text-primary/80 transition cursor-pointer"
            >
              Deshacer
            </button>
            <button onClick={() => setLastRemovedJob(null)} className="p-1 hover:bg-white/10 rounded-full transition cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </PageShell>
  )
}
