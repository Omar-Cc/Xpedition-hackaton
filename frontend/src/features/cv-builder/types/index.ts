export interface CVStep {
  id: number
  label: string
}

export interface DetectedKeyword {
  text: string
  colorClass: string
}

export interface SkillMatch {
  skill: string
  status: 'covered' | 'gap'
}
