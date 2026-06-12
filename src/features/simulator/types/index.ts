export interface SessionInfo {
  label: string
  value: string
  highlight?: boolean
}

export interface PreviousAnswer {
  id: string
  question: string
  score: number
  feedback: string
  scoreColor: string
}
