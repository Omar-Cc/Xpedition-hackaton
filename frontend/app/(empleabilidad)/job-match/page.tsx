"use client"

import { useEffect, useMemo, useState } from 'react'
import PageShell from '@/src/components/layout/PageShell'
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
  Heart,
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

type JobItem = {
  id: string
  initial: string
  avatarColor: string
  matchPercent: number
  title: string
  company: string
  status: string
  statusColor: 'success' | 'warning' | 'error'
  location: string
  mode: 'Full Time' | 'Part Time' | 'Remoto' | 'Híbrido' | 'Presencial'
  salaryMin: number
  salaryMax: number
  level: 'Practicante' | 'Pasantía' | 'Junior' | 'Semi Senior' | 'Senior'
  ageMin: number
  ageMax: number
  tags: string[]
  highlight: string
  requirement: string
  description: string
  functions: string[]
  skills: string[]
  matchFeedback: string
  matchMissing: string
  source: string
}

type AppliedFilters = {
  query: string
  location: string
  modes: string[]
  salaryMin: string
  salaryMax: string
  levels: string[]
  ageMin: string
  ageMax: string
}

const workModes = ['Full Time', 'Part Time', 'Remoto', 'Híbrido', 'Presencial']
const levels = ['Practicante', 'Pasantía', 'Junior', 'Semi Senior', 'Senior']

