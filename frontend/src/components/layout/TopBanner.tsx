"use client";

import { useState, useEffect } from "react";
import { Bell, Moon, Sun, ExternalLink, ChevronDown, Menu } from "lucide-react";
import { studentProfile } from "@/src/features/dashboard/data/mock-data";
import Link from "next/link";
import UtpEmpleaLogo from "./UtpEmpleaLogo";
import StudentAvatar from "./StudentAvatar";

interface TopBannerProps {
  onMenuClick?: () => void;
}

export default function TopBanner({ onMenuClick }: Readonly<TopBannerProps>) {
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

        <div
          className="radial-progress text-primary flex-shrink-0 hidden lg:inline-grid"
          style={
            {
              "--value": String(pct),
              "--size": "2.6rem",
              "--thickness": "3px",
            } as React.CSSProperties
          }
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`Perfil completado al ${pct}%`}
        >
          <span className="text-[10px] font-bold text-base-content">{pct}%</span>
        </div>

        <div className="min-w-0 hidden md:block">
          <p className="text-[9px] text-base-content/50 uppercase tracking-wider mb-0.5 font-bold">
            Bienvenido de vuelta
          </p>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold">Hola, {firstName}</h2>
            <span className="text-xs text-base-content/60 border-l border-base-300 pl-3">
              Tu perfil está al {pct}% — complétalo para destacar
            </span>
          </div>
        </div>
      </div>

      {/* Lado derecho: Botones, Tema, Notificaciones y Perfil */}
      <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
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

        {/* Info del Perfil */}
        <div className="hidden md:flex items-center gap-3 cursor-pointer hover:bg-base-100 p-1.5 rounded-xl transition-colors">
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
      </div>
    </div>
  );
}
