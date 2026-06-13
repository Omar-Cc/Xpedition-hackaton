'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Search,
  FileText,
  Mic,
  Calendar,
  BookOpen,
  Users,
  Activity,
} from 'lucide-react'
import { studentProfile } from '@/src/features/dashboard/data/mock-data'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/job-match', label: 'Job match', icon: Search },
  { href: '/cv-builder', label: 'CV Builder', icon: FileText },
  { href: '/simulator', label: 'Simulator', icon: Mic },
  { href: '/plan-30d', label: 'Mi plan 30d', icon: Calendar },
  { href: '/cursos', label: 'Mis cursos', icon: BookOpen },
  { href: '/mentoria', label: 'Mentoría', icon: Users },
  { href: '/seguimiento', label: 'Seguimiento', icon: Activity },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-navy text-white flex-shrink-0">
      <div className="p-6 pb-4">
        <h1 className="text-lg font-bold tracking-tight">EmpléaUTP</h1>
        <p className="text-xs text-white/50 mt-0.5">Asistente de empleabilidad</p>
      </div>

      <nav className="flex-1 px-3 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-placeholder">
            <div className="bg-white/20 text-white w-9 rounded-full">
              <span className="text-sm font-semibold">{studentProfile.avatarInitial}</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{studentProfile.name}</p>
            <p className="text-xs text-white/50 truncate">{studentProfile.career}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
