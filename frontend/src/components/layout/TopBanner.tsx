import { Bell, Moon, Sun, ExternalLink, ChevronDown, Menu } from 'lucide-react'
import { studentProfile } from '@/src/features/dashboard/data/mock-data'
import Link from 'next/link'

interface TopBannerProps {
  onMenuClick?: () => void
}

export default function TopBanner({ onMenuClick }: TopBannerProps) {
  const firstName = studentProfile.name.split(' ')[0]
  const fullName = studentProfile.name
  const pct = studentProfile.completionPercent

  return (
    <div className="bg-white text-base-content px-4 md:px-6 py-4 flex items-center justify-between gap-4 shadow-sm border-b border-base-200">
      {/* Lado izquierdo: Progreso y Bienvenida */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        {/* Hamburger Menu on Mobile */}
        <button
          onClick={onMenuClick}
          className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200 lg:hidden flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          className="radial-progress text-primary flex-shrink-0"
          style={
            {
              '--value': String(pct),
              '--size': '3rem',
              '--thickness': '3px',
            } as React.CSSProperties
          }
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`Perfil completado al ${pct}%`}
        >
          <span className="text-xs font-bold text-base-content">{pct}%</span>
        </div>

        <div className="min-w-0 hidden md:block">
          <p className="text-[10px] text-base-content/50 uppercase tracking-wider mb-0.5 font-bold">
            Bienvenido de vuelta
          </p>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">
              Hola, {firstName}
            </h2>
            <span className="text-xs text-base-content/60 border-l border-base-300 pl-3">
              Tu perfil está al {pct}% — complétalo para destacar
            </span>
          </div>
        </div>
      </div>

      {/* Lado derecho: Botones, Tema, Notificaciones y Perfil */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
        <Link 
          href="https://portal.utp.edu.pe" 
          target="_blank" 
          className="btn btn-sm btn-ghost text-base-content/70 hover:text-primary hover:bg-primary/10 font-medium px-2 hidden sm:inline-flex"
        >
          Portal UTP <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </Link>
        <Link 
          href="https://class.utp.edu.pe" 
          target="_blank" 
          className="btn btn-sm btn-ghost text-base-content/70 hover:text-primary hover:bg-primary/10 font-medium px-2 hidden sm:inline-flex"
        >
          Class <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </Link>

        <div className="w-px h-6 bg-base-300 mx-1 hidden sm:block"></div>

        {/* Toggle Dark Mode */}
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200">
          <input type="checkbox" className="theme-controller" value="dark" />
          <Sun className="swap-off w-5 h-5" />
          <Moon className="swap-on w-5 h-5" />
        </label>

        {/* Notificaciones */}
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-xs p-0 min-w-2 min-h-2" />
          <button
            className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <div className="w-px h-6 bg-base-300 mx-1 hidden sm:block"></div>

        {/* Info del Perfil */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-base-100 p-1.5 rounded-xl transition-colors">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold text-base-content leading-tight">
              Hola, {fullName}
            </p>
            <p className="text-xs text-primary leading-tight font-medium mt-0.5">
              {studentProfile.career}
            </p>
          </div>
          <div className="avatar">
            <div className="w-9 h-9 rounded-full bg-[#4fd1c5] text-white flex items-center justify-center overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}&backgroundColor=4fd1c5`} alt="Avatar" />
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-base-content/50" />
        </div>
      </div>
    </div>
  )
}
