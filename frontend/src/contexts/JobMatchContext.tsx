"use client"

import React, { createContext, useContext, useState } from 'react'

export type JobItem = {
  id: string
  initial: string
  avatarColor: string
  matchPercent: number
  title: string
  company: string
  status: string
  statusColor: 'success' | 'warning' | 'error'
  location: string
  mode: string
  salaryMin: number
  salaryMax: number
  level: string
  ageMin: number
  ageMax: number
  tags: string[]
  highlight?: string
  requirement: string
  description: string
  functions: string[]
  skills: string[]
  matchFeedback: string
  matchMissing: string
  source: string
  contractType: string
  postedDate: string
}

type JobMatchContextType = {
  matchedJobs: JobItem[]
  setMatchedJobs: React.Dispatch<React.SetStateAction<JobItem[]>>
  matchesDrawerOpen: boolean
  setMatchesDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const JobMatchContext = createContext<JobMatchContextType | undefined>(undefined)

export function JobMatchProvider({ children }: { children: React.ReactNode }) {
  const [matchedJobs, setMatchedJobs] = useState<JobItem[]>([])
  const [matchesDrawerOpen, setMatchesDrawerOpen] = useState(false)

  return (
    <JobMatchContext.Provider value={{ matchedJobs, setMatchedJobs, matchesDrawerOpen, setMatchesDrawerOpen }}>
      {children}
    </JobMatchContext.Provider>
  )
}

export function useJobMatch() {
  const context = useContext(JobMatchContext)
  if (context === undefined) {
    throw new Error('useJobMatch must be used within a JobMatchProvider')
  }
  return context
}
