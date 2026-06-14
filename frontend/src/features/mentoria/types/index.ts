export interface MentorProfile {
  id: string
  name: string
  career: string
  semester: string
  company: string
  skills: string[]
  bio: string
  rating: number
  sessions: number
  sessionsBooked: number
  avatarInitial: string
  avatarColor: string
  isOnline: boolean
}

export interface MiniMentor {
  id: string
  name: string
  company: string
  rating: number
  avatarInitial: string
  avatarColor: string
}

export interface Connection {
  id: string
  name: string
  company: string
  avatarInitial: string
  avatarColor: string
}
