"use client"

import { useEffect, useMemo, useState, useRef } from 'react'
import PageShell from '@/src/components/layout/PageShell'
import PageHeader from '@/src/components/layout/PageHeader'
import MentorCard from '@/src/features/mentoria/components/MentorCard'
import MoreMentors from '@/src/features/mentoria/components/MoreMentors'
import HowItWorksPanel from '@/src/features/mentoria/components/HowItWorksPanel'
import { mentorsByCompany } from '@/src/features/mentoria/data/mock-data'
import { useJobMatch } from '@/src/contexts/JobMatchContext'
import type { MentorProfile, Connection } from '@/src/features/mentoria/types'
import { 
  Calendar, 
  Check, 
  Info, 
  CalendarCheck2, 
  Briefcase, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  UploadCloud, 
  Loader2, 
  Mail, 
  Edit3, 
  Sparkles,
  Inbox,
  Award,
  Video,
  AlertTriangle,
  Star,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight
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
}

const FALLBACK_JOBS: JobItem[] = [
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
  }
]

type MentorRequest = {
  id: string
  studentName: string
  studentCareer: string
  studentSemester: string
  topic: string
  proposedTime: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  avatarColor: string
  avatarInitial: string
}

const INITIAL_REQUESTS: MentorRequest[] = [
  {
    id: 'req-1',
    studentName: 'Luis Quispe',
    studentCareer: 'Ingeniería de Sistemas',
    studentSemester: '8vo ciclo',
    topic: 'Revisión de CV y consultas SQL',
    proposedTime: 'Lunes 15 de Junio - 04:00 PM',
    message: 'Hola Aníbal! Estoy postulando a Scotiabank y me gustaría que revises mis consultas en SQL y me des feedback de mi portafolio.',
    status: 'pending',
    avatarColor: 'bg-violet-600',
    avatarInitial: 'L',
  },
  {
    id: 'req-2',
    studentName: 'Rosa Díaz',
    studentCareer: 'Administración y Marketing',
    studentSemester: '9no ciclo',
    topic: 'Tips de ingreso y cultura en Alicorp',
    proposedTime: 'Miércoles 17 de Junio - 05:30 PM',
    message: 'Hola! Vi que estás haciendo prácticas en Alicorp. Me encantaría saber cómo es el ambiente laboral y qué preguntas hacen en el assessment.',
    status: 'pending',
    avatarColor: 'bg-red-500',
    avatarInitial: 'R',
  }
]

type StudentSession = {
  id: string
  mentorId: string
  mentorName: string
  company: string
  date: string
  time: string
  status: 'pending' | 'accepted' | 'rejected'
  zoomLink: string
  topic: string
  reviewed?: boolean
}

type MentorReview = {
  mentorId: string
  author: string
  rating: number
  comment: string
}

type StudentRegistration = {
  id: string
  name: string
  career: string
  attendance: 'none' | 'present' | 'absent'
}

type MentorSession = {
  id: string
  title: string
  date: string
  time: string
  zoomLink: string
  students: StudentRegistration[]
}

const DEFAULT_STUDENT_SESSIONS: StudentSession[] = [
  {
    id: 'sess-stud-1',
    mentorId: 'scotia-1',
    mentorName: 'Ana Torres',
    company: 'Scotiabank Perú',
    date: 'Lunes 15 de Junio',
    time: '04:00 PM',
    status: 'accepted',
    zoomLink: 'https://zoom.us/j/9876543210',
    topic: 'Revisión de Currículum y Brechas',
  },
  {
    id: 'sess-stud-2',
    mentorId: 'scotia-2',
    mentorName: 'Luis Quispe',
    company: 'Scotiabank Perú',
    date: 'Miércoles 17 de Junio',
    time: '03:00 PM',
    status: 'pending',
    zoomLink: '',
    topic: 'Dudas generales de la vacante',
  },
  {
    id: 'sess-stud-3',
    mentorId: 'inter-2',
    mentorName: 'María Chávez',
    company: 'Interbank',
    date: 'Viernes 12 de Junio',
    time: '02:00 PM',
    status: 'rejected',
    zoomLink: '',
    topic: 'Simulación de Entrevista Técnica',
  }
]

const DEFAULT_REVIEWS: MentorReview[] = [
  { mentorId: 'scotia-1', author: 'Juan Pérez', rating: 5, comment: '¡Excelente mentora! Me ayudó muchísimo a estructurar mi CV para Scotiabank y me dio tips para las pruebas de SQL.' },
  { mentorId: 'scotia-1', author: 'María C.', rating: 5, comment: 'Muy recomendada, conoce a fondo las herramientas de ingeniería de datos en banca.' },
  { mentorId: 'scotia-2', author: 'José L.', rating: 4, comment: 'Gran ayuda con Excel avanzado y análisis básico.' },
  { mentorId: 'bcp-1', author: 'Daniel R.', rating: 5, comment: 'Excelente explicación de dinámicas grupales del BCP. Muy recomendado.' }
]

const DEFAULT_MENTOR_SESSIONS: MentorSession[] = [
  {
    id: 'sess-ment-1',
    title: 'Taller de SQL & Preparación de CV',
    date: 'Lunes 15 de Junio',
    time: '04:00 PM',
    zoomLink: 'https://zoom.us/j/1234567890',
    students: [
      { id: 'stud-reg-1', name: 'Luis Quispe', career: 'Ing. Sistemas (8vo ciclo)', attendance: 'none' },
      { id: 'stud-reg-2', name: 'María Chávez', career: 'Ing. Sistemas (10mo ciclo)', attendance: 'none' },
      { id: 'stud-reg-self', name: 'Anibal Alejandro Jahuar Chirinos (Tú)', career: 'Ing. Sistemas (9no ciclo)', attendance: 'none' },
    ]
  },
  {
    id: 'sess-ment-2',
    title: 'Cultura Laboral y Dinámicas en Alicorp',
    date: 'Miércoles 17 de Junio',
    time: '05:30 PM',
    zoomLink: '',
    students: [
      { id: 'stud-reg-3', name: 'Rosa Díaz', career: 'Administración y Marketing (9no ciclo)', attendance: 'none' },
      { id: 'stud-reg-4', name: 'Juan Pérez', career: 'Ing. Sistemas (10mo ciclo)', attendance: 'none' },
    ]
  }
]

// Helper to extract day number from date string (e.g. "Lunes 15 de Junio" -> 15)
const getDayFromDateString = (dateStr: string): number => {
  if (!dateStr) return 0
  // Match a 1 or 2 digit number (ignoring 4 digit years)
  const match = dateStr.match(/\b\d{1,2}\b/)
  return match ? parseInt(match[0], 10) : 0
}

// Helper to clean and normalize company names for comparison
const cleanCompanyName = (name: string): string => {
  if (!name) return ''
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents/diacritics
    .replace(/\b(peru|seguros|s\.a|s\.a\.c|digital|group|corporation|per\uFFFD)\b/g, '') // remove common suffixes
    .replace(/[^a-z0-9]/g, '') // keep only alphanumeric characters
    .trim()
}

// Helper to get mentors for a company using fuzzy matching
const getMentorsForCompany = (companyName: string): MentorProfile[] => {
  if (!companyName) return []
  const cleanTarget = cleanCompanyName(companyName)
  if (!cleanTarget) return []

  // Try exact match after cleaning
  for (const key of Object.keys(mentorsByCompany)) {
    if (cleanCompanyName(key) === cleanTarget) {
      return mentorsByCompany[key]
    }
  }

  // Try substring match (e.g. "BBVA" contains/is-contained-in "BBVA Perú")
  for (const key of Object.keys(mentorsByCompany)) {
    const cleanKey = cleanCompanyName(key)
    if (cleanKey.includes(cleanTarget) || cleanTarget.includes(cleanKey)) {
      return mentorsByCompany[key]
    }
  }

  return []
}

