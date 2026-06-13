import type { ComponentType } from 'react'

export interface StudentProfile {
  name: string
  career: string
  completionPercent: number
  avatarInitial: string
}

export interface StatItem {
  label: string
  value: string
  colorClass: string
}

export interface QuickAction {
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  bgColorClass: string
  iconColorClass: string
  href: string
}

export interface JobMatch {
  id: string
  companyInitial: string
  avatarColor: string
  matchPercent: number
  title: string
  company: string
  tags: string[]
}

export interface Mentor {
  name: string
  position: string
  company: string
  timeAgo: string
  avatarInitial: string
}

export interface ProgressItem {
  label: string
  current: number
  total: number
  colorClass: string
}

export interface NewsItem {
  id: string
  title: string
  imageUrl: string
  link: string
}