const jobCatalog: JobItem[] = [
  {
    id: '1',
    initial: 'S',
    avatarColor: 'bg-red-500',
    matchPercent: 97,
    title: 'Junior Data Analyst',
    company: 'Scotiabank Perú',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Lima, Perú',
    mode: 'Remoto',
    salaryMin: 1800,
    salaryMax: 2600,
    level: 'Junior',
    ageMin: 18,
    ageMax: 28,
    tags: ['Python', 'Excel', 'SQL'],
    highlight: 'Compatible con tu horario',
    requirement: 'Desde 8vo semestre',
    description: 'Únete a nuestro equipo de analítica para transformar datos financieros en decisiones estratégicas de impacto.',
    functions: ['Análisis exploratorio de bases de datos relacionales.', 'Generación de dashboards gerenciales.', 'Automatización de reportes diarios.'],
    skills: ['Python', 'SQL', 'Power BI', 'Excel Avanzado'],
    matchFeedback: 'Tienes un gran fit porque dominas Python y SQL, que son el core tecnológico de este rol.',
    matchMissing: 'Aumentarías al 100% si tuvieras proyectos demostrables en Power BI.',
    source: 'LinkedIn',
  },
  {
    id: '2',
    initial: 'B',
    avatarColor: 'bg-blue-600',
    matchPercent: 89,
    title: 'Business Analyst',
    company: 'BCP',
    status: 'Cierra en 3 días',
    statusColor: 'warning',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 2200,
    salaryMax: 3200,
    level: 'Semi Senior',
    ageMin: 20,
    ageMax: 32,
    tags: ['Data', 'KPI', 'Excel'],
    highlight: 'Turno compatible',
    requirement: 'Experiencia en métricas',
    description: 'Buscamos un perfil mixto entre tecnología y negocios para optimizar nuestros KPIs comerciales.',
    functions: ['Levantamiento de requerimientos.', 'Seguimiento de KPIs de ventas.', 'Presentaciones a stakeholders.'],
    skills: ['Excel Avanzado', 'Comunicación Efectiva', 'Metodologías Ágiles'],
    matchFeedback: 'Tu experiencia previa en métricas de ventas se alinea perfectamente con las necesidades del área.',
    matchMissing: 'Falta experiencia documentada trabajando con equipos bajo metodologías ágiles (Scrum).',
    source: 'Computrabajo',
  },
  {
    id: '3',
    initial: 'I',
    avatarColor: 'bg-yellow-500',
    matchPercent: 84,
    title: 'Data Science Intern',
    company: 'Interbank',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Surco, Lima',
    mode: 'Presencial',
    salaryMin: 1200,
    salaryMax: 1700,
    level: 'Pasantía',
    ageMin: 18,
    ageMax: 24,
    tags: ['Python', 'Machine Learning', 'Numpy'],
    highlight: 'Buen fit para prácticas',
    requirement: 'Carreras afines',
    description: 'Inicia tu carrera en Data Science aplicando modelos de Machine Learning a problemas reales de banca.',
    functions: ['Limpieza y estructuración de datos.', 'Apoyo en entrenamiento de modelos predictivos.', 'Documentación de experimentos.'],
    skills: ['Python', 'Scikit-Learn', 'Pandas', 'Estadística Básica'],
    matchFeedback: 'Tu portafolio universitario muestra un buen manejo de Pandas y limpieza de datos.',
    matchMissing: 'Podrías mejorar tu perfil si profundizas en modelos estadísticos y Scikit-Learn.',
    source: 'Indeed',
  },
  {
    id: '4',
    initial: 'R',
    avatarColor: 'bg-rose-500',
    matchPercent: 81,
    title: 'Analytics Intern',
    company: 'Rimac',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Miraflores, Lima',
    mode: 'Full Time',
    salaryMin: 1300,
    salaryMax: 1800,
    level: 'Practicante',
    ageMin: 18,
    ageMax: 23,
    tags: ['Dashboard', 'Excel', 'Power BI'],
    highlight: 'Alta compatibilidad',
    requirement: 'Prácticas preprofesionales',
    description: 'Aprende y apoya en la visualización de datos de seguros de vida y salud.',
    functions: ['Actualización de tableros en Power BI.', 'Manejo de bases en Excel.', 'Extracción de datos básicos.'],
    skills: ['Power BI', 'Excel', 'Trabajo en equipo'],
    matchFeedback: 'Tu nivel de Excel es ideal para lo que se requiere en el día a día.',
    matchMissing: 'No has mencionado conocimientos de bases de datos o extracción (SQL), lo cual sumaría mucho.',
    source: 'LinkedIn',
  },
  {
    id: '5',
    initial: 'A',
    avatarColor: 'bg-orange-500',
    matchPercent: 54,
    title: 'Data Analyst Jr.',
    company: 'Alicorp',
    status: 'Cierra en 1 día',
    statusColor: 'error',
    location: 'Ate, Lima',
    mode: 'Presencial',
    salaryMin: 2000,
    salaryMax: 2800,
    level: 'Junior',
    ageMin: 20,
    ageMax: 29,
    tags: ['SQL', 'Reportes', 'Excel'],
    highlight: 'Lista para aplicar',
    requirement: '1 año de experiencia',
    description: 'Rol enfocado en la generación de reportes operativos y análisis de cadena de suministro.',
    functions: ['Generación de reportes de inventario.', 'Optimización de consultas SQL.', 'Análisis de mermas.'],
    skills: ['SQL Intermedio', 'Excel Avanzado', 'Análisis Lógico'],
    matchFeedback: 'Cumples con los requisitos técnicos en SQL y herramientas ofimáticas.',
    matchMissing: 'Tu perfil está un poco bajo en los años de experiencia en sector consumo masivo.',
    source: 'Bumeran',
  },
  {
    id: '6',
    initial: 'G',
    avatarColor: 'bg-emerald-500',
    matchPercent: 45,
    title: 'Frontend Developer',
    company: 'Gloria',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Lima, Perú',
    mode: 'Remoto',
    salaryMin: 2600,
    salaryMax: 3800,
    level: 'Semi Senior',
    ageMin: 22,
    ageMax: 33,
    tags: ['React', 'TypeScript', 'UI'],
    highlight: 'Buen encaje técnico',
    requirement: 'Experiencia en React',
    description: 'Desarrolla interfaces de usuario modernas para las aplicaciones internas de la compañía.',
    functions: ['Creación de componentes UI en React.', 'Integración con APIs REST.', 'Mantenimiento de sistemas legacy.'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    matchFeedback: 'Tienes los conocimientos base de React y desarrollo web.',
    matchMissing: 'Para este nivel se busca más experiencia arquitectando con TypeScript y estado global.',
    source: 'LinkedIn',
  },
  {
    id: '7',
    initial: 'E',
    avatarColor: 'bg-violet-500',
    matchPercent: 92,
    title: 'Marketing Trainee',
    company: 'Entel',
    status: 'Urgente',
    statusColor: 'error',
    location: 'San Isidro, Lima',
    mode: 'Híbrido',
    salaryMin: 1500,
    salaryMax: 2000,
    level: 'Pasantía',
    ageMin: 20,
    ageMax: 26,
    tags: ['Marketing Digital', 'RRSS', 'Analytics'],
    highlight: 'Ideal para recién egresados',
    requirement: 'Inglés intermedio',
    description: 'Buscamos talento joven para apoyar en campañas digitales y análisis de conversión de usuarios.',
    functions: ['Monitoreo de campañas en RRSS.', 'Reportes de pauta digital.', 'Apoyo en creación de contenido.'],
    skills: ['Google Analytics', 'Facebook Ads', 'Creatividad'],
    matchFeedback: 'Tu portafolio de manejo de redes encaja muy bien con el rol de trainee.',
    matchMissing: 'Sería ideal contar con alguna certificación en Google Ads.',
    source: 'Bumeran',
  },
  {
    id: '8',
    initial: 'N',
    avatarColor: 'bg-indigo-500',
    matchPercent: 88,
    title: 'Backend Developer',
    company: 'Niubiz',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Lima, Perú',
    mode: 'Remoto',
    salaryMin: 3500,
    salaryMax: 5000,
    level: 'Senior',
    ageMin: 25,
    ageMax: 40,
    tags: ['Node.js', 'AWS', 'API'],
    highlight: 'Gran oportunidad de crecimiento',
    requirement: '3+ años de experiencia',
    description: 'Desarrollo de servicios transaccionales de alto rendimiento y baja latencia.',
    functions: ['Diseño de arquitecturas cloud.', 'Mantenimiento de microservicios en Node.', 'Optimización de base de datos.'],
    skills: ['Node.js', 'AWS Lambda', 'PostgreSQL', 'Docker'],
    matchFeedback: 'Tienes experiencia en Node.js y despliegues en la nube, justo lo que se necesita.',
    matchMissing: 'Falta un poco de exposición demostrable a arquitecturas serverless complejas.',
    source: 'LinkedIn',
  },
  {
    id: '9',
    initial: 'P',
    avatarColor: 'bg-sky-500',
    matchPercent: 62,
    title: 'Product Owner Junior',
    company: 'Pacífico Seguros',
    status: 'Cierra pronto',
    statusColor: 'warning',
    location: 'San Isidro, Lima',
    mode: 'Presencial',
    salaryMin: 3000,
    salaryMax: 4500,
    level: 'Junior',
    ageMin: 22,
    ageMax: 30,
    tags: ['Scrum', 'Producto', 'Agile'],
    highlight: 'Rol de liderazgo',
    requirement: 'Certificación Scrum',
    description: 'Lidera la célula de transformación digital para productos de salud.',
    functions: ['Gestión del Product Backlog.', 'Definición de historias de usuario.', 'Alineación con stakeholders.'],
    skills: ['Scrum', 'Comunicación asertiva', 'Jira'],
    matchFeedback: 'Tu certificación de Scrum Master valida tus conocimientos metodológicos.',
    matchMissing: 'No tienes experiencia directa liderando la definición de un producto digital desde cero.',
    source: 'Computrabajo',
  },
  {
    id: '10',
    initial: 'B',
    avatarColor: 'bg-teal-500',
    matchPercent: 38,
    title: 'UX/UI Designer',
    company: 'BBVA',
    status: 'Postulación abierta',
    statusColor: 'success',
    location: 'Lima, Perú',
    mode: 'Híbrido',
    salaryMin: 2500,
    salaryMax: 4000,
    level: 'Semi Senior',
    ageMin: 23,
    ageMax: 35,
    tags: ['Figma', 'Prototipado', 'UX'],
    highlight: 'Enfoque en accesibilidad',
    requirement: 'Portafolio de productos reales',
    description: 'Diseño de experiencias centradas en el usuario para nuestra nueva app móvil.',
    functions: ['Creación de wireframes y prototipos.', 'User testing.', 'Mantenimiento del Design System.'],
    skills: ['Figma', 'UI Design', 'UX Research', 'Design Systems'],
    matchFeedback: 'Tus diseños en Figma son limpios y sigues buenas prácticas de UI.',
    matchMissing: 'Falta más profundidad en la etapa de investigación de usuarios (UX Research).',
    source: 'Indeed',
  },
]

const defaultFilters: AppliedFilters = {
  query: '',
  location: '',
  modes: [],
  salaryMin: '',
  salaryMax: '',
  levels: [],
  ageMin: '',
  ageMax: '',
}

function toggleItem(items: string[], value: string) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

function JobInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  )
}

export default function JobMatchPage() {
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(defaultFilters)
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickIndex, setQuickIndex] = useState(0)
  const [matchedJobs, setMatchedJobs] = useState<JobItem[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobItem | null>(null)
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null)
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const filteredJobs = useMemo(() => {
    const query = appliedFilters.query.trim().toLowerCase()
    const location = appliedFilters.location.trim().toLowerCase()
    const salaryMin = appliedFilters.salaryMin ? Number(appliedFilters.salaryMin) : null
    const salaryMax = appliedFilters.salaryMax ? Number(appliedFilters.salaryMax) : null
    const ageMin = appliedFilters.ageMin ? Number(appliedFilters.ageMin) : null
    const ageMax = appliedFilters.ageMax ? Number(appliedFilters.ageMax) : null

    return jobCatalog.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchesLocation = !location || job.location.toLowerCase().includes(location)
      const matchesMode = appliedFilters.modes.length === 0 || appliedFilters.modes.includes(job.mode)
      const matchesLevel = appliedFilters.levels.length === 0 || appliedFilters.levels.includes(job.level)
      const matchesSalary =
        (salaryMin === null || job.salaryMax >= salaryMin) &&
        (salaryMax === null || job.salaryMin <= salaryMax)
      const matchesAge =
        (ageMin === null || job.ageMax >= ageMin) &&
        (ageMax === null || job.ageMin <= ageMax)

      return matchesQuery && matchesLocation && matchesMode && matchesLevel && matchesSalary && matchesAge
    }).sort((a, b) => b.matchPercent - a.matchPercent)
  }, [appliedFilters])

  const currentQuickJob = filteredJobs[quickIndex] ?? null
  const selectedJobs = useMemo(() => matchedJobs, [matchedJobs])

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredJobs.slice(start, start + itemsPerPage)
  }, [filteredJobs, currentPage, itemsPerPage])

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
    if (quickIndex >= filteredJobs.length) {
      setQuickIndex(0)
    }
  }, [filteredJobs.length, quickIndex])

  function applyFilters() {
    setAppliedFilters(draftFilters)
    setFiltersOpen(false)
  }

  function clearFilters() {
    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
    setQuickIndex(0)
  }

  function openQuickSearch() {
    setAppliedFilters(draftFilters)
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

  return (
    <PageShell>
      <div className="flex-1 overflow-y-auto">
        <section className="max-w-360 mx-auto px-6 pt-6 pb-8">
        <div className="rounded-3xl bg-linear-to-r from-indigo-50 via-pink-50 to-yellow-50 border border-white/70 shadow-sm p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                🏆 BEST JOBS PLACE
              </span>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
                Encuentra empleos que sí encajen contigo
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Filtra por ubicación, modalidad, sueldo, nivel y edad. También puedes abrir la búsqueda rápida
                tipo Tinder para guardar, rechazar o hacer match con un clic.
              </p>

              <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
                <label className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    aria-label="Puesto o empresa"
                    placeholder="Puesto, empresa o palabra clave"
                    value={draftFilters.query}
                    onChange={(e) => setDraftFilters({ ...draftFilters, query: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    aria-label="Ubicación"
                    placeholder="Ubicación"
                    value={draftFilters.location}
                    onChange={(e) => setDraftFilters({ ...draftFilters, location: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="inline-flex h-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700"
                  >
                    Buscar Ahora
                  </button>
                  <button
                    type="button"
                    onClick={openQuickSearch}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 lg:hidden"
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    Búsqueda rápida
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500">Búsquedas populares:</span>
                {['Data', 'Developer', 'Ingeniero', 'Senior'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDraftFilters({ ...draftFilters, query: item })}
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-6 pb-12">
        {showDisclaimer && (
          <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 flex items-start gap-4 shadow-sm relative animate-fadeIn">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
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
              className="absolute top-4 right-4 text-amber-400 hover:bg-amber-200 hover:text-amber-600 p-1.5 rounded-full transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_340px] gap-6 items-start">
          {/* ── Filtros: Sidebar en XL, Modal en Móvil ── */}
          <aside className={`
            ${filtersOpen ? 'fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-900/45 sm:p-4 backdrop-blur-sm xl:static xl:inset-auto xl:z-auto xl:flex xl:items-start xl:justify-start xl:bg-transparent xl:p-0 xl:backdrop-blur-none' : 'hidden xl:block xl:order-1'}
          `}>
            <div className={`w-full rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl xl:max-w-none xl:rounded-3xl xl:border xl:border-slate-200 xl:shadow-sm ${filtersOpen ? 'max-h-[85vh] overflow-y-auto animate-slideUp sm:animate-none' : ''}`}>
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/90 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Filter className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Filtros</h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-full p-2 text-slate-400 xl:hidden hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 px-6 py-6">
                <section className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">Ubicación</h3>
                  </div>
                  <input
                    placeholder="Lima, Perú"
                    value={draftFilters.location}
                    onChange={(e) => setDraftFilters({ ...draftFilters, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </section>

                <section className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">Modalidad</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {workModes.map((mode) => {
                      const selected = draftFilters.modes.includes(mode)
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDraftFilters({ ...draftFilters, modes: toggleItem(draftFilters.modes, mode) })}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                            selected ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {mode}
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">Rango salarial</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min (S/)"
                      value={draftFilters.salaryMin}
                      onChange={(e) => setDraftFilters({ ...draftFilters, salaryMin: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                    <input
                      type="number"
                      placeholder="Max (S/)"
                      value={draftFilters.salaryMax}
                      onChange={(e) => setDraftFilters({ ...draftFilters, salaryMax: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </section>

                <section className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-900">Nivel</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {levels.map((level) => {
                      const selected = draftFilters.levels.includes(level)
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setDraftFilters({ ...draftFilters, levels: toggleItem(draftFilters.levels, level) })}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                            selected ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {level}
                        </button>
                      )
                    })}
                  </div>
                </section>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <Check className="h-4 w-4" />
                    Aplicar filtros
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Floating Filter Button for Mobile */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="fixed bottom-[100px] right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-110 active:scale-95 xl:hidden"
            aria-label="Filtros"
          >
            <Filter className="h-6 w-6" />
          </button>
          {/* ── Cartas de Trabajo: Centro en Desktop, Abajo en Móvil ── */}
          <section className="order-2 xl:order-2 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Resultados</h2>
                <p className="text-sm text-slate-500">
                  Hemos encontrado <span className="font-semibold text-slate-700">{filteredJobs.length} empleos</span>{' '}
                  para ti
                </p>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-semibold text-slate-900">No encontramos resultados</p>
                <p className="mt-2 text-sm text-slate-500">Prueba limpiar filtros o cambiar ubicación, nivel o modalidad.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
                  {paginatedJobs.map((job, index) => (
                    <article
                      key={job.id}
                      className="group h-full rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      <div className="animate-cardIn flex h-full flex-col p-4 md:p-6">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`${job.avatarColor} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                              <span className="text-lg font-bold">{job.initial}</span>
                            </div>
                            <div>
                              <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                                Urgente
                              </span>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-600">
                            {job.matchPercent}% match
                          </span>
                        </div>

                        <h3 className="mb-2 text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                          {job.title}
                        </h3>
                        <p className="mb-4 flex items-center gap-2 text-base text-slate-500">
                          {job.company}
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium border border-slate-200">
                            {job.source}
                          </span>
                        </p>

                        <div className="space-y-3 text-sm text-slate-500">
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1">{job.mode}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1">{job.level}</span>
                          </div>
                        </div>

                        <div className="mt-3 hidden md:flex flex-wrap gap-2">
                          {job.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="badge badge-soft badge-neutral px-2.5 py-1.5 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedJobDetail(job)}
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50/50 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                          <Info className="h-4 w-4" />
                          Ver detalles del puesto
                        </button>

                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="text-base font-semibold text-red-500">
                            S/ {job.salaryMin} - {job.salaryMax}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400 hidden sm:inline">{job.status}</span>
                            {matchedJobs.some((m) => m.id === job.id) ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Match
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (!matchedJobs.some((m) => m.id === job.id)) {
                                    setMatchedJobs((prev) => [...prev, job])
                                  }
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100 hover:scale-105 active:scale-95"
                                title="Hacer match"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Match</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Página anterior"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <span className="text-sm font-medium text-slate-600">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Página siguiente"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* ── Resumen de matches: Arriba en móvil, lateral derecho en desktop ── */}
          <aside className="order-1 xl:order-3 xl:sticky xl:top-6 xl:self-start rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Heart className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Mis Matches</h2>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {matchedJobs.length}
                </span>
              </div>
            </div>

            <div className="px-4 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {selectedJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                  <Heart className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                  <p className="font-semibold text-sm text-slate-700">Sin matches aún</p>
                  <p className="mt-1 text-xs text-slate-500">Usa los botones de cada empleo para agregar.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedJobs.map((job) => {
                    return (
                      <article
                        key={`summary-${job.id}`}
                        className="group/item rounded-2xl border p-3 transition-all duration-200 hover:shadow-md border-emerald-200 bg-emerald-50/60"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`${job.avatarColor} flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white`}>
                            <span className="text-sm font-bold">{job.initial}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{job.title}</p>
                            <p className="text-xs text-slate-500 truncate">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              {job.matchPercent}%
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setMatchedJobs((prev) => prev.filter((m) => m.id !== job.id))
                              }}
                              className="rounded-full p-1 text-slate-400 opacity-0 group-hover/item:opacity-100 transition hover:bg-rose-50 hover:text-rose-500"
                              title="Quitar"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                          <div className="mt-2 pt-2 border-t border-emerald-200/50">
                            <button 
                              onClick={() => setExpandedFeedbackId(expandedFeedbackId === job.id ? null : job.id)}
                              className="flex w-full items-center justify-between text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                              <span className="flex items-center gap-1">
                                <Target className="h-3.5 w-3.5" /> Análisis de Match
                              </span>
                              {expandedFeedbackId === job.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            </button>
                            
                            {expandedFeedbackId === job.id && (
                              <div className="mt-2 space-y-2 text-[11px] leading-relaxed">
                                <div className="bg-white/60 p-2 rounded-lg text-emerald-800">
                                  <strong className="block mb-0.5 text-emerald-900">¿Por qué este match?</strong>
                                  {job.matchFeedback}
                                </div>
                                <div className="bg-amber-50/80 p-2 rounded-lg text-amber-800 border border-amber-100/50">
                                  <strong className="block mb-0.5 text-amber-900">¿Qué te falta?</strong>
                                  {job.matchMissing}
                                </div>
                              </div>
                            )}
                          </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {quickOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-8 backdrop-blur-sm"
          onClick={() => setQuickOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-4xl bg-slate-100 px-4 py-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                Búsqueda rápida
              </div>
              <button
                type="button"
                onClick={() => setQuickOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {currentQuickJob ? (
              <div className="rounded-4xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`${currentQuickJob.avatarColor} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-sm`}>
                    <span className="text-xl font-bold">{currentQuickJob.initial}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-600">
                    {currentQuickJob.matchPercent}% match
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                  {currentQuickJob.title}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-base text-slate-500">
                  {currentQuickJob.company}
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium border border-slate-200">
                    {currentQuickJob.source}
                  </span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {currentQuickJob.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-pink-50 px-3 py-1.5 text-sm text-pink-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-4 max-h-[35vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">
                      <span className="block text-[10px] text-slate-400">Modalidad</span>
                      <span className="font-medium">{currentQuickJob.mode}</span>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">
                      <span className="block text-[10px] text-slate-400">Ubicación</span>
                      <span className="font-medium">{currentQuickJob.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" /> Sobre el puesto
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentQuickJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" /> Funciones principales
                    </h4>
                    <ul className="space-y-1.5">
                      {currentQuickJob.functions.map((fn, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{fn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                      <Target className="h-3.5 w-3.5 text-emerald-500" /> Análisis de Match
                    </h4>
                    <div className="rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-800 border border-emerald-100">
                      <p className="mb-2 leading-relaxed">{currentQuickJob.matchFeedback}</p>
                      <p className="border-t border-emerald-200/50 pt-2 text-amber-700 leading-relaxed"><strong>Para mejorar:</strong> {currentQuickJob.matchMissing}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Habilidades
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuickJob.skills.map((skill, idx) => (
                        <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700">
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
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-400 bg-white text-rose-500 transition hover:scale-105"
                    aria-label="Rechazar empleo"
                  >
                    <X className="h-7 w-7" />
                  </button>

                  <button
                    type="button"
                    onClick={matchCurrent}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-white text-emerald-500 transition hover:scale-105"
                    aria-label="Hacer match"
                  >
                    <CheckCircle2 className="h-7 w-7" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-4xl bg-white p-8 text-center">
                <p className="text-lg font-semibold text-slate-900">No hay resultados para mostrar</p>
                <p className="mt-2 text-sm text-slate-500">Ajusta los filtros y vuelve a abrir la búsqueda rápida.</p>
              </div>
            )}

            <p className="mt-4 text-center text-sm text-slate-500">← saltar · ✓ hacer match →</p>
            <p className="mt-2 text-center text-xs text-slate-400">
              {filteredJobs.length === 0 ? '0 empleos' : `${quickIndex + 1} / ${filteredJobs.length}`}
            </p>
          </div>
        </div>
      )}

      {selectedJobDetail && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedJobDetail(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={`${selectedJobDetail.avatarColor} flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm`}>
                  <span className="font-bold">{selectedJobDetail.initial}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    {selectedJobDetail.title}
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium border border-slate-200">
                      {selectedJobDetail.source}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">{selectedJobDetail.company}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobDetail(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Resumen de Match */}
              <div className="rounded-2xl bg-linear-to-r from-blue-50 to-emerald-50 p-5 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-800">Cálculo de Match: <span className="text-emerald-600">{selectedJobDetail.matchPercent}%</span></span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{selectedJobDetail.matchFeedback}</p>
                <p className="text-sm text-slate-600 border-t border-blue-200/50 pt-3"><strong className="text-amber-600">Para mejorar:</strong> {selectedJobDetail.matchMissing}</p>
              </div>

              {/* Descripción */}
              <section>
                <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <Briefcase className="h-4 w-4 text-slate-400" /> Sobre el puesto
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedJobDetail.description}
                </p>
              </section>

              {/* Funciones */}
              <section>
                <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" /> Funciones principales
                </h4>
                <ul className="space-y-2">
                  {selectedJobDetail.functions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Habilidades */}
              <section>
                <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
                  <Sparkles className="h-4 w-4 text-slate-400" /> Habilidades requeridas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJobDetail.skills.map((skill, idx) => (
                    <span key={idx} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Requisitos Generales */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 text-sm">
                <div>
                  <span className="block text-xs text-slate-400 mb-1">Modalidad</span>
                  <span className="font-medium text-slate-700">{selectedJobDetail.mode}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 mb-1">Ubicación</span>
                  <span className="font-medium text-slate-700">{selectedJobDetail.location}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 mb-1">Nivel</span>
                  <span className="font-medium text-slate-700">{selectedJobDetail.level}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 mb-1">Salario</span>
                  <span className="font-medium text-slate-700">S/ {selectedJobDetail.salaryMin} - {selectedJobDetail.salaryMax}</span>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur-md flex gap-3">
              <button 
                onClick={() => {
                  if (!matchedJobs.some((m) => m.id === selectedJobDetail.id)) {
                    setMatchedJobs((prev) => [...prev, selectedJobDetail])
                  }
                  setSelectedJobDetail(null)
                }}
                className="flex-1 rounded-xl border-2 border-emerald-500 bg-emerald-50 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
              >
                Hacer Match
              </button>
              <button 
                onClick={() => {
                  alert(`Redirigiendo a postular en ${selectedJobDetail.source}...`)
                }}
                className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
              >
                Postular
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </PageShell>
  )
}
