"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ArrowLeft,
  Menu,
  LogOut,
} from "lucide-react";
import { studentProfile } from "@/src/features/dashboard/data/mock-data";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/mi-perfil", label: "Mi Perfil", icon: UserCircle },
  { href: "/job-match", label: "Job match", icon: Search },
  { href: "/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/simulator", label: "Entrevistas", icon: Mic },
  { href: "/plan-30d", label: "Planificación", icon: Calendar },
  { href: "/cursos", label: "Aprende +", icon: BookOpen },
  { href: "/mentoria", label: "Mentoría", icon: Users },
  { href: "/seguimiento", label: "Seguimiento", icon: Activity },
];

interface SidebarProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface SidebarLinkProps extends NavItem {
  isActive: boolean;
  variant: "compact" | "drawer";
  onClick?: () => void;
}

/**
 * SidebarLink handles the layout differences between the compact sidebar (desktop)
 * and the wide drawer list (mobile/expanded desktop).
 */
function SidebarLink({
  href,
  label,
  icon: Icon,
  isActive,
  variant,
  onClick,
}: Readonly<SidebarLinkProps>) {
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={`relative flex flex-col items-center justify-center text-center py-4.5 px-1 text-xs transition-all ${
          isActive ? "bg-[#eff6ff] text-navy border-l-4 border-[#e30613]" : "text-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <Icon className={`w-6 h-6 ${isActive ? "text-navy" : "text-white"}`} />
          <span className="leading-tight mt-1">{label}</span>
        </div>
      </Link>
    );
  }
/* flex items-center gap-10 px-5 py-3.5 text-sm w-full */
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`h-20 flex items-center gap-10 px-5 py-5 text-sm transition-all ${
        isActive ? "bg-[#eff6ff] text-navy border-l-4 border-[#e30613]" : "text-white"
      }`}
    >
      <Icon className={`w-6 h-6 ${isActive ? "text-navy" : "text-white"}`} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ isOpen, onOpen, onClose }: Readonly<SidebarProps>) {
  const pathname = usePathname();
  const fullName = studentProfile.name ?? "Estudiante";
  const email = studentProfile.email ?? "estudiante@utp.edu.pe";

  return (
    <>
      {/* 1. COMPACT SIDEBAR (Desktop Only - Permanent) */}
      <aside className="hidden lg:flex sticky top-0 h-dvh w-22 shrink-0 flex-col overflow-hidden bg-navy text-white z-100">
        {/* Hamburger Menu button to expand the sidebar drawer */}
        <button
          onClick={onOpen}
          className="h-18 w-full flex items-center justify-center bg-navy text-white cursor-pointer lg:mx-auto"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        <nav className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink
              key={item.href}
              {...item}
              isActive={pathname === item.href}
              variant="compact"
            />
          ))}
        </nav>
      </aside>

      {/* 2. DRAWER OVERLAY BACKDROP (Mobile & Desktop) */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-115 bg-[#000f37]/25 border-none cursor-default"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}

      {/* 3. EXPANDED SIDEBAR DRAWER (Mobile & Desktop Overlay) */}
      <aside
        className={`fixed inset-y-0 left-0 z-120 flex h-dvh w-72 shrink-0 flex-col overflow-hidden bg-navy text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-18 w-full flex items-center justify-between bg-navy px-6">
          {/* Profile info - MOBILE ONLY */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-[#4fd1c5] text-white flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}&backgroundColor=4fd1c5`}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="text-left min-w-0">
              <h4 className="text-xs font-bold text-white truncate max-w-37.5">
                ¡Hola {fullName}!
              </h4>
              <p className="text-[9px] text-white/50 truncate max-w-37.5">
                {email}
              </p>
            </div>
          </div>

          {/* Desktop Drawer Back Arrow (Left aligned) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onClose}
              className="text-white cursor-pointer px-2 py-6"
              aria-label="Cerrar menú"
            >
              <ArrowLeft className="w-8.25 h-8.25" />
            </button>
          </div>

          {/* Mobile Drawer Close Arrow (Right aligned) */}
          <button
            onClick={onClose}
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar menú"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Navigation (Wider, list-style, more space between links) */}
        <nav className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink
              key={item.href}
              {...item}
              isActive={pathname === item.href}
              variant="drawer"
              onClick={onClose}
            />
          ))}
               {/* Drawer Footer - MOBILE ONLY (Cerrar Sesion button) */}
          <div className="lg:hidden shrink-0 bg-navy p-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-10 px-5 py-3.5 text-sm font-semibold w-full"
            >
              <LogOut className="w-6 h-6" />
              <span>Cerrar sesión</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
