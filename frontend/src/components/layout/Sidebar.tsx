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
  UserCircle,
  X,
} from 'lucide-react'
import { studentProfile } from '@/src/features/dashboard/data/mock-data'

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: Home },
  { href: '/mi-perfil', label: 'Mi Perfil', icon: UserCircle },
  { href: '/job-match', label: 'Job match', icon: Search },
  { href: '/cv-builder', label: 'Constructor de CV IA', icon: FileText },
  { href: '/simulator', label: 'Simulador de entrevistas', icon: Mic },
  { href: '/plan-30d', label: 'Planificación', icon: Calendar },
  { href: '/cursos', label: 'Aprende +', icon: BookOpen },
  { href: '/mentoria', label: 'Mentoría', icon: Users },
  { href: '/seguimiento', label: 'Seguimiento', icon: Activity },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-[110] flex h-dvh w-64 shrink-0 flex-col overflow-hidden bg-navy text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0 lg:flex
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">EmpléaUTP</h1>
            <p className="text-xs text-white/50 mt-0.5">Asistente de empleabilidad</p>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
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
              <div className="bg-white/20 text-white w-9 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">{studentProfile.avatarInitial}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}