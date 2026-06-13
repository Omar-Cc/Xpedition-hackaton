export interface CourseStat {
  label: string
  value: number
  bgClass: string
  textClass: string
}

export interface CourseMatch {
  requirement: string
  course: string
  grade: number
  status: 'covered' | 'partial' | 'gap'
  hasLink?: boolean
}

export interface TopCourse {
  id: string
  name: string
  grade: number
  professor: string
  period: string
  tags: string[]
}
