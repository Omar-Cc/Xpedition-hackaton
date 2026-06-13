"use client"

import { useEffect, useMemo, useState } from 'react'
import PageShell from '@/src/components/layout/PageShell'
import {
  Bookmark,
  Cake,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DollarSign,
  Filter,
  GraduationCap,
  Heart,
  MapPin,
  Plus,
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
  },
  {
    id: '5',
    initial: 'A',
    avatarColor: 'bg-orange-500',
    matchPercent: 76,
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
  },
  {
    id: '6',
    initial: 'G',
    avatarColor: 'bg-emerald-500',
    matchPercent: 73,
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
  const [savedJobs, setSavedJobs] = useState<JobItem[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

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
    })
  }, [appliedFilters])

  const currentQuickJob = filteredJobs[quickIndex] ?? null
  const selectedJobs = useMemo(() => matchedJobs.concat(savedJobs), [matchedJobs, savedJobs])

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

  function saveCurrent() {
    if (currentQuickJob && !savedJobs.some((job) => job.id === currentQuickJob.id)) {
      setSavedJobs((prev) => [...prev, currentQuickJob])
      setMatchedJobs((prev) => prev.filter((job) => job.id !== currentQuickJob.id))
    }
    advanceQuick()
  }

  function matchCurrent() {
    if (currentQuickJob && !matchedJobs.some((job) => job.id === currentQuickJob.id)) {
      setMatchedJobs((prev) => [...prev, currentQuickJob])
      setSavedJobs((prev) => prev.filter((job) => job.id !== currentQuickJob.id))
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
                <button
                  type="button"
                  onClick={applyFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Buscar Ahora
                </button>
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
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_340px] gap-6 items-start">
          <aside className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex w-full items-center gap-3 px-6 py-5 xl:cursor-default"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Filter className="h-5 w-5" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-lg font-bold text-slate-900">Filtros de búsqueda</h2>
                <p className="text-sm text-slate-500">Refina resultados rápido</p>
              </div>
              <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 xl:hidden ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`space-y-5 px-6 overflow-hidden transition-all duration-300 xl:!max-h-none xl:!opacity-100 xl:!py-6 ${filtersOpen ? 'max-h-[2000px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
              <section className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Ubicación</h3>
                </div>
                <input
                  placeholder="Lima, Perú"
                  value={draftFilters.location}
                  onChange={(e) => setDraftFilters({ ...draftFilters, location: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </section>
            <button
              onClick={openQuickSearch}
              className="
                fixed bottom-6 right-6 z-50
                flex items-center justify-center
                h-14 w-14 rounded-full
                bg-red-600 text-white
                shadow-lg
                transition-all duration-300
                hover:scale-110 hover:bg-red-700
                active:scale-95
              "
              aria-label="Búsqueda rápida"
            >
              <Search className="h-6 w-6" />
            </button>

              <section className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Disponibilidad y modalidad</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {workModes.map((mode) => {
                    const selected = draftFilters.modes.includes(mode)
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() =>
                          setDraftFilters({
                            ...draftFilters,
                            modes: toggleItem(draftFilters.modes, mode),
                          })
                        }
                        className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                          selected
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
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
                    min={0}
                    placeholder="S/ 1,000"
                    value={draftFilters.salaryMin}
                    onChange={(e) => setDraftFilters({ ...draftFilters, salaryMin: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="S/ 4,000"
                    value={draftFilters.salaryMax}
                    onChange={(e) => setDraftFilters({ ...draftFilters, salaryMax: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </section>

              <section className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Nivel o tipo de puesto</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {levels.map((level) => {
                    const selected = draftFilters.levels.includes(level)
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          setDraftFilters({
                            ...draftFilters,
                            levels: toggleItem(draftFilters.levels, level),
                          })
                        }
                        className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                          selected
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        {level}
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Cake className="h-4 w-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Rango de edad</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min={16}
                    max={60}
                    placeholder="18"
                    value={draftFilters.ageMin}
                    onChange={(e) => setDraftFilters({ ...draftFilters, ageMin: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <input
                    type="number"
                    min={16}
                    max={60}
                    placeholder="28"
                    value={draftFilters.ageMax}
                    onChange={(e) => setDraftFilters({ ...draftFilters, ageMax: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <Check className="h-4 w-4" />
                  Aplicar filtros
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Limpiar filtros
                </button>
              </div>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Trabajos Recientes</h2>
                <p className="text-sm text-slate-500">{filteredJobs.length} oportunidades encontradas</p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Datos precargados y filtros en vivo
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-semibold text-slate-900">No encontramos resultados</p>
                <p className="mt-2 text-sm text-slate-500">Prueba limpiar filtros o cambiar ubicación, nivel o modalidad.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
                {filteredJobs.map((job, index) => (
                  <article
                    key={job.id}
                    className="group h-full rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="animate-cardIn flex h-full min-h-105 flex-col p-6 md:p-7">
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

                      <h3 className="mb-3 text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {job.title}
                      </h3>
                      <p className="mb-4 text-base text-slate-500">{job.company}</p>

                      <div className="space-y-3 text-sm text-slate-500">
                        <JobInfoRow label="Ubicación" value={job.location} />
                        <JobInfoRow label="Modalidad" value={job.mode} />
                        <JobInfoRow label="Nivel" value={job.level} />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span key={tag} className="badge badge-soft badge-neutral px-3 py-2">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {job.highlight}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-slate-100 px-3 py-1">Edad {job.ageMin}-{job.ageMax}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{job.requirement}</span>
                      </div>

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
                          ) : savedJobs.some((s) => s.id === job.id) ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                              <Bookmark className="h-3.5 w-3.5" /> Guardado
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  if (!savedJobs.some((s) => s.id === job.id)) {
                                    setSavedJobs((prev) => [...prev, job])
                                    setMatchedJobs((prev) => prev.filter((m) => m.id !== job.id))
                                  }
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 transition hover:bg-amber-100 hover:scale-105 active:scale-95"
                                title="Guardar empleo"
                              >
                                <Star className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Guardar</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (!matchedJobs.some((m) => m.id === job.id)) {
                                    setMatchedJobs((prev) => [...prev, job])
                                    setSavedJobs((prev) => prev.filter((s) => s.id !== job.id))
                                  }
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100 hover:scale-105 active:scale-95"
                                title="Hacer match"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Match</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ── Resumen de matches: sticky sidebar on xl, full-width below on smaller ── */}
          <aside className="xl:sticky xl:top-6 xl:self-start order-last rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5" />
                  {savedJobs.length}
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
                    const isMatched = matchedJobs.some((m) => m.id === job.id)
                    return (
                      <article
                        key={`summary-${job.id}`}
                        className={`group/item rounded-2xl border p-3 transition-all duration-200 hover:shadow-md ${
                          isMatched ? 'border-emerald-200 bg-emerald-50/60' : 'border-amber-200 bg-amber-50/60'
                        }`}
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
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isMatched ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {job.matchPercent}%
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (isMatched) {
                                  setMatchedJobs((prev) => prev.filter((m) => m.id !== job.id))
                                } else {
                                  setSavedJobs((prev) => prev.filter((s) => s.id !== job.id))
                                }
                              }}
                              className="rounded-full p-1 text-slate-400 opacity-0 group-hover/item:opacity-100 transition hover:bg-rose-50 hover:text-rose-500"
                              title="Quitar"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
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

                <h3 className="text-2xl font-semibold text-slate-900">{currentQuickJob.title}</h3>
                <p className="mt-2 text-base text-slate-500">{currentQuickJob.company}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {currentQuickJob.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-pink-50 px-3 py-1.5 text-sm text-pink-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="font-medium">Turno:</span> {currentQuickJob.mode}
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="font-medium">Requisito:</span> {currentQuickJob.requirement}
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {currentQuickJob.highlight}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-4xl bg-white p-8 text-center">
                <p className="text-lg font-semibold text-slate-900">No hay resultados para mostrar</p>
                <p className="mt-2 text-sm text-slate-500">Ajusta los filtros y vuelve a abrir la búsqueda rápida.</p>
              </div>
            )}

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
                onClick={saveCurrent}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400 bg-white text-amber-500 transition hover:scale-105"
                aria-label="Guardar empleo"
              >
                <Star className="h-7 w-7" />
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

            <p className="mt-4 text-center text-sm text-slate-500">← saltar · ☆ guardar · ✓ aplicar →</p>
            <p className="mt-2 text-center text-xs text-slate-400">
              {filteredJobs.length === 0 ? '0 empleos' : `${quickIndex + 1} / ${filteredJobs.length}`}
            </p>
          </div>
        </div>
      )}
      </div>
    </PageShell>
  )
}
