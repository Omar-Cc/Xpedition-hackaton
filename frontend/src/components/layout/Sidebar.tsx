"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { studentProfile } from "@/src/features/dashboard/data/mock-data";

const navItems = [
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

export default function Sidebar({ isOpen, onOpen, onClose }: Readonly<SidebarProps>) {
  const pathname = usePathname();
  const fullName = studentProfile.name;
  const email = studentProfile.email;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.window.matchMedia("(max-width: 767.9px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return (
    <>
      {isMobile ? null : (
        <>
          {/* 1. COMPACT SIDEBAR (Desktop Only - Permanent) */}
          <aside className="hidden lg:flex sticky top-0 h-dvh w-22.25 shrink-0 flex-col overflow-hidden bg-navy text-white z-100">
            <div className="h-18 w-full flex items-center justify-center bg-navy border-b border-white/10 shrink-0">
              {/* Hamburger Menu button to expand the sidebar drawer */}
              <button
                onClick={onOpen}
                className="text-white cursor-pointer lg:mx-auto"
                aria-label="Abrir menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex flex-col items-center justify-center text-center py-4 text-xs ${
                      isActive ? "bg-[#eff6ff] text-navy border-l-4 border-[#e30613]" : "text-white"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-navy" : "text-white/70"}`} />
                    <span className="leading-tight mt-1">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          {/* 2. DRAWER OVERLAY BACKDROP (Mobile & Desktop) */}
          {isMobile && isOpen && (
            <button
              type="button"
              className="fixed inset-0 z-115 bg-[#000f37]/25 border-none cursor-default"
              onClick={onClose}
              aria-label="Cerrar menú"
            />
          )}
        </>
      )}

      {/* 3. EXPANDED SIDEBAR DRAWER (Mobile & Desktop Overlay) */}
      <aside
        className={`fixed inset-y-0 left-0 z-120 flex h-dvh w-65 shrink-0 flex-col overflow-hidden bg-navy text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Drawer Close Arrow (Right aligned) */}
        {isMobile && (
          <div className="flex justify-end h-15">
            <button
              onClick={onClose}
              className="lg:hidden p-6 text-white cursor-pointer"
              aria-label="Cerrar menú"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="h-18 w-full flex items-center justify-betweenshrink-0 bg-navy px-6">
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
              <p className="text-[9px] text-white/50 truncate max-w-37.5">{email}</p>
            </div>
          </div>

          {/* Desktop Drawer Back Arrow (Left aligned) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onClose}
              className="text-white cursor-pointer px-2"
              aria-label="Cerrar menú"
            >
              <ArrowLeft className="w-8.25 h-8.25" />
            </button>
          </div>
        </div>

        {/* Drawer Navigation (Wider, list-style, more space between links) */}
        <nav className="flex-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-10 px-5 py-7.25 text-sm transition-all ${
                  isActive ? "bg-[#eff6ff] text-navy border-l-4 border-[#e30613]" : "text-white"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-navy" : "text-white"}`} />
                <span>{label}</span>
              </Link>
            );
          })}
          {/* Drawer Footer - MOBILE ONLY (Cerrar Sesion button) */}
          <div className="lg:hidden shrink-0 bg-navy p-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-10 px-5 py-3.5 text-sm w-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar sesión</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