export default function MentoriaPage() {
  const { matchedJobs } = useJobMatch()
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Calendar Tabs
  const [activeStudentTab, setActiveStudentTab] = useState<'buscar' | 'agenda'>('buscar')
  const [activeMentorTab, setActiveMentorTab] = useState<'perfil' | 'agenda'>('perfil')

  // Absences and Penalties states
  const [studentAbsences, setStudentAbsences] = useState<number>(0)
  const [studentSessions, setStudentSessions] = useState<StudentSession[]>([])
  const [mentorReviews, setMentorReviews] = useState<MentorReview[]>([])
  const [mentorSessions, setMentorSessions] = useState<MentorSession[]>([])

  // Student Review leaving states
  const [selectedAgendaSession, setSelectedAgendaSession] = useState<StudentSession | null>(null)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewRating, setReviewRating] = useState(5)

  // Zoom Link Editing in Mentor Agenda
  const [editingZoomSessionId, setEditingZoomSessionId] = useState<string | null>(null)
  const [zoomLinkInputValue, setZoomLinkInputValue] = useState('')

  // Attendance Modal State
  const [attendanceModalSessionId, setAttendanceModalSessionId] = useState<string | null>(null)
  const attendanceModalSession = useMemo(() => {
    if (!attendanceModalSessionId) return null
    return mentorSessions.find((s) => s.id === attendanceModalSessionId) || null
  }, [attendanceModalSessionId, mentorSessions])

  // Mentor Mode States
  const [isMentorVerified, setIsMentorVerified] = useState(false)
  const [showMentorCalendarModal, setShowMentorCalendarModal] = useState(false)
  const [showStudentCalendarModal, setShowStudentCalendarModal] = useState(false)
  const [viewMode, setViewMode] = useState<'student' | 'mentor'>('student')
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  
  // Verification progress steps
  const [step1, setStep1] = useState<'pending' | 'uploading' | 'completed'>('pending')
  const [step2, setStep2] = useState<'locked' | 'pending' | 'verifying' | 'completed'>('locked')
  const [step3, setStep3] = useState<'locked' | 'pending' | 'completed'>('locked')
  
  // 3 Certificates status
  const [practicasCert, setPracticasCert] = useState<'pending' | 'uploading' | 'completed'>('pending')
  const [practicasFileName, setPracticasFileName] = useState('')
  
  const [topCert, setTopCert] = useState<'pending' | 'uploading' | 'completed'>('pending')
  const [topFileName, setTopFileName] = useState('')
  
  const [impulsaCert, setImpulsaCert] = useState<'pending' | 'uploading' | 'completed'>('pending')
  const [impulsaFileName, setImpulsaFileName] = useState('')
  
  const [uploadFileName, setUploadFileName] = useState('')
  const [verificationTime, setVerificationTime] = useState(3)

  // Auto-complete step 1 when all 3 certificates are completed
  useEffect(() => {
    if (practicasCert === 'completed' && topCert === 'completed' && impulsaCert === 'completed') {
      setStep1('completed')
      if (step2 === 'locked') {
        setStep2('pending')
      }
    } else {
      setStep1('pending')
    }
  }, [practicasCert, topCert, impulsaCert])

  // User Profile as Mentor
  const [userMentorSkills, setUserMentorSkills] = useState<string[]>(['Python', 'SQL', 'React', 'Análisis de Datos'])
  const [userMentorBio, setUserMentorBio] = useState('Practicante de analítica en Alicorp. Te ayudo a preparar tu CV, revisar tus consultas en SQL y contarte mi experiencia en dinámicas grupales.')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editBioText, setEditBioText] = useState(userMentorBio)
  const [editSkillsText, setEditSkillsText] = useState(userMentorSkills.join(', '))

  // Incoming Mentor Requests
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>(INITIAL_REQUESTS)

  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('xpedition_completed_sessions_count')
      return stored ? parseInt(stored, 10) : 5
    }
    return 5
  })
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false)

  // Scheduling State
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('Lunes 15 de Junio')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('04:00 PM')
  const [sessionTopic, setSessionTopic] = useState('revision_cv')

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  // Track booked sessions counts for each mentor dynamically
  const [mentorBookedCounts, setMentorBookedCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Mentor Mode details

      // Load Mentor Mode details
      const storedVerified = localStorage.getItem('xpedition_is_mentor_verified')
      if (storedVerified) {
        setIsMentorVerified(JSON.parse(storedVerified))
      }
      const storedViewMode = localStorage.getItem('xpedition_mentor_view_mode')
      if (storedViewMode) {
        setViewMode(storedViewMode as 'student' | 'mentor')
      }
      const storedBio = localStorage.getItem('xpedition_mentor_bio')
      if (storedBio) {
        setUserMentorBio(storedBio)
        setEditBioText(storedBio)
      }
      const storedSkills = localStorage.getItem('xpedition_mentor_skills')
      if (storedSkills) {
        setUserMentorSkills(JSON.parse(storedSkills))
        setEditSkillsText(JSON.parse(storedSkills).join(', '))
      }
      const storedRequests = localStorage.getItem('xpedition_mentor_requests')
      if (storedRequests) {
        try {
          setMentorRequests(JSON.parse(storedRequests))
        } catch (e) {
          console.error(e)
        }
      }

      // Load Absences and Calendars
      const storedAbsences = localStorage.getItem('xpedition_student_absences')
      if (storedAbsences) {
        setStudentAbsences(Number(storedAbsences))
      }
      
      const storedStudentSessions = localStorage.getItem('xpedition_student_sessions')
      if (storedStudentSessions) {
        try {
          setStudentSessions(JSON.parse(storedStudentSessions))
        } catch (e) {
          setStudentSessions(DEFAULT_STUDENT_SESSIONS)
        }
      } else {
        setStudentSessions(DEFAULT_STUDENT_SESSIONS)
        localStorage.setItem('xpedition_student_sessions', JSON.stringify(DEFAULT_STUDENT_SESSIONS))
      }

      const storedReviews = localStorage.getItem('xpedition_mentor_reviews')
      if (storedReviews) {
        try {
          setMentorReviews(JSON.parse(storedReviews))
        } catch (e) {
          setMentorReviews(DEFAULT_REVIEWS)
        }
      } else {
        setMentorReviews(DEFAULT_REVIEWS)
        localStorage.setItem('xpedition_mentor_reviews', JSON.stringify(DEFAULT_REVIEWS))
      }

      const storedMentorSessions = localStorage.getItem('xpedition_mentor_sessions')
      if (storedMentorSessions) {
        try {
          const parsed = JSON.parse(storedMentorSessions)
          // Sanitize: ensure every session has a students array
          const sanitized = parsed.map((s: any) => ({
            ...s,
            students: s.students || []
          }))
          setMentorSessions(sanitized)
        } catch (e) {
          setMentorSessions(DEFAULT_MENTOR_SESSIONS)
        }
      } else {
        setMentorSessions(DEFAULT_MENTOR_SESSIONS)
        localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(DEFAULT_MENTOR_SESSIONS))
      }

      // Initialize and load dynamic booked sessions count for each mentor
      const initialCounts: Record<string, number> = {}
      Object.values(mentorsByCompany).flat().forEach((m) => {
        initialCounts[m.id] = m.sessionsBooked
      })
      const storedCounts = localStorage.getItem('xpedition_mentor_booked_counts')
      if (storedCounts) {
        try {
          const parsed = JSON.parse(storedCounts)
          setMentorBookedCounts({ ...initialCounts, ...parsed })
        } catch (e) {
          setMentorBookedCounts(initialCounts)
        }
      } else {
        setMentorBookedCounts(initialCounts)
      }

      setIsLoaded(true)
    }
  }, [])

  // Auto-select first mentor when selected job changes
  useEffect(() => {
    if (selectedJob && viewMode === 'student') {
      const companyMentors = getMentorsForCompany(selectedJob.company)
      if (companyMentors.length > 0) {
        setSelectedMentor(companyMentors[0])
      } else {
        setSelectedMentor(null)
      }
    } else if (!selectedJob) {
      setSelectedMentor(null)
    }
  }, [selectedJob, viewMode])

  // Helper to trigger a temporary toast
  const triggerToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }

  // Handle Skip
  const handleSkip = () => {
    if (!selectedJob || !selectedMentor) return
    const companyMentors = getMentorsForCompany(selectedJob.company)
    if (companyMentors.length <= 1) {
      triggerToast(`No hay más mentores disponibles para ${selectedJob.company}`, 'info')
      return
    }
    const currentIndex = companyMentors.findIndex((m) => m.id === selectedMentor.id)
    const nextIndex = (currentIndex + 1) % companyMentors.length
    setSelectedMentor(companyMentors[nextIndex])
  }

  // Confirm booking session (student view)
  const handleConfirmSchedule = () => {
    if (!selectedMentor || !selectedJob) return

    if (studentAbsences >= 2) {
      triggerToast("Solicitud denegada: Tu cuenta está suspendida por acumular 2 inasistencias en el ciclo.", "info")
      setShowScheduleModal(false)
      return
    }

    // Increment booked count for this mentor
    const currentCount = mentorBookedCounts[selectedMentor.id] ?? selectedMentor.sessionsBooked
    const newCount = Math.min(10, currentCount + 1)
    const updatedCounts = { ...mentorBookedCounts, [selectedMentor.id]: newCount }
    setMentorBookedCounts(updatedCounts)
    localStorage.setItem('xpedition_mentor_booked_counts', JSON.stringify(updatedCounts))

    // Add session to student agenda calendar
    const newSession: StudentSession = {
      id: `sess-stud-${Date.now()}`,
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      company: selectedMentor.company,
      date: selectedDate,
      time: selectedTimeSlot,
      status: 'pending',
      zoomLink: '',
      topic: sessionTopic === 'revision_cv' ? 'Revisión de Currículum' : sessionTopic === 'simulacion_entrevista' ? 'Simulación de Entrevista' : 'Consejos y dudas del rol'
    }

    const updatedSessions = [newSession, ...studentSessions]
    setStudentSessions(updatedSessions)
    localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedSessions))

    setShowScheduleModal(false)
    triggerToast(
      `¡Sesión solicitada! Se encuentra en estado 'Pendiente' hasta que el mentor la apruebe.`,
      'success'
    )
  }

  // Submit mentor review from student calendar
  const handleSendReview = () => {
    if (!selectedAgendaSession || !reviewComment.trim()) return

    const newReview: MentorReview = {
      mentorId: selectedAgendaSession.mentorId,
      author: 'Anibal Alejandro J. C.',
      rating: reviewRating,
      comment: reviewComment.trim()
    }

    const updatedReviews = [newReview, ...mentorReviews]
    setMentorReviews(updatedReviews)
    localStorage.setItem('xpedition_mentor_reviews', JSON.stringify(updatedReviews))

    // Mark session as reviewed
    const updatedSessions = studentSessions.map((s) => {
      if (s.id === selectedAgendaSession.id) {
        return { ...s, reviewed: true }
      }
      return s
    })
    setStudentSessions(updatedSessions)
    localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedSessions))

    // Update expanded session view
    setSelectedAgendaSession({ ...selectedAgendaSession, reviewed: true })

    triggerToast(`¡Recomendación guardada con éxito! Ya es visible en el perfil del mentor.`, 'success')
    setReviewComment('')
  }

  const handleAnnulStudentSession = (sessionId: string) => {
    const session = studentSessions.find((s) => s.id === sessionId)
    if (!session) return

    const updatedStudentSessions = studentSessions.map((s) => {
      if (s.id === sessionId) {
        return { ...s, status: 'rejected' as const }
      }
      return s
    })
    setStudentSessions(updatedStudentSessions)
    localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedStudentSessions))

    if (session.status === 'accepted') {
      const updatedMentorSessions = mentorSessions.filter(
        (mS) => !(mS.date === session.date && mS.time === session.time)
      )
      setMentorSessions(updatedMentorSessions)
      localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(updatedMentorSessions))

      const currentCount = mentorBookedCounts[session.mentorId] ?? 0
      const newCount = Math.max(0, currentCount - 1)
      const updatedCounts = { ...mentorBookedCounts, [session.mentorId]: newCount }
      setMentorBookedCounts(updatedCounts)
      localStorage.setItem('xpedition_mentor_booked_counts', JSON.stringify(updatedCounts))
    }

    setSelectedAgendaSession({ ...session, status: 'rejected' })
    triggerToast(`Solicitud de sesión anulada con éxito.`, 'info')
  }

  // Save Zoom link from Mentor Agenda
  const handleSaveZoomLink = (sessionId: string) => {
    const updated = mentorSessions.map((s) => {
      if (s.id === sessionId) {
        return { ...s, zoomLink: zoomLinkInputValue }
      }
      return s
    })
    setMentorSessions(updated)
    localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(updated))
    setEditingZoomSessionId(null)
    setZoomLinkInputValue('')

    // Synchronize to student's view if they match date/time
    const matchingSession = updated.find((s) => s.id === sessionId)
    if (matchingSession) {
      const updatedStud = studentSessions.map((studS) => {
        if (studS.date === matchingSession.date && studS.time === matchingSession.time) {
          return { ...studS, zoomLink: matchingSession.zoomLink }
        }
        return studS
      })
      setStudentSessions(updatedStud)
      localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedStud))
    }

    triggerToast(`Enlace de reunión de Zoom guardado.`, 'success')
  }

  // Mark student attendance in Mentor view (inside modal)
  const handleMarkStudentAttendance = (sessionId: string, studentId: string, status: 'present' | 'absent') => {
    // 1. Update session state
    const updatedSessions = mentorSessions.map((sess) => {
      if (sess.id === sessionId) {
        const updatedStudents = (sess.students || []).map((student) => {
          if (student.id === studentId) {
            return { ...student, attendance: status }
          }
          return student
        })
        return { ...sess, students: updatedStudents }
      }
      return sess
    })
    
    setMentorSessions(updatedSessions)
    localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(updatedSessions))
    
    // 3. Process absences and trigger penalty if applicable
    const session = mentorSessions.find((s) => s.id === sessionId)
    const student = session?.students?.find((std) => std.id === studentId)

    if (student) {
      if (status === 'absent') {
        // Mock simulation: If the student marked is the logged-in student, increment their absences count
        if (studentId === 'stud-reg-self' || student.name.includes('(Tú)')) {
          const newAbsences = studentAbsences + 1
          setStudentAbsences(newAbsences)
          localStorage.setItem('xpedition_student_absences', String(newAbsences))
          triggerToast(`Inasistencia registrada para ti. Faltas acumuladas: ${newAbsences}/2`, 'info')
          
          if (newAbsences >= 2) {
            triggerToast(`¡PENALIDAD APLICADA! Cuenta de estudiante suspendida por acumular 2 inasistencias.`, 'success')
          }
        } else {
          triggerToast(`Inasistencia registrada para ${student.name}.`, 'info')
        }
      } else {
        triggerToast(`Asistencia de ${student.name} registrada como PRESENTE.`, 'success')
      }
    }
  }

  // Verification step handlers
  const handlePracticasUpload = () => {
    setPracticasCert('uploading')
    setTimeout(() => {
      setPracticasFileName('cert_practicas_preprofesionales.pdf')
      setPracticasCert('completed')
      triggerToast('Certificado de Prácticas subido con éxito.', 'success')
    }, 1000)
  }

  const handleTopUpload = () => {
    setTopCert('uploading')
    setTimeout(() => {
      setTopFileName('diploma_generacion_top.pdf')
      setTopCert('completed')
      triggerToast('Certificado de Generación Top subido con éxito.', 'success')
    }, 1000)
  }

  const handleImpulsaUpload = () => {
    setImpulsaCert('uploading')
    setTimeout(() => {
      setImpulsaFileName('certificado_impulsa_utp.pdf')
      setImpulsaCert('completed')
      triggerToast('Certificado de Impulsa subido con éxito.', 'success')
    }, 1000)
  }

  const handleStep2Verify = () => {
    setStep2('verifying')
    setVerificationTime(4)
    
    const interval = setInterval(() => {
      setVerificationTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setStep2('completed')
          setStep3('pending')
          triggerToast('Proceso de seguimiento completado. Documentación validada.', 'success')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleStep3Email = () => {
    setStep3('completed')
    triggerToast('Respuesta de la universidad recibida y verificada.', 'success')
  }

  const resetVerificationState = () => {
    setStep1('pending')
    setStep2('locked')
    setStep3('locked')
    setPracticasCert('pending')
    setPracticasFileName('')
    setTopCert('pending')
    setTopFileName('')
    setImpulsaCert('pending')
    setImpulsaFileName('')
    setUploadFileName('')
  }

  const handleCompleteVerification = () => {
    setIsMentorVerified(true)
    setViewMode('mentor')
    setShowVerifyModal(false)
    
    localStorage.setItem('xpedition_is_mentor_verified', 'true')
    localStorage.setItem('xpedition_mentor_view_mode', 'mentor')
    
    triggerToast('¡Felicidades! Tu perfil de Mentor UTP ha sido verificado y activado.', 'success')
    
    resetVerificationState()
  }

  const handleToggleViewMode = () => {
    if (!isMentorVerified) {
      setShowVerifyModal(true)
    } else {
      const nextMode = viewMode === 'student' ? 'mentor' : 'student'
      setViewMode(nextMode)
      localStorage.setItem('xpedition_mentor_view_mode', nextMode)
      triggerToast(
        nextMode === 'mentor' 
          ? 'Has ingresado a tu Panel de Mentor UTP.' 
          : 'Has regresado a la búsqueda de mentores.', 
        'info'
      )
    }
  }

  const handleSaveProfileEdit = () => {
    const parsedSkills = editSkillsText.split(',').map(s => s.trim()).filter(Boolean)
    setUserMentorBio(editBioText)
    setUserMentorSkills(parsedSkills)
    setIsEditingProfile(false)
    
    localStorage.setItem('xpedition_mentor_bio', editBioText)
    localStorage.setItem('xpedition_mentor_skills', JSON.stringify(parsedSkills))
    
    triggerToast('Perfil de mentor actualizado con éxito.', 'success')
  }

  // Mentor accepts/rejects a pending request
  const handleRequestAction = (id: string, action: 'accepted' | 'rejected') => {
    const updated = mentorRequests.map(req => {
      if (req.id === id) {
        return { ...req, status: action }
      }
      return req
    })
    setMentorRequests(updated)
    localStorage.setItem('xpedition_mentor_requests', JSON.stringify(updated))
    
    const req = mentorRequests.find(r => r.id === id)
    
    if (action === 'accepted' && req) {
      // Add accepted session to the mentor's schedule calendar
      const newMentorSession: MentorSession = {
        id: `sess-ment-${Date.now()}`,
        title: req.topic,
        date: req.proposedTime.split(' - ')[0],
        time: req.proposedTime.split(' - ')[1],
        zoomLink: '',
        students: [
          { id: `stud-reg-${Date.now()}`, name: req.studentName, career: req.studentCareer + ' (' + req.studentSemester + ')', attendance: 'none' },
          { id: `stud-reg-other-${Date.now()}`, name: 'María Chávez', career: 'Ing. Sistemas (10mo ciclo)', attendance: 'none' },
          { id: 'stud-reg-self', name: 'Anibal Alejandro Jahuar Chirinos (Tú)', career: 'Ing. Sistemas (9no ciclo)', attendance: 'none' },
        ]
      }
      const newMentorSessionsList = [newMentorSession, ...mentorSessions]
      setMentorSessions(newMentorSessionsList)
      localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(newMentorSessionsList))

      // Sync with student sessions (representing matching date/time/mentor)
      const updatedStudentSessions = studentSessions.map((s) => {
        if (s.date === newMentorSession.date && s.time === newMentorSession.time) {
          return { ...s, status: 'accepted' as const }
        }
        return s
      })
      setStudentSessions(updatedStudentSessions)
      localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedStudentSessions))

      triggerToast(`¡Sesión aceptada! Se programó la videoconferencia grupal en tu agenda de mentor.`, 'success')
    } else {
      if (req) {
        const date = req.proposedTime.split(' - ')[0]
        const time = req.proposedTime.split(' - ')[1]
        const updatedStudentSessions = studentSessions.map((s) => {
          if (s.date === date && s.time === time) {
            return { ...s, status: 'rejected' as const }
          }
          return s
        })
        setStudentSessions(updatedStudentSessions)
        localStorage.setItem('xpedition_student_sessions', JSON.stringify(updatedStudentSessions))
      }
      triggerToast(`Sesión rechazada con ${req?.studentName}`, 'info')
    }
  }

  const handleResetMentorStatus = () => {
    setIsMentorVerified(false)
    setViewMode('student')
    setStudentAbsences(0)
    setShowMentorCalendarModal(false)
    setShowStudentCalendarModal(false)
    setAttendanceModalSessionId(null)
    localStorage.setItem('xpedition_is_mentor_verified', 'false')
    localStorage.setItem('xpedition_mentor_view_mode', 'student')
    localStorage.setItem('xpedition_student_absences', '0')
    
    setStudentSessions(DEFAULT_STUDENT_SESSIONS)
    localStorage.setItem('xpedition_student_sessions', JSON.stringify(DEFAULT_STUDENT_SESSIONS))
    
    setMentorSessions(DEFAULT_MENTOR_SESSIONS)
    localStorage.setItem('xpedition_mentor_sessions', JSON.stringify(DEFAULT_MENTOR_SESSIONS))

    setMentorReviews(DEFAULT_REVIEWS)
    localStorage.setItem('xpedition_mentor_reviews', JSON.stringify(DEFAULT_REVIEWS))

    triggerToast('Simulador reseteado a valores iniciales (faltas = 0, mentor = inactivo).', 'info')
  }

  // Get other mentors with dynamic capacity count mapping
  const otherMentors = useMemo(() => {
    if (!selectedJob || !selectedMentor) return []
    const companyMentors = getMentorsForCompany(selectedJob.company)
    return companyMentors
      .filter((m) => m.id !== selectedMentor.id)
      .map((m) => ({
        ...m,
        sessionsBooked: mentorBookedCounts[m.id] ?? m.sessionsBooked
      }))
  }, [selectedJob, selectedMentor, mentorBookedCounts])

  const currentJobMentorsCount = useMemo(() => {
    if (!selectedJob) return 0
    return getMentorsForCompany(selectedJob.company).length
  }, [selectedJob])

  // Map active mentor with dynamic count
  const activeMentorWithUpdatedCount = useMemo(() => {
    if (!selectedMentor) return null
    return {
      ...selectedMentor,
      sessionsBooked: mentorBookedCounts[selectedMentor.id] ?? selectedMentor.sessionsBooked
    }
  }, [selectedMentor, mentorBookedCounts])

  // Get reviews of selected mentor to show in card
  const selectedMentorReviews = useMemo(() => {
    if (!selectedMentor) return []
    return mentorReviews.filter((r) => r.mentorId === selectedMentor.id)
  }, [selectedMentor, mentorReviews])

  if (!isLoaded) {
    return (
      <PageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeader
        title="Mentoría UTP"
        titleClassName="text-[16px] font-bold tracking-tight transition-all duration-200 truncate"
        subtitle={
          viewMode === 'mentor'
            ? 'Panel de control de mentor. Aquí gestionas tu perfil público y tus sesiones con alumnos.'
            : 'Conecta y agenda sesiones con estudiantes que comparte tu experiencia y guía a futuros profesionales.'
        }
        maxWidthClassName="max-w-6xl"
        right={
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleToggleViewMode}
              className={`btn btn-sm rounded-xl text-xs font-semibold gap-2 border shadow-sm transition-all duration-300 ${
                isMentorVerified
                  ? viewMode === 'mentor'
                    ? 'btn-neutral text-white border-white/20 hover:bg-slate-800'
                    : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700'
                  : 'btn-outline text-amber-500 border-amber-500 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {isMentorVerified ? (
                viewMode === 'mentor' ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    Modo Estudiante
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Modo Mentor: Activo ✓
                  </>
                )
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Modo Mentor (No disponible)
                </>
              )}
            </button>
            {isMentorVerified && (
              <button 
                onClick={handleResetMentorStatus}
                className="btn btn-ghost btn-xs text-[10px] text-white/50 hover:text-white/80 border border-white/10 px-2 rounded"
                title="Reiniciar todo a valores iniciales"
              >
                Reset Simulador
              </button>
            )}
          </div>
        }
      />

      <main className="flex-1 overflow-y-auto p-6 pt-2">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">

          {/* ABSENCES SUSPENSION NOTIFICATION BANNER */}
          {viewMode === 'student' && studentAbsences > 0 && (
            <div className={`alert text-xs py-3.5 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn border ${
              studentAbsences >= 2 
                ? 'bg-red-50 text-red-900 border-red-200' 
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${studentAbsences >= 2 ? 'text-red-600' : 'text-amber-600'}`} />
                <span>
                  {studentAbsences >= 2 ? (
                    <>
                      <strong>Cuenta Suspendida:</strong> Has acumulado <strong>{studentAbsences} inasistencias</strong> en mentorías. Se ha suspendido tu acceso para agendar nuevas sesiones durante el ciclo actual.
                    </>
                  ) : (
                    <>
                      <strong>Advertencia de Inasistencia:</strong> Tienes <strong>1 falta acumulada</strong>. Recuerda asistir a tus sesiones o anularlas con anticipación. Si acumulas <strong>2 faltas</strong>, no podrás agendar más sesiones.
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW MODE A: STUDENT MODE (BROWSE MENTORS) */}
          {/* ========================================== */}
          {viewMode === 'student' && (
            <>

              {matchedJobs.length === 0 ? (
                <div className="card bg-base-100 shadow-xl border border-slate-100 overflow-hidden relative p-8 text-center max-w-2xl mx-auto my-12 animate-fadeIn">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-primary to-emerald-500" />
                  <div className="flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 shadow-inner">
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-800 mb-2">Comienza tu Mentoría Profesional</h3>
                      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Para conectar con estudiantes de ciclos superiores de la UTP que ya están realizando prácticas, primero debes guardar puestos que se alineen a tu perfil en <strong>Job Match</strong>.
                      </p>
                    </div>
                    <a 
                      href="/job-match" 
                      className="btn btn-primary text-white px-8 rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold"
                    >
                      Ir a Job Match
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* Job Matches Gallery */}
                  <div className="card bg-base-100 shadow-sm border border-slate-100">
                    <div className="card-body p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-violet-600" />
                            Puestos de tu Job Match
                          </h3>
                          <p className="text-xs text-slate-500">
                            Haz clic en un puesto para ver quiénes pueden guiarte a ingresar a esa empresa.
                          </p>
                        </div>
                        <a 
                          href="/job-match" 
                          className="btn btn-outline btn-sm text-xs border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-colors"
                        >
                          Ir a Job Match
                        </a>
                      </div>

                      {/* Carousel Wrapper */}
                      <div className="relative group/carousel">
                        {matchedJobs.length > 3 && (
                          <>
                            <button 
                              onClick={() => scrollCarousel('left')}
                              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 btn btn-circle btn-sm bg-white hover:bg-slate-50 border border-slate-200 shadow-md text-slate-600 hover:text-slate-800 transition-all opacity-0 group-hover/carousel:opacity-100 duration-200 cursor-pointer"
                              aria-label="Anterior"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => scrollCarousel('right')}
                              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 btn btn-circle btn-sm bg-white hover:bg-slate-50 border border-slate-200 shadow-md text-slate-600 hover:text-slate-800 transition-all opacity-0 group-hover/carousel:opacity-100 duration-200 cursor-pointer"
                              aria-label="Siguiente"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        <div 
                          ref={carouselRef}
                          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 scrollbar-none"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {matchedJobs.map((job) => {
                            const isSelected = selectedJob?.id === job.id
                            const mentorsCount = getMentorsForCompany(job.company).length
                            return (
                              <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className={`w-72 flex-shrink-0 snap-start p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                                  isSelected
                                    ? 'border-violet-600 bg-violet-50/20 shadow-md ring-1 ring-violet-600 scale-[1.01]'
                                    : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="avatar avatar-placeholder">
                                    <div className={`${job.avatarColor || 'bg-slate-500'} text-white w-9 h-9 rounded-xl`}>
                                      <span className="text-sm font-bold">{job.initial}</span>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{job.title}</h4>
                                    <p className="text-xs text-slate-500 truncate">{job.company}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{job.location}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100/80">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    {job.matchPercent}% match
                                  </span>
                                  <span className={`text-[11px] font-bold ${mentorsCount > 0 ? 'text-violet-600' : 'text-slate-400'}`}>
                                    {mentorsCount} {mentorsCount === 1 ? 'mentor disponible' : 'mentores disponibles'}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Mentorship Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                    
                    {/* Left Column: Selected Mentor Profile & Alternative Mentors */}
                    <div className="flex flex-col gap-6">
                      {selectedJob ? (
                        selectedMentor ? (
                          <>
                            <div className="bg-violet-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                              <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-sm font-bold">Mentores para {selectedJob?.company}</h4>
                                  <p className="text-xs text-violet-100">Mostrando a {selectedMentor.name} de {currentJobMentorsCount} mentor(es) disponibles.</p>
                                </div>
                              </div>
                            </div>
                            
                            <MentorCard
                              mentor={activeMentorWithUpdatedCount || selectedMentor}
                              onSchedule={() => {
                                if (studentAbsences >= 2) {
                                  triggerToast("Cuenta suspendida por acumular 2 inasistencias. No puedes agendar sesiones.", "info")
                                } else {
                                  setShowScheduleModal(true)
                                }
                              }}
                              onSkip={handleSkip}
                              reviews={selectedMentorReviews}
                            />

                            {otherMentors.length > 0 && (
                              <MoreMentors
                                mentors={otherMentors}
                                selectedMentorId={selectedMentor.id}
                                onSelectMentor={(mentor) => setSelectedMentor(mentor)}
                              />
                            )}
                          </>
                        ) : (
                          <div className="card bg-base-100 shadow-sm border border-slate-100 p-8 text-center">
                            <p className="text-sm text-base-content/60">No se encontraron mentores para este puesto.</p>
                          </div>
                        )
                      ) : (
                        <div className="card bg-base-100 shadow-sm border border-slate-100 p-10 text-center animate-fadeIn">
                          <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
                            <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center text-violet-500">
                              <Users className="w-7 h-7" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 text-lg mb-1">Explora Mentores por Puesto</h3>
                              <p className="text-sm text-slate-500 leading-relaxed">
                                Haz clic en uno de los puestos de tu <strong>Job Match</strong> arriba para ver los alumnos destacados que trabajan en esa empresa y agendar una sesión de guía.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Instructions */}
                    <div className="flex flex-col gap-6">
                      <HowItWorksPanel />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* ======================================================= */}
          {/* VIEW MODE B: MENTOR DASHBOARD MODE (YOUR MENTOR PROFILE & RECEIVED REQUESTS) */}
          {/* ======================================================= */}
          {viewMode === 'mentor' && isMentorVerified && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 animate-fadeIn">
                  
                  {/* Left Column: Your Own Mentor Profile (Verified Card) */}
                  <div className="flex flex-col gap-6">
                    <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-white" />
                        <div>
                          <h3 className="font-bold text-base">Panel de Mentor Verificado UTP</h3>
                          <p className="text-xs text-emerald-100">Estás visible en la galería para alumnos que hagan match con <strong>Alicorp</strong>.</p>
                        </div>
                      </div>
                      <span className="badge badge-lg bg-white text-emerald-700 border-none font-bold text-xs gap-1 py-1">
                        <Sparkles className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        Activo
                      </span>
                    </div>

                    {/* Simulated MentorCard representing the user */}
                    <div className="card bg-base-100 shadow-sm border border-slate-100">
                      <div className="card-body p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Left Side: Avatar and bio */}
                          <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-base-200 pb-6 md:pb-0 md:pr-6">
                            <div className="relative mb-3">
                              <div className="avatar avatar-placeholder">
                                <div className="bg-violet-600 text-white w-24 h-24 rounded-full border-4 border-emerald-100 shadow-md flex items-center justify-center">
                                  <span className="text-3xl font-bold">A</span>
                                </div>
                              </div>
                              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white" title="Mentor Verificado">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 justify-center">
                              <h2 className="text-lg font-bold text-slate-800">Anibal Alejandro Jahuar Chirinos</h2>
                              <span className="badge badge-xs bg-emerald-100 text-emerald-700 border-none font-bold text-[9px] py-1 px-1.5 flex items-center gap-0.5">
                                <ShieldCheck className="w-2.5 h-2.5" /> VERIFICADO
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Ing. de Sistemas — 9no semestre · UTP</p>
                            <span className="badge badge-soft badge-primary mt-2 text-[10px] font-bold">Prácticas en: Alicorp</span>
                            
                            <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                              {userMentorSkills.map((s) => (
                                <span key={s} className="badge badge-soft badge-secondary badge-sm text-[9px] font-semibold">{s}</span>
                              ))}
                            </div>
                            
                            <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-100 w-full flex items-center justify-around">
                              <div className="text-center">
                                <p className="text-base font-bold text-slate-800">5.0</p>
                                <p className="text-[10px] text-slate-400">Calificación UTP</p>
                              </div>
                              <div className="h-6 w-px bg-slate-200" />
                              <div className="text-center">
                                <p className="text-base font-bold text-slate-800">
                                  {mentorSessions.filter(s => s.students && s.students.some(st => st.attendance === 'present')).length}
                                </p>
                                <p className="text-[10px] text-slate-400">Tutorías dadas</p>
                              </div>
                            </div>
                          </div>

                          {/* Right Side: Edit info and details */}
                          <div className="flex flex-col justify-between gap-4">
                            {isEditingProfile ? (
                              <div className="space-y-4">
                                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Editar tu perfil de Mentor</h4>
                                
                                <div>
                                  <label className="label py-1">
                                    <span className="label-text font-semibold text-xs text-slate-600">Tu Biografía / Presentación</span>
                                  </label>
                                  <textarea
                                    value={editBioText}
                                    onChange={(e) => setEditBioText(e.target.value)}
                                    className="textarea textarea-bordered w-full rounded-xl text-xs h-24"
                                    placeholder="Escribe tu presentación como mentor..."
                                  />
                                </div>

                                <div>
                                  <label className="label py-1">
                                    <span className="label-text font-semibold text-xs text-slate-600">Habilidades (Separadas por comas)</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={editSkillsText}
                                    onChange={(e) => setEditSkillsText(e.target.value)}
                                    className="input input-bordered w-full rounded-xl text-xs"
                                    placeholder="SQL, Python, React..."
                                  />
                                </div>

                                <div className="flex gap-2 justify-end pt-2">
                                  <button
                                    onClick={() => setIsEditingProfile(false)}
                                    className="btn btn-ghost btn-sm rounded-xl text-xs"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    onClick={handleSaveProfileEdit}
                                    className="btn btn-primary btn-sm text-white rounded-xl text-xs"
                                  >
                                    Guardar Cambios
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col justify-between h-full">
                                <div>
                                  <span className="text-[10px] text-violet-600 font-bold uppercase tracking-wider block mb-1">Tu Presentación</span>
                                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 italic">
                                    "{userMentorBio}"
                                  </p>
                                  
                                  <div className="mt-4 space-y-2.5">
                                    <h4 className="text-xs font-bold text-slate-700">Tu disponibilidad configurada:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      <span className="badge badge-outline badge-sm text-[10px] text-slate-600 py-2">Lunes 4-6 PM</span>
                                      <span className="badge badge-outline badge-sm text-[10px] text-slate-600 py-2">Miércoles 5-7 PM</span>
                                      <span className="badge badge-outline badge-sm text-[10px] text-slate-600 py-2">Viernes 3-6 PM</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-6">
                                  <button
                                    onClick={() => setIsEditingProfile(true)}
                                    className="btn btn-outline btn-sm rounded-xl gap-2 text-xs"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    Editar Perfil de Mentor
                                  </button>
                                  <button
                                    onClick={handleToggleViewMode}
                                    className="btn btn-neutral btn-sm rounded-xl text-xs"
                                  >
                                    Vista Estudiante
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PROGRESS TO BENEFIT SECTION */}
                    <div className="card bg-base-100 shadow-sm border border-slate-100 mt-6">
                      <div className="card-body p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                              <Award className="w-5 h-5 text-violet-600" />
                              Programa de Recompensa por Voluntariado
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Realiza 6 sesiones de mentoría con estudiantes y obtén beneficios académicos.
                            </p>
                          </div>
                          <span className="badge badge-sm bg-violet-100 text-violet-700 border-none font-bold py-2.5 px-3">
                            Mentoría de Empleabilidad
                          </span>
                        </div>

                        {/* Timeline / Progress Stepper */}
                        <div className="relative flex items-center justify-between w-full mt-6 mb-8 px-4">
                          {/* Background Progress Line */}
                          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
                          {/* Active Progress Line */}
                          <div 
                            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-violet-500 to-emerald-500 z-0 transition-all duration-500" 
                            style={{ width: `${Math.min((completedSessionsCount / 5) * 82, 82)}%` }}
                          />

                          {Array.from({ length: 6 }).map((_, i) => {
                            const num = i + 1;
                            const isCompleted = i < completedSessionsCount;
                            const isCurrent = i === completedSessionsCount;
                            return (
                              <div key={num} className="relative z-10 flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-sm transition-all duration-300 border-2 ${
                                  isCompleted 
                                    ? 'bg-emerald-500 border-emerald-500 text-white scale-110' 
                                    : isCurrent 
                                      ? 'bg-white border-violet-500 text-violet-600 ring-4 ring-violet-100 animate-pulse' 
                                      : 'bg-white border-slate-300 text-slate-400'
                                }`}>
                                  {isCompleted ? '✓' : num}
                                </div>
                                <span className="text-[9px] font-black text-slate-500 mt-2 uppercase tracking-wider">
                                  S{num}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Actions & Description */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                          <div className="text-left w-full sm:w-auto">
                            <p className="text-xs font-bold text-slate-700">
                              Progreso: {completedSessionsCount} de 6 sesiones completadas
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {completedSessionsCount < 6 
                                ? `Completa ${6 - completedSessionsCount} sesión(es) más para desbloquear tu beneficio de excelencia.`
                                : '¡Objetivo alcanzado! Ya puedes reclamar tu beneficio académico.'}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            {completedSessionsCount < 6 && (
                              <button
                                onClick={() => {
                                  const nextVal = Math.min(completedSessionsCount + 1, 6);
                                  setCompletedSessionsCount(nextVal);
                                  localStorage.setItem('xpedition_completed_sessions_count', String(nextVal));
                                  if (nextVal === 6) {
                                    triggerToast('¡Felicidades! Has completado las 6 sesiones. Ya puedes canjear tu beneficio.', 'success');
                                  } else {
                                    triggerToast(`Sesión ${nextVal} completada simulada.`, 'info');
                                  }
                                }}
                                className="btn btn-outline btn-xs rounded-xl text-[10px] font-extrabold h-8 px-2.5 hover:bg-slate-50"
                              >
                                + Simular Sesión
                              </button>
                            )}
                            {completedSessionsCount > 0 && (
                              <button
                                onClick={() => {
                                  setCompletedSessionsCount(0);
                                  localStorage.setItem('xpedition_completed_sessions_count', '0');
                                  triggerToast('Progreso de sesiones reiniciado.', 'info');
                                }}
                                className="btn btn-ghost btn-xs rounded-xl text-[10px] text-slate-400 h-8 px-2"
                              >
                                Reiniciar
                              </button>
                            )}
                            
                            <button
                              onClick={() => {
                                setShowCelebrationModal(true);
                                triggerToast('¡Generando certificado y descuento del 10%!', 'success');
                              }}
                              disabled={completedSessionsCount < 6}
                              className={`btn btn-sm text-white font-bold rounded-xl text-xs px-5 h-9 transition-all duration-300 shadow-md ${
                                completedSessionsCount === 6
                                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-none hover:scale-105 active:scale-95 cursor-pointer'
                                  : 'bg-slate-200 text-slate-400 border-none cursor-not-allowed'
                              }`}
                            >
                              Canjear beneficio
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Incoming requests */}
                  <div className="flex flex-col gap-6">
                    {/* Solicitude Panel */}
                    <div className="card bg-base-100 shadow-sm border border-slate-100">
                      <div className="card-body p-5">
                        <h3 className="font-bold text-sm mb-3 text-slate-800 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Inbox className="w-4 h-4 text-violet-600" />
                            Solicitudes recibidas
                          </span>
                          <span className="badge badge-primary badge-sm text-[10px]">
                            {mentorRequests.filter(r => r.status === 'pending').length}
                          </span>
                        </h3>

                        {mentorRequests.length === 0 ? (
                          <div className="text-center py-8 border border-dashed border-base-200 rounded-xl bg-slate-50/50">
                            <p className="text-xs text-slate-400 font-medium">No hay solicitudes pendientes.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {mentorRequests.map((req) => (
                              <div 
                                key={req.id} 
                                className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                                  req.status === 'accepted' 
                                    ? 'bg-emerald-50/30 border-emerald-100'
                                    : req.status === 'rejected'
                                      ? 'bg-slate-50 border-slate-100 opacity-60'
                                      : 'bg-white border-slate-100 shadow-xs'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 mb-2">
                                  <div className="avatar avatar-placeholder">
                                    <div className={`${req.avatarColor} text-white w-8 h-8 rounded-full`}>
                                      <span className="text-xs font-bold">{req.avatarInitial}</span>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-xs font-bold text-slate-800 truncate">{req.studentName}</h4>
                                    <p className="text-[10px] text-slate-500 truncate">{req.studentCareer} · {req.studentSemester}</p>
                                  </div>
                                  {req.status !== 'pending' && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                      {req.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50/70 p-2 rounded-xl border border-slate-100/50 mb-3">
                                  <strong>Tema:</strong> {req.topic}<br />
                                  <strong className="block mt-1">Mensaje:</strong> "{req.message}"
                                </p>

                                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                                  <span>{req.proposedTime}</span>
                                </div>

                                {req.status === 'pending' && (
                                  <div className="flex gap-2 justify-end mt-3 pt-2 border-t border-slate-100">
                                    <button
                                      onClick={() => handleRequestAction(req.id, 'rejected')}
                                      className="btn btn-ghost btn-xs text-[10px] text-red-600 hover:bg-red-50 rounded-lg px-2.5 py-1"
                                    >
                                      Rechazar
                                    </button>
                                    <button
                                      onClick={() => handleRequestAction(req.id, 'accepted')}
                                      className="btn btn-success btn-xs text-[10px] text-white rounded-lg px-3.5 py-1"
                                    >
                                      Aceptar
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            </>
          )}

        </div>
      </main>

      {/* ======================================================= */}
      {/* MODAL: TOMAR ASISTENCIA (MENTOR ATTENDANCE MANAGEMENT) */}
      {/* ======================================================= */}
      {attendanceModalSession && (
        <div 
          onClick={() => setAttendanceModalSessionId(null)}
          className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative max-h-[96vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-1">
              <UserCheck className="w-5.5 h-5.5 text-emerald-600" />
              Gestión de Sesión e Inscritos
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Administra la reunión y toma la asistencia para:<br />
              <strong>{attendanceModalSession.title}</strong>
            </p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] text-slate-600 mb-4 space-y-1">
              <p><strong>Fecha:</strong> {attendanceModalSession.date}</p>
              <p><strong>Hora:</strong> {attendanceModalSession.time}</p>
            </div>

            {/* Zoom Link Section inside the Modal */}
            <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Enlace de Videollamada Zoom
              </label>
              {editingZoomSessionId === attendanceModalSession.id ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={zoomLinkInputValue}
                    onChange={(e) => setZoomLinkInputValue(e.target.value)}
                    placeholder="Enlace de Zoom (https://zoom.us/j/...)"
                    className="input input-bordered input-xs rounded-lg text-xs w-full focus:ring-1 focus:ring-violet-500 outline-none h-8"
                  />
                  <button
                    onClick={() => {
                      handleSaveZoomLink(attendanceModalSession.id)
                    }}
                    className="btn btn-primary btn-xs rounded-lg text-white font-bold h-8 px-2.5"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingZoomSessionId(null)}
                    className="btn btn-ghost btn-xs rounded-lg text-[10px] h-8"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-700 truncate max-w-[200px]">
                    {attendanceModalSession.zoomLink || 'Sin enlace cargado'}
                  </span>
                  <button
                    onClick={() => {
                      setEditingZoomSessionId(attendanceModalSession.id)
                      setZoomLinkInputValue(attendanceModalSession.zoomLink || '')
                    }}
                    className="btn btn-ghost btn-xs text-violet-600 hover:bg-violet-50 text-[10px] font-extrabold"
                  >
                    {attendanceModalSession.zoomLink ? 'Editar' : '+ Enlace'}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Alumnos Inscritos ({attendanceModalSession.students ? attendanceModalSession.students.length : 0})
              </span>
              
              {(attendanceModalSession.students || []).map((student) => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:shadow-xs transition-shadow"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{student.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{student.career}</p>
                  </div>
                  
                  <div>
                    {student.attendance === 'none' ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleMarkStudentAttendance(attendanceModalSession.id, student.id, 'absent')}
                          className="btn btn-outline btn-xs border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg px-2 font-bold"
                        >
                          ✗ Falto
                        </button>
                        <button
                          onClick={() => handleMarkStudentAttendance(attendanceModalSession.id, student.id, 'present')}
                          className="btn btn-success btn-xs text-white rounded-lg px-2.5 font-bold"
                        >
                          ✓ Presente
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        student.attendance === 'present'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {student.attendance === 'present' ? 'Asistió' : 'Faltó'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-action mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setAttendanceModalSessionId(null)}
                className="btn btn-primary text-white rounded-xl text-xs px-6"
              >
                Cerrar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}
              {/* MODAL: MENTOR VERIFICATION PROCESS */}
      {showVerifyModal && (
        <div 
          onClick={() => {
            setShowVerifyModal(false)
            resetVerificationState()
          }}
          className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-4xl w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative max-h-[96vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* Header */}
            <h3 className="font-extrabold text-2xl text-slate-900 flex items-center gap-2.5 mb-1.5">
              <Award className="w-7 h-7 text-violet-600" />
              Conviértete en Mentor UTP
            </h3>
            <p className="text-sm font-medium text-slate-600 mb-8 leading-relaxed">
              Sigue los 3 pasos reglamentarios para certificar tu perfil de mentor. Al finalizar, contarás con tu insignia de verificación de la UTP.
            </p>

            {/* Step Timeline/Process */}
            <div className="space-y-6">
              
              {/* PROCESS 1: UPLOAD 3 CERTIFICATES */}
              <div className={`p-6 rounded-3xl border transition-all duration-205 bg-white ${
                step1 === 'completed'
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : 'border-slate-200 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0 ${
                      step1 === 'completed' ? 'bg-emerald-600 text-white' : 'bg-violet-600 text-white'
                    }`}>
                      1
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">Validar Certificados Requeridos</h4>
                      <p className="text-xs font-semibold text-slate-500">Debes subir los 3 documentos para desbloquear la validación</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-center ${
                    step1 === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step1 === 'completed' ? 'Completado ✓' : 'Pendiente'}
                  </span>
                </div>
                
                {/* 3 Sub-steps for Uploading (CARDS in COLUMNS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card A: Prácticas Preprofesionales */}
                  <div 
                    onClick={() => {
                      if (practicasCert === 'pending') {
                        handlePracticasUpload();
                      }
                    }}
                    className={`flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all duration-205 min-h-[250px] text-center ${
                      practicasCert === 'pending'
                        ? 'border-dashed border-slate-200 bg-white hover:border-violet-500 hover:bg-violet-50/20 cursor-pointer group shadow-sm'
                        : practicasCert === 'uploading'
                          ? 'border-violet-300 bg-violet-50/10 animate-pulse'
                          : 'border-emerald-300 bg-emerald-50/10'
                    }`}
                  >
                    <div className="flex flex-col items-center flex-1 justify-center w-full">
                      {practicasCert === 'pending' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            1. Certificado de Prácticas Preprofesionales
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 leading-normal max-w-[190px]">
                            Constancia de prácticas vigentes o concluidas.
                          </p>
                          <span className="mt-4 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-violet-700 shadow-sm group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors">
                            Subir Archivo
                          </span>
                        </>
                      )}

                      {practicasCert === 'uploading' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mb-3.5 animate-spin">
                            <Loader2 className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            1. Certificado de Prácticas
                          </h5>
                          <p className="text-xs text-violet-600 font-extrabold mt-1">
                            Subiendo documento...
                          </p>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4 max-w-[130px]">
                            <div className="bg-violet-600 h-full w-2/3 animate-pulse" />
                          </div>
                        </>
                      )}

                      {practicasCert === 'completed' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3.5 border border-emerald-100 shadow-sm">
                            <Check className="w-7 h-7 text-emerald-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            1. Certificado de Prácticas Preprofesionales
                          </h5>
                          <div className="mt-3 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 p-2 rounded-lg text-xs font-bold w-full justify-center border border-emerald-100 max-w-[190px]">
                            <span className="truncate">{practicasFileName}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPracticasCert('pending');
                            }}
                            className="mt-4 text-xs font-bold text-slate-400 hover:text-red-500 cursor-pointer transition-colors underline decoration-dotted"
                          >
                            Reemplazar archivo
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card B: Generación Top */}
                  <div 
                    onClick={() => {
                      if (topCert === 'pending') {
                        handleTopUpload();
                      }
                    }}
                    className={`flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all duration-205 min-h-[250px] text-center ${
                      topCert === 'pending'
                        ? 'border-dashed border-slate-200 bg-white hover:border-violet-500 hover:bg-violet-50/20 cursor-pointer group shadow-sm'
                        : topCert === 'uploading'
                          ? 'border-violet-300 bg-violet-50/10 animate-pulse'
                          : 'border-emerald-300 bg-emerald-50/10'
                    }`}
                  >
                    <div className="flex flex-col items-center flex-1 justify-center w-full">
                      {topCert === 'pending' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            2. Certificado de Generación Top
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 leading-normal max-w-[190px]">
                            Acreditación del programa de alto rendimiento UTP.
                          </p>
                          <span className="mt-4 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-violet-700 shadow-sm group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors">
                            Subir Archivo
                          </span>
                        </>
                      )}

                      {topCert === 'uploading' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mb-3.5 animate-spin">
                            <Loader2 className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            2. Certificado de Generación Top
                          </h5>
                          <p className="text-xs text-violet-600 font-extrabold mt-1">
                            Subiendo documento...
                          </p>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4 max-w-[130px]">
                            <div className="bg-violet-600 h-full w-2/3 animate-pulse" />
                          </div>
                        </>
                      )}

                      {topCert === 'completed' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3.5 border border-emerald-100 shadow-sm">
                            <Check className="w-7 h-7 text-emerald-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            2. Certificado de Generación Top
                          </h5>
                          <div className="mt-3 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 p-2 rounded-lg text-xs font-bold w-full justify-center border border-emerald-100 max-w-[190px]">
                            <span className="truncate">{topFileName}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setTopCert('pending');
                            }}
                            className="mt-4 text-xs font-bold text-slate-400 hover:text-red-500 cursor-pointer transition-colors underline decoration-dotted"
                          >
                            Reemplazar archivo
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card C: Impulsa */}
                  <div 
                    onClick={() => {
                      if (impulsaCert === 'pending') {
                        handleImpulsaUpload();
                      }
                    }}
                    className={`flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all duration-205 min-h-[250px] text-center ${
                      impulsaCert === 'pending'
                        ? 'border-dashed border-slate-200 bg-white hover:border-violet-500 hover:bg-violet-50/20 cursor-pointer group shadow-sm'
                        : impulsaCert === 'uploading'
                          ? 'border-violet-300 bg-violet-50/10 animate-pulse'
                          : 'border-emerald-300 bg-emerald-50/10'
                    }`}
                  >
                    <div className="flex flex-col items-center flex-1 justify-center w-full">
                      {impulsaCert === 'pending' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            3. Certificado de Impulsa
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 leading-normal max-w-[190px]">
                            Constancia del programa de empleabilidad Impulsa UTP.
                          </p>
                          <span className="mt-4 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-violet-700 shadow-sm group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors">
                            Subir Archivo
                          </span>
                        </>
                      )}

                      {impulsaCert === 'uploading' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mb-3.5 animate-spin">
                            <Loader2 className="w-7 h-7 text-violet-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            3. Certificado de Impulsa
                          </h5>
                          <p className="text-xs text-violet-600 font-extrabold mt-1">
                            Subiendo documento...
                          </p>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4 max-w-[130px]">
                            <div className="bg-violet-600 h-full w-2/3 animate-pulse" />
                          </div>
                        </>
                      )}

                      {impulsaCert === 'completed' && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3.5 border border-emerald-100 shadow-sm">
                            <Check className="w-7 h-7 text-emerald-600" />
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                            3. Certificado de Impulsa
                          </h5>
                          <div className="mt-3 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 p-2 rounded-lg text-xs font-bold w-full justify-center border border-emerald-100 max-w-[190px]">
                            <span className="truncate">{impulsaFileName}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setImpulsaCert('pending');
                            }}
                            className="mt-4 text-xs font-bold text-slate-400 hover:text-red-500 cursor-pointer transition-colors underline decoration-dotted"
                          >
                            Reemplazar archivo
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* PROCESS 2: SEGUIMIENTO Y VALIDACIÓN DE DOCUMENTOS */}
              <div className={`p-6 rounded-3xl border transition-all duration-200 bg-white ${
                step2 === 'locked' 
                  ? 'border-slate-200 bg-slate-50/50 opacity-60' 
                  : step2 === 'completed'
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-slate-200 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0 ${
                      step2 === 'completed' ? 'bg-emerald-600 text-white' : step2 === 'locked' ? 'bg-slate-200 text-slate-400' : 'bg-violet-600 text-white'
                    }`}>
                      2
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">Proceso de Seguimiento y Validación</h4>
                      <p className="text-xs font-semibold text-slate-500">Verificación de tus 3 certificados en los registros académicos UTP</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-center ${
                    step2 === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : step2 === 'verifying'
                        ? 'bg-amber-100 text-amber-800'
                        : step2 === 'locked'
                          ? 'bg-slate-200 text-slate-400'
                          : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step2 === 'completed' 
                      ? 'Completado ✓' 
                      : step2 === 'verifying' 
                        ? 'En proceso...' 
                        : step2 === 'locked' 
                          ? 'Bloqueado' 
                          : 'Pendiente'
                    }
                  </span>
                </div>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                  Registros Académicos validará que tu certificado de prácticas preprofesionales, tu constancia de Generación Top y tu diploma de Impulsa sean auténticos y vigentes.
                </p>

                {step2 === 'pending' && (
                  <button
                    onClick={handleStep2Verify}
                    className="btn btn-primary btn-md text-white rounded-xl text-xs font-extrabold gap-2 cursor-pointer shadow-sm px-5"
                  >
                    Iniciar Seguimiento y Validación
                  </button>
                )}

                {step2 === 'verifying' && (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-2.5 text-sm text-amber-800 font-extrabold bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600 shrink-0" />
                      <span>Validando récord y certificados con UTP... ({verificationTime}s)</span>
                    </div>
                    {/* Simulated live tracking checks */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2.5 font-bold text-slate-700">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Check className="w-4 h-4" /> 1. Certificados cargados e integrados
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Check className="w-4 h-4" /> 2. Estatus de alumno regular UTP verificado
                      </div>
                      <div className="flex items-center gap-2 text-amber-600">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> 3. Firma y sello de constancias en revisión
                      </div>
                    </div>
                  </div>
                )}

                {step2 === 'completed' && (
                  <div className="flex flex-col gap-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-2 text-sm text-emerald-800">
                    <div className="flex items-center gap-2 font-extrabold text-emerald-700 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Seguimiento finalizado con éxito</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold">Los 3 certificados fueron aprobados por registros y transferidos para respuesta oficial.</p>
                  </div>
                )}
              </div>

              {/* PROCESS 3: RESPUESTA DE LA UNIVERSIDAD */}
              <div className={`p-6 rounded-3xl border transition-all duration-200 bg-white ${
                step3 === 'locked' 
                  ? 'border-slate-200 bg-slate-50/50 opacity-60' 
                  : step3 === 'completed'
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-slate-200 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0 ${
                      step3 === 'completed' ? 'bg-emerald-600 text-white' : step3 === 'locked' ? 'bg-slate-200 text-slate-400' : 'bg-violet-600 text-white'
                    }`}>
                      3
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">Respuesta Oficial y Aprobación</h4>
                      <p className="text-xs font-semibold text-slate-500">Notificación oficial emitida por la Universidad en tu correo institucional</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-center ${
                    step3 === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : step3 === 'locked'
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step3 === 'completed' ? 'Completado ✓' : step3 === 'locked' ? 'Bloqueado' : 'Pendiente'}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                  Una vez validado el seguimiento, recibirás un dictamen del Director de Carrera. Puedes consultar la respuesta oficial para habilitar tu cuenta.
                </p>

                {step3 === 'pending' && (
                  <button
                    onClick={handleStep3Email}
                    className="btn btn-primary btn-md text-white rounded-xl text-xs font-extrabold gap-2 cursor-pointer shadow-sm px-5"
                  >
                    <Mail className="w-4 h-4" />
                    Consultar Respuesta Institucional
                  </button>
                )}

                {step3 === 'completed' && (
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2.5 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-2">
                      <div className="flex items-center gap-2 font-extrabold text-emerald-700 text-sm">
                        <Check className="w-4 h-4" />
                        <span>Aprobado por Dirección de Carrera UTP</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700 bg-amber-50 text-amber-900 p-3.5 rounded-xl border border-amber-100 leading-relaxed">
                        <strong>Dictamen Oficial:</strong> "Se otorga la habilitación oficial al alumno para desempeñarse como Mentor UTP tras validar sus 3 certificados y récord de matrícula regular. Se han enviado las pautas de mentor y código de ética a [U21422102@utp.edu.pe]."
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Actions */}
            <div className="modal-action flex justify-end gap-3 mt-8 pt-5 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowVerifyModal(false)
                  resetVerificationState()
                }}
                className="btn btn-ghost rounded-xl text-sm font-extrabold text-slate-500 hover:bg-slate-100"
              >
                Cerrar
              </button>
              <button
                disabled={step1 !== 'completed' || step2 !== 'completed' || step3 !== 'completed'}
                onClick={handleCompleteVerification}
                className="btn btn-primary text-white rounded-xl text-sm font-extrabold px-7 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer transition-all"
              >
                Verificar y Activar Perfil
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Interactive DaisyUI Schedule Modal for Student */}
      {showScheduleModal && selectedMentor && (
        <div 
          onClick={() => setShowScheduleModal(false)}
          className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative"
          >
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-1">
              <CalendarCheck2 className="w-5 h-5 text-violet-600" />
              Agendar Sesión
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Agenda una videollamada de 30 min con <strong>{selectedMentor.name}</strong> para acelerar tu postulación a {selectedMentor.company}.
            </p>

            <div className="space-y-4">
              {/* Mentor badge preview */}
              <div className="flex items-center gap-3 p-3 bg-violet-50/50 rounded-2xl border border-violet-100">
                <div className="avatar avatar-placeholder">
                  <div className={`${selectedMentor.avatarColor} text-white w-10 h-10 rounded-full`}>
                    <span className="text-sm font-bold">{selectedMentor.avatarInitial}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">{selectedMentor.name}</h4>
                  <p className="text-[10px] text-slate-500">{selectedMentor.career} · {selectedMentor.company}</p>
                </div>
              </div>

              {/* Topic selection */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-bold text-xs text-slate-700">Tema de la sesión</span>
                </label>
                <select
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="select select-bordered w-full rounded-xl text-sm"
                >
                  <option value="revision_cv">Revisión de Currículum y Brechas técnicas</option>
                  <option value="simulacion_entrevista">Simulación de Entrevista (Mock Interview)</option>
                  <option value="tips_ingreso">Consejos de ingreso y Cultura en {selectedMentor.company}</option>
                  <option value="dudas_generales">Dudas generales sobre el rol de {selectedJob?.title}</option>
                </select>
              </div>

              {/* Date selection buttons */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-bold text-xs text-slate-700">Selecciona el día</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Lunes 15 de Jun', value: 'Lunes 15 de Junio' },
                    { label: 'Miércoles 17 de Jun', value: 'Miércoles 17 de Junio' },
                    { label: 'Viernes 19 de Jun', value: 'Viernes 19 de Junio' },
                    { label: 'Lunes 22 de Jun', value: 'Lunes 22 de Junio' },
                  ].map((dateOption) => (
                    <button
                      key={dateOption.value}
                      type="button"
                      onClick={() => setSelectedDate(dateOption.value)}
                      className={`btn btn-sm rounded-xl text-[11px] font-semibold border ${
                        selectedDate === dateOption.value
                          ? 'btn-primary text-white border-primary'
                          : 'btn-outline border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {dateOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection buttons */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-bold text-xs text-slate-700">Horas disponibles</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['02:00 PM', '04:00 PM', '05:30 PM', '06:00 PM', '07:00 PM', '08:00 PM'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`btn btn-sm rounded-xl text-[10px] font-semibold border ${
                        selectedTimeSlot === time
                          ? 'btn-primary text-white border-primary'
                          : 'btn-outline border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendance warning message */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[10px] text-amber-800 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Advertencia UTP:</strong> Recuerda asistir puntualmente a tu cita agendada. Si acumulas <strong>2 inasistencias (faltas)</strong> en el ciclo, tu cuenta será suspendida y no podrás participar de más sesiones de mentoría hasta el próximo ciclo.
                </span>
              </div>
            </div>

            {/* Modal actions */}
            <div className="modal-action flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="btn btn-ghost rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSchedule}
                className="btn btn-primary text-white rounded-xl text-xs px-6"
              >
                Agendar ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Calendar Button for Mentor (FAB) */}
      {viewMode === 'mentor' && isMentorVerified && (
        <div className="fixed bottom-24 right-6 z-30 tooltip tooltip-left" data-tip="Ver Agenda de Tutorías">
          <button
            onClick={() => setShowMentorCalendarModal(true)}
            className="btn btn-primary btn-circle btn-lg h-14 w-14 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-none bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Floating Calendar Button for Student (FAB) */}
      {viewMode === 'student' && (
        <div className="fixed bottom-24 right-6 z-30 tooltip tooltip-left" data-tip="Ver Calendario de Sesiones">
          <button
            onClick={() => setShowStudentCalendarModal(true)}
            className="btn btn-primary btn-circle btn-lg h-14 w-14 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-none bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* MODAL: MENTOR CALENDAR POP-UP */}
      {showMentorCalendarModal && (
        <div 
          onClick={() => setShowMentorCalendarModal(false)}
          className="modal modal-open fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-7xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative max-h-[96vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* Close Button */}
            <button
              onClick={() => setShowMentorCalendarModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-500 hover:bg-slate-100"
            >
              ✕
            </button>

            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2 mb-1">
              <CalendarCheck2 className="w-5.5 h-5.5 text-violet-600" />
              Agenda de Tutorías del Mentor
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Aquí visualizas tus sesiones grupales programadas por fecha. Haz clic en una sesión para gestionar el enlace de Zoom y tomar asistencia de los inscritos.
            </p>
            {mentorSessions.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-base-200 rounded-3xl bg-slate-50/50">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600 font-bold">Sin sesiones programadas</p>
                <p className="text-xs text-slate-400 mt-1">Acepta solicitudes en tu panel de perfil para programar tutorías.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Interactive Calendar Grid for June 2026 (Mentor View inside Modal) */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                    <span className="text-sm font-extrabold text-slate-800">Calendario de Sesiones: Junio 2026</span>
                    <span className="text-[10px] text-slate-500 font-bold">Visualiza por fecha · Haz clic en la sesión para tomar asistencia</span>
                  </div>

                  {/* Week Header */}
                  <div className="grid grid-cols-7 gap-1 text-center font-black text-xs text-slate-600 uppercase tracking-wider mb-2">
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mié</div>
                    <div>Jue</div>
                    <div>Vie</div>
                    <div>Sáb</div>
                    <div>Dom</div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3 bg-slate-50/50 p-3.5 rounded-3xl border border-slate-100">
                    {Array.from({ length: 35 }).map((_, idx) => {
                      const day = idx + 1
                      const isJune = day <= 30
                      const displayDay = isJune ? day : day - 30
                      const daySessions = isJune ? mentorSessions.filter(
                        (s) => getDayFromDateString(s.date) === day
                      ) : []
                      const isToday = isJune && day === 14 // June 14, 2026
                      return (
                        <div
                          key={day}
                          className={`min-h-[140px] p-3 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                            isToday
                              ? 'bg-white border-violet-500 ring-2 ring-violet-500/20 shadow-sm'
                              : isJune
                                ? 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs'
                                : 'bg-slate-50 border-slate-50/50 opacity-40 select-none'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            {isToday ? (
                              <span className="text-[10px] bg-violet-100 text-violet-700 font-black px-2 py-0.5 rounded-md">
                                HOY
                              </span>
                            ) : <span />}
                            <span className={`text-sm font-black ${isToday ? 'text-violet-600' : 'text-slate-500'}`}>
                              {displayDay}
                            </span>
                          </div>

                          <div className="space-y-1.5 mt-2">
                            {daySessions.map((session) => (
                              <button
                                key={session.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setAttendanceModalSessionId(session.id)
                                }}
                                className="w-full text-left text-xs font-extrabold p-2 rounded-xl border bg-violet-50 text-violet-800 border-violet-100 hover:bg-violet-100 hover:scale-95 transition-all shadow-sm"
                              >
                                <div className="truncate text-[11px] text-violet-600 font-bold">{session.time}</div>
                                <div className="truncate leading-tight font-black text-slate-800">{session.title}</div>
                                <div className="text-[10px] text-emerald-800 mt-0.5 flex items-center gap-0.5 font-bold">
                                  <span>Alumnos: </span>
                                  <span>{session.students ? session.students.length : 0} reg.</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowMentorCalendarModal(false)}
                className="btn btn-primary text-white rounded-xl text-xs px-6"
              >
                Cerrar Calendario
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: STUDENT CALENDAR POP-UP */}
      {showStudentCalendarModal && (
        <div 
          onClick={() => {
            setShowStudentCalendarModal(false)
            setSelectedAgendaSession(null)
          }}
          className="modal modal-open fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-7xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative max-h-[96vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowStudentCalendarModal(false)
                setSelectedAgendaSession(null)
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-500 hover:bg-slate-100"
            >
              ✕
            </button>

            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2 mb-1">
              <Calendar className="w-5.5 h-5.5 text-violet-600" />
              Calendario de Sesiones Solicitadas
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Visualiza tus solicitudes. Las sesiones programadas se muestran con código de color: <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">Verde para Aceptadas</span>, <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">Amarillo para Pendientes</span> y <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">Rojo para Rechazadas</span>. Haz clic en una sesión para ver sus detalles y dejar una recomendación.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
              {/* Left Column: Calendar Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                  <span className="text-sm font-extrabold text-slate-800">Calendario de Sesiones: Junio 2026</span>
                  <span className="text-[10px] text-slate-500 font-bold">Haz clic en una sesión para ver detalles</span>
                </div>

                {/* Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center font-black text-xs text-slate-600 uppercase tracking-wider mb-2">
                  <div>Lun</div>
                  <div>Mar</div>
                  <div>Mié</div>
                  <div>Jue</div>
                  <div>Vie</div>
                  <div>Sáb</div>
                  <div>Dom</div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-3 bg-slate-50/50 p-3.5 rounded-3xl border border-slate-100">
                  {Array.from({ length: 35 }).map((_, idx) => {
                    const day = idx + 1
                    const isJune = day <= 30
                    const displayDay = isJune ? day : day - 30
                    const daySessions = isJune ? studentSessions.filter(
                      (s) => getDayFromDateString(s.date) === day
                    ) : []
                    const isToday = isJune && day === 14 // June 14, 2026
                    return (
                      <div
                        key={day}
                        className={`min-h-[140px] p-3 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                          isToday
                            ? 'bg-white border-violet-500 ring-2 ring-violet-500/20 shadow-sm'
                            : isJune
                              ? 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs'
                              : 'bg-slate-50 border-slate-50/50 opacity-40 select-none'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          {isToday ? (
                            <span className="text-[10px] bg-violet-100 text-violet-700 font-black px-2 py-0.5 rounded-md">
                              HOY
                            </span>
                          ) : <span />}
                          <span className={`text-sm font-black ${isToday ? 'text-violet-600' : 'text-slate-500'}`}>
                            {displayDay}
                          </span>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          {daySessions.map((session) => {
                            const isAccepted = session.status === 'accepted'
                            const isPending = session.status === 'pending'
                            const isRejected = session.status === 'rejected'
                            
                            let colorClasses = 'bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100'
                            let statusText = 'Pendiente'
                            if (isAccepted) {
                              colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100 font-black'
                              statusText = 'Aceptado'
                            } else if (isRejected) {
                              colorClasses = 'bg-rose-50 text-rose-800 border-rose-100 hover:bg-rose-100'
                              statusText = 'Rechazado'
                            }

                            return (
                              <button
                                key={session.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedAgendaSession(session)
                                }}
                                className={`w-full text-left text-xs font-extrabold p-2 rounded-xl border transition-all shadow-sm ${colorClasses}`}
                              >
                                <div className="truncate text-[10px] font-bold opacity-80">{session.time}</div>
                                <div className="truncate leading-tight font-black">{session.mentorName}</div>
                                <div className="truncate text-[9px] font-medium mt-0.5">{session.topic}</div>
                                <div className="text-[9px] mt-0.5 font-bold flex items-center gap-0.5">
                                  <span>Info:</span>
                                  <span>{statusText}</span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Selected Session Detail & Recommendation form */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-4">
                {selectedAgendaSession ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <h4 className="font-extrabold text-sm text-slate-800">Detalles de la Sesión</h4>
                      <button 
                        onClick={() => setSelectedAgendaSession(null)} 
                        className="btn btn-ghost btn-xs text-xs font-bold text-slate-500 hover:text-slate-700"
                      >
                        Limpiar
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Mentor</span>
                        <p className="font-bold text-slate-800 text-sm">{selectedAgendaSession.mentorName}</p>
                        <p className="text-slate-500 text-[11px]">{selectedAgendaSession.company}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Tema</span>
                        <p className="font-semibold text-slate-700">{selectedAgendaSession.topic}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Fecha y Hora</span>
                        <p className="font-semibold text-slate-700">{selectedAgendaSession.date} · {selectedAgendaSession.time}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Estado</span>
                        <div className="mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            selectedAgendaSession.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : selectedAgendaSession.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border-amber-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            {selectedAgendaSession.status === 'accepted' ? 'Aceptado ✓' : selectedAgendaSession.status === 'pending' ? 'Pendiente' : 'Anulado ✗'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedAgendaSession.status === 'accepted' && (
                      <div className="pt-2 border-t border-slate-200 space-y-3">
                        {/* Zoom Link */}
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Videollamada Zoom</span>
                          {selectedAgendaSession.zoomLink ? (
                            <a 
                              href={selectedAgendaSession.zoomLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-success btn-sm w-full text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 shadow-sm text-xs"
                            >
                              <Video className="w-3.5 h-3.5" />
                              Unirse a Zoom
                            </a>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">El mentor aún no ha cargado el enlace de Zoom. Revisa más tarde.</p>
                          )}
                        </div>

                        {/* Recommendation form */}
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Dejar Recomendación</span>
                          
                          {selectedAgendaSession.reviewed ? (
                            <div className="bg-emerald-50 text-emerald-800 text-[10px] p-2.5 rounded-xl border border-emerald-100 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ¡Gracias! Ya enviaste tu recomendación.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div>
                                <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Calificación (1-5)</label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => setReviewRating(star)}
                                      className="focus:outline-none"
                                    >
                                      <Star 
                                        className={`w-4 h-4 ${
                                          star <= reviewRating 
                                            ? 'fill-amber-400 text-amber-400' 
                                            : 'text-slate-300 hover:text-amber-300'
                                        }`} 
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <textarea
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  placeholder="Escribe tu recomendación o feedback para este mentor..."
                                  className="textarea textarea-bordered textarea-xs w-full rounded-xl text-xs h-16 leading-tight focus:ring-1 focus:ring-violet-500 outline-none"
                                />
                              </div>

                              <button
                                onClick={handleSendReview}
                                disabled={!reviewComment.trim()}
                                className="btn btn-primary btn-xs w-full text-white font-bold rounded-lg h-7"
                              >
                                Enviar Recomendación
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {(selectedAgendaSession.status === 'pending' || selectedAgendaSession.status === 'accepted') && (
                      <div className="pt-2 border-t border-slate-200">
                        <button
                          onClick={() => handleAnnulStudentSession(selectedAgendaSession.id)}
                          className="btn btn-outline btn-error btn-xs w-full text-xs font-bold rounded-xl py-1.5 h-auto"
                        >
                          Anular Solicitud
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                    <Calendar className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-700">Ninguna sesión seleccionada</p>
                    <p className="text-[10px] text-slate-400 max-w-[200px] mt-1">Haz clic en alguna de tus sesiones en el calendario para ver detalles y dejar recomendaciones.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  setShowStudentCalendarModal(false)
                  setSelectedAgendaSession(null)
                }}
                className="btn btn-primary text-white rounded-xl text-xs px-6"
              >
                Cerrar Calendario
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: CELEBRATION BENEFIT MODAL */}
      {showCelebrationModal && (
        <div 
          onClick={() => setShowCelebrationModal(false)}
          className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-box max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden text-center"
          >
            {/* Confetti Animation Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="confetti-item absolute bg-rose-500 rounded-full w-2.5 h-2.5 top-0 left-1/4 animate-confetti-fall-1" />
              <div className="confetti-item absolute bg-yellow-500 rounded-full w-2 h-2 top-0 left-1/3 animate-confetti-fall-2" />
              <div className="confetti-item absolute bg-blue-500 rounded-full w-3 h-1.5 top-0 left-1/2 animate-confetti-fall-3" />
              <div className="confetti-item absolute bg-emerald-500 rounded-full w-2 h-3 top-0 left-2/3 animate-confetti-fall-4" />
              <div className="confetti-item absolute bg-violet-500 rounded-full w-2.5 h-2.5 top-0 left-3/4 animate-confetti-fall-5" />
              <div className="confetti-item absolute bg-amber-500 rounded-full w-3 h-3 top-0 left-[85%] animate-confetti-fall-6" />
            </div>

            <style>{`
              @keyframes confetti-fall {
                0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
                100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
              }
              .animate-confetti-fall-1 { animation: confetti-fall 4s linear infinite; }
              .animate-confetti-fall-2 { animation: confetti-fall 3.5s linear infinite 0.5s; }
              .animate-confetti-fall-3 { animation: confetti-fall 5s linear infinite 0.2s; }
              .animate-confetti-fall-4 { animation: confetti-fall 4.5s linear infinite 0.8s; }
              .animate-confetti-fall-5 { animation: confetti-fall 3.8s linear infinite 1.2s; }
              .animate-confetti-fall-6 { animation: confetti-fall 4.2s linear infinite 1.5s; }
            `}</style>

            <div className="relative z-10 space-y-6">
              {/* Icon / Celebration Badge */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-emerald-100 to-teal-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner animate-bounce">
                <Award className="w-10 h-10 text-emerald-600 stroke-[1.5]" />
              </div>

              {/* Title */}
              <div>
                <h3 className="font-black text-2xl text-slate-800 leading-tight">
                  ¡Felicitaciones, Mentor UTP!
                </h3>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-1.5">
                  Excelencia Académica & Compromiso Social
                </p>
              </div>

              {/* Badges container */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 py-1">
                <span className="badge badge-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-4 py-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Excelencia Académica
                </span>
                <span className="badge badge-lg bg-violet-50 text-violet-700 border border-violet-200 font-extrabold text-xs px-4 py-3 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-violet-600 fill-violet-200" /> Apoyo y Voluntariado
                </span>
              </div>

              {/* Main Message */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-3 shadow-inner">
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  ¡Felicidades! Obtuviste un <strong>10% de descuento</strong> aplicable a tu matrícula y pensión en el próximo ciclo académico.
                </p>
                <div className="h-px bg-slate-200/60" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  📧 Adicionalmente, en tu <strong>correo institucional</strong> recibirás tu <strong>Certificado Oficial de Voluntariado en Mentoría de Empleabilidad</strong> para validar tus horas extracurriculares.
                </p>
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  onClick={() => setShowCelebrationModal(false)}
                  className="btn btn-primary text-white rounded-2xl w-full py-3 font-bold shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                >
                  Entendido, ¡muchas gracias!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast toast-end fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`alert text-white rounded-2xl shadow-xl flex items-center gap-2 py-3 px-4 text-xs font-semibold ${
            toast.type === 'success' ? 'alert-success bg-emerald-600' : 'alert-info bg-blue-600'
          }`}>
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </PageShell>
  )
}
