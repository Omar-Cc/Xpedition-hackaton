"use client";

import { useState, useEffect } from "react";
import { Bell, Moon, Sun, ExternalLink, ChevronDown, Menu, LogOut, User, Sparkles } from "lucide-react";
import { studentProfile } from "@/src/features/dashboard/data/mock-data";
import Link from "next/link";
import UtpEmpleaLogo from "./UtpEmpleaLogo";
import StudentAvatar from "./StudentAvatar";

interface TopBannerProps {
  onMenuClick?: () => void;
  onStartTutorial?: () => void;
}

export default function TopBanner({ onMenuClick, onStartTutorial }: Readonly<TopBannerProps>) {
  const firstName = studentProfile.name.split(" ")[0];
  const fullName = studentProfile.name;
  const pct = studentProfile.completionPercent;

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme =
      savedTheme || (document.documentElement.dataset.theme as "light" | "dark") || "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="md:h-18 h-14 bg-base-100 text-base-content md:px-6 flex items-center justify-between gap-4 shadow-sm border-b border-base-200">
      {/* Hamburger Menu on Mobile */}
      <button
        onClick={onMenuClick}
        className="h-14 text-white cursor-pointer flex lg:hidden bg-navy px-4 items-center justify-center"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Lado izquierdo: Logo, Progreso y Bienvenida */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 h-full">
        <UtpEmpleaLogo className="mr-3" />

        <div className="w-px h-6 bg-base-300 mx-1 hidden xl:block"></div>


      </div>

      {/* Lado derecho: Botones, Tema, Notificaciones y Perfil */}
      <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <button
          onClick={onStartTutorial}
          className="btn btn-sm btn-ghost text-violet-650 hover:text-violet-850 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/20 font-bold px-2.5 flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span>Tutorial</span>
        </button>

        <div className="w-px h-6 bg-base-300 mx-1 hidden sm:block"></div>

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

        <div className="w-px h-6 bg-base-300 mx-1 hidden md:block"></div>

        {/* Toggle Dark Mode */}
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200 hidden md:inline-flex">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <Sun className="swap-off w-6 h-6" />
          <Moon className="swap-on w-6 h-6" />
        </label>

        {/* Notificaciones */}
        <div className="indicator mr-1">
          <span className="indicator-item badge bg-[#f59e0b] border-none text-white text-[10px] font-bold w-5 h-5 p-0 rounded-full me-2 mt-3.5">
            4
          </span>
          <button
            className="btn btn-ghost btn-circle btn-sm hover:bg-base-200"
            aria-label="Notificaciones"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>

        <div className="w-px h-6 bg-base-300 mx-1 hidden md:block"></div>

        {/* Info del Perfil con Dropdown de Cerrar Sesión */}
        <div className="dropdown dropdown-end hidden md:inline-block">
          <div 
            tabIndex={0} 
            role="button" 
            className="flex items-center gap-3 cursor-pointer hover:bg-base-200/50 p-1.5 rounded-xl transition-colors"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-base-content leading-tight">
                Hola, {fullName}
              </p>
              <p className="text-xs text-primary leading-tight font-medium mt-0.5">
                {studentProfile.career}
              </p>
            </div>
            <StudentAvatar fullName={fullName} />
            <ChevronDown className="w-4 h-4 text-base-content/50" />
          </div>
          <ul 
            tabIndex={0} 
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200 mt-2 z-[100]"
          >
            <li>
              <Link href="/mi-perfil" className="text-sm py-2 px-3 hover:bg-base-200 rounded-lg flex items-center gap-2">
                <User className="w-4 h-4 text-base-content/60" />
                Mi Perfil
              </Link>
            </li>
            <div className="h-px bg-base-200 my-1"></div>
            <li>
              <Link href="/login" className="text-sm py-2 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg flex items-center gap-2 font-medium">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
