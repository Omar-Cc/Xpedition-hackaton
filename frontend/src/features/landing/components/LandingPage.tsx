"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Brain,
  Search,
  Award,
  TrendingUp,
  UserCheck,
  FileText,
  CheckCircle2,
  ChevronDown,
  Clock,
  Target,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Compass,
  BarChart3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Componente para animaciones de entrada al hacer scroll (Scroll-Triggered Animations)
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
      },
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);

  // Datos para la sección interactiva de Match Score
  const jobMatches = [
    {
      title: "Practicante Pre-Profesional de Análisis de Datos",
      company: "Interbank",
      matchScore: 92,
      skillsHave: ["SQL Básico", "Excel Avanzado", "PowerBI"],
      skillsMissing: ["Python para Datos", "Estadística Descriptiva"],
      category: "Tecnología",
    },
    {
      title: "Asistente de Marketing Digital",
      company: "Alicorp S.A.",
      matchScore: 78,
      skillsHave: ["Google Analytics", "Content Creation", "Social Media"],
      skillsMissing: ["SEO Avanzado", "Meta Ads Manager"],
      category: "Marketing",
    },
    {
      title: "Practicante de Talento Humano",
      company: "Ferreyros",
      matchScore: 88,
      skillsHave: ["Comunicación Asertiva", "Excel Intermedio", "Dinámicas de Grupo"],
      skillsMissing: ["Legislación Laboral Básica", "Métricas de RRHH"],
      category: "Recursos Humanos",
    },
  ];

  const currentJob = jobMatches[selectedJobIndex];

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-800 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* 1. Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo UTP + emplea (Sin superposición, tamaño estable) */}
          <Link href="/" className="flex items-center gap-1.5 select-none shrink-0">
            <div className="flex gap-0.5">
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                U
              </span>
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                T
              </span>
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                P
              </span>
            </div>
            <span className="text-red-600 font-extrabold text-[22px] px-0.5 leading-none flex items-center">
              +
            </span>
            <span className="text-black font-black text-[22px] tracking-tight font-sans leading-none flex items-center">
              emplea
            </span>
          </Link>

          {/* Desktop Nav Links (Breakpoints ajustados a lg: para evitar colisiones) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-auto px-4">
            <a
              href="#problema"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              ¿Por qué UTP+emplea?
            </a>
            <a
              href="#como-funciona"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              ¿Cómo Funciona?
            </a>
            <a
              href="#funcionalidades"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Funcionalidades
            </a>
            <a
              href="#ruta"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Ruta Guía
            </a>
            <a
              href="#testimonios"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Testimonios
            </a>
            <a
              href="#faq"
              className="text-[14px] font-bold text-slate-600 hover:text-[#005BFF] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Preguntas Frecuentes
            </a>
          </nav>

          {/* Desktop CTAs (Breakpoints a lg: y sin Iniciar Sesión) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/login"
              className="bg-[#005BFF] hover:bg-[#004BD6] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 animate-pulse-cta cursor-pointer"
            >
              Comenzar Ahora
            </Link>
          </div>

          {/* Mobile Menu Toggle (Se activa por debajo de lg) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-700 hover:text-[#005BFF] focus:outline-none p-2 shrink-0 transition-transform duration-200 active:scale-95"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-100 bg-[#ffffff] px-4 pt-2 pb-6 space-y-3 animate-fadeIn absolute left-0 right-0 top-20 shadow-lg z-50">
            <a
              href="#problema"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              ¿Por qué UTP+emplea?
            </a>
            <a
              href="#como-funciona"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              ¿Cómo Funciona?
            </a>
            <a
              href="#funcionalidades"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#ruta"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              Ruta Guía
            </a>
            <a
              href="#testimonios"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              Testimonios
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-bold text-slate-600 hover:bg-blue-50 hover:text-[#005BFF] transition-colors"
            >
              Preguntas Frecuentes
            </a>
            <hr className="border-slate-100 my-2" />
            <div className="flex flex-col gap-2 pt-2 px-3">
              <Link
                href="/login"
                className="w-full text-center bg-[#005BFF] hover:bg-[#004BD6] text-white py-2.5 rounded-lg text-base font-bold shadow-md animate-pulse-cta"
              >
                Comenzar Ahora
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Espaciador para cabecera fija */}
      <div className="h-20"></div>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pb-28 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#F0F5FF]/60 via-[#FAFCFF] to-[#FAFCFF]">
        {/* Glows de fondo */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Contenido Izquierdo */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-semibold">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>Mentoría de Empleabilidad con Inteligencia Artificial</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Acelera tu camino al{" "}
                <span className="text-[#005BFF] relative inline-block">
                  primer empleo
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-blue-200 -z-10 rounded-full"></span>
                </span>{" "}
                con IA
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Construimos tu ruta de empleabilidad personalizada. Analiza tu CV, descubre tu Match
                Score con ofertas reales y prepárate para destacar en el mercado laboral peruano.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/login"
                  className="w-full sm:w-auto bg-[#005BFF] hover:bg-[#004BD6] text-[#ffffff] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Comenzar Gratis
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#como-funciona"
                  className="w-full sm:w-auto border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  ¿Cómo funciona?
                </a>
              </div>

              {/* Estadísticas Rápidas del Hero */}
              <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">+15k</div>
                  <div className="text-xs text-slate-500 font-bold mt-0.5">Vacantes Reales</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">92%</div>
                  <div className="text-xs text-slate-500 font-bold mt-0.5">Match Promedio</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">x3</div>
                  <div className="text-xs text-slate-500 font-bold mt-0.5">Más Entrevistas</div>
                </div>
              </div>
            </div>

            {/* Mockup Derecho */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              {/* Elemento de Fondo Decorativo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/5 rounded-[30px] rotate-2 scale-105 pointer-events-none filter blur-md"></div>

              {/* Ventana de Mockup DaisyUI */}
              <div className="mockup-window border border-slate-200 bg-white shadow-2xl w-full max-w-[540px] relative transition-transform duration-500 hover:scale-[1.02]">
                <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6 space-y-4 font-sans text-left">
                  {/* Perfil del Estudiante */}
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                        JP
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">Juan Pérez</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          9no Ciclo • Ing. de Sistemas (UTP)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        Ruta Activa
                      </span>
                    </div>
                  </div>

                  {/* Progreso de la Ruta */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-blue-600" /> Ruta de Empleabilidad
                      </span>
                      <span className="font-bold text-blue-600">74% Completado</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: "74%" }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Siguiente Hito: Certificación Scrum Master sugerida</span>
                    </div>
                  </div>

                  {/* Recomendación de Ofertas con Match Score */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
                    <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                      Recomendación de Oferta Directa
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800">
                          Practicante de Sistemas de Información
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Alicorp S.A. • Lima (Sugerido por IA)
                        </p>
                      </div>

                      {/* Match Score Circular Mockup */}
                      <div className="flex flex-col items-center shrink-0 ml-2">
                        <div className="w-12 h-12 rounded-full border-[3px] border-blue-500 flex items-center justify-center bg-blue-50">
                          <span className="text-xs font-black text-blue-700">89%</span>
                        </div>
                        <span className="text-[9px] font-bold text-blue-500 mt-1 uppercase">
                          Match
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-semibold">
                        ✓ SQL Server
                      </span>
                      <span className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-semibold">
                        ✓ Metodologías Ágiles
                      </span>
                      <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-full font-semibold">
                        ⚠ Brecha: Python
                      </span>
                    </div>
                  </div>

                  {/* Notificación Flotante de la IA */}
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center gap-3 shadow-md">
                    <Brain className="w-8 h-8 shrink-0 text-blue-200 animate-float" />
                    <div className="text-xs">
                      <span className="font-bold">Analizador de CV:</span> Hemos optimizado la
                      sección de proyectos de tu CV. Tu compatibilidad subió un 15%.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problema Actual (Scroll-Triggered) */}
      <section id="problema" className="py-20 sm:py-28 bg-[#ffffff] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <div className="max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                El Gran Desafío
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                ¿Por qué es tan difícil conseguir tu primer empleo?
              </h2>
              <p className="text-lg text-slate-500 font-light">
                La transición de la universidad al entorno laboral está rota. Los métodos
                tradicionales ya no son suficientes para los perfiles jóvenes.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Tarjeta Problema 1 */}
            <FadeInSection delay={100}>
              <div className="bg-[#FAFCFF] p-8 rounded-2xl border border-slate-200/60 shadow-sm h-full hover:border-blue-400 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  La paradoja de la experiencia
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Te piden experiencia laboral de 1 o 2 años incluso para puestos de prácticas.
                  ¿Cómo vas a demostrar experiencia si nadie te da la primera oportunidad?
                </p>
              </div>
            </FadeInSection>

            {/* Tarjeta Problema 2 */}
            <FadeInSection delay={200}>
              <div className="bg-[#FAFCFF] p-8 rounded-2xl border border-slate-200/60 shadow-sm h-full hover:border-blue-400 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Vacantes genéricas desalineadas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pierdes horas navegando en portales saturados buscando puestos. La mayoría de
                  ofertas tienen requisitos excesivos o no encajan con tus competencias y ciclo
                  académico.
                </p>
              </div>
            </FadeInSection>

            {/* Tarjeta Problema 3 */}
            <FadeInSection delay={300}>
              <div className="bg-[#FAFCFF] p-8 rounded-2xl border border-slate-200/60 shadow-sm h-full hover:border-blue-400 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">El currículum invisible</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Envías decenas de postulaciones por correo o portales y solo recibes silencio. No
                  sabes si el currículum falló por formato, falta de palabras clave o si un software
                  lo descartó.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Solución (Scroll-Triggered) */}
      <section className="py-20 sm:py-28 bg-[#FAFCFF] relative overflow-hidden">
        {/* Luces decorativas */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Imagen/Gráfico izquierdo */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInSection>
                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xl w-full max-w-[450px] relative hover:-rotate-1 transition-transform duration-500">
                  {/* Elemento flotante de IA */}
                  <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2">
                    <Brain className="w-6 h-6 animate-pulse text-blue-200" />
                    <span className="text-xs font-bold">Mentoría IA</span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Consejo del Copiloto de Carrera
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <span className="text-xs text-blue-600 font-bold">
                        Diagnóstico de Habilidades
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Para aplicar a la vacante de *Alicorp*, te falta la habilidad de **Git &
                        GitHub**. Te sugerimos este minicurso gratuito de 2 horas.
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Estimado de compatibilidad: subiría de 74% a 89%
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                        Posponer
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer">
                        Ver Curso sugerido
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Contenido derecho */}
            <div className="lg:col-span-7 space-y-6">
              <FadeInSection delay={150}>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block">
                  La Solución Inteligente
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  No busques empleo a ciegas. Deja que la Inteligencia Artificial sea tu mentor
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  **UTP+emplea** no es una bolsa de trabajo estática. Es un ecosistema completo
                  guiado por modelos de inteligencia artificial que analizan tu perfil, identifican
                  brechas y te muestran cómo cerrarlas paso a paso para asegurarte el puesto.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-slate-800">
                        Dirección y Hitos Claros
                      </h4>
                      <p className="text-sm text-slate-500">
                        Sabrás en qué ciclo capacitarte, qué curso tomar y cuándo postular.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-slate-800">
                        Optimización de CV instantánea
                      </h4>
                      <p className="text-sm text-slate-500">
                        Nuestro algoritmo analiza el texto de tu currículum contra las ofertas de
                        empleo y te da sugerencias de redacción para superar filtros ATS.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-slate-800">
                        Ofertas de mútiples portales en un solo feed
                      </h4>
                      <p className="text-sm text-slate-500">
                        Consolidamos las mejores ofertas del mercado nacional para que no tengas que
                        crear cuentas en decenas de portales.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ¿Cómo Funciona? (Scroll-Triggered) */}
      <section id="como-funciona" className="py-20 sm:py-28 bg-[#ffffff] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <div className="max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Proceso Simple
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Consigue tu empleo ideal en 5 pasos
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Diseñamos un camino gamificado para que construir tu futuro profesional sea un
                proceso estructurado, motivador y claro.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {/* Paso 1 */}
            <FadeInSection delay={50}>
              <div className="space-y-4 flex flex-col items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-slate-50 hover:border-blue-200 transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm relative z-10">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-800">Registro rápido</h3>
                <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed">
                  Conéctate con tus credenciales UTP o tu correo electrónico en segundos.
                </p>
              </div>
            </FadeInSection>

            {/* Paso 2 */}
            <FadeInSection delay={150}>
              <div className="space-y-4 flex flex-col items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-slate-50 hover:border-blue-200 transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm relative z-10">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-800">Diagnóstico IA</h3>
                <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed">
                  Sube tu currículum actual. La IA analizará tus puntos fuertes y habilidades clave.
                </p>
              </div>
            </FadeInSection>

            {/* Paso 3 */}
            <FadeInSection delay={250}>
              <div className="space-y-4 flex flex-col items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-slate-50 hover:border-blue-200 transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm relative z-10">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-800">Ruta de Carrera</h3>
                <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed">
                  Obtén un plan paso a paso con hitos para cerrar brechas y capacitarte.
                </p>
              </div>
            </FadeInSection>

            {/* Paso 4 */}
            <FadeInSection delay={350}>
              <div className="space-y-4 flex flex-col items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-slate-50 hover:border-blue-200 transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm relative z-10">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-800">Match inteligente</h3>
                <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed">
                  Visualiza tu Score de compatibilidad en cada oferta de trabajo activa.
                </p>
              </div>
            </FadeInSection>

            {/* Paso 5 */}
            <FadeInSection delay={450}>
              <div className="space-y-4 flex flex-col items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-slate-50 hover:border-blue-200 transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm relative z-10">
                  5
                </div>
                <h3 className="text-base font-bold text-slate-800">Monitoreo y Éxito</h3>
                <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed">
                  Monitorea el estatus de tus postulaciones y obtén tu contrato.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 6. Funcionalidades Principales (Scroll-Triggered) */}
      <section id="funcionalidades" className="py-20 sm:py-28 bg-[#FAFCFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Herramientas Pro
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Todo lo que necesitas para tu crecimiento profesional
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Consolidamos funcionalidades avanzadas de las mejores plataformas SaaS en una
                interfaz amigable diseñada exclusivamente para estudiantes.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Función 1 */}
            <FadeInSection delay={50}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <FileText className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Analizador de CV Instantáneo
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sube tu CV en formato PDF y nuestro modelo de lenguaje evaluará su estructura,
                  palabras clave e impacto, dándote consejos específicos para optimizarlo.
                </p>
              </div>
            </FadeInSection>

            {/* Función 2 */}
            <FadeInSection delay={150}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Recomendador de Certificaciones
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Compara tu perfil profesional contra las ofertas del mercado y descubre qué
                  certificados (de plataformas aliadas o UTP) darán valor real a tu postulación.
                </p>
              </div>
            </FadeInSection>

            {/* Función 3 */}
            <FadeInSection delay={250}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Identificador de Brechas (Skills Gap)
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Descubre qué habilidades técnicas o blandas te están separando del empleo que
                  sueñas y recibe recomendaciones inmediatas para aprenderlas.
                </p>
              </div>
            </FadeInSection>

            {/* Función 4 */}
            <FadeInSection delay={100}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Search className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Buscador de Ofertas Multicanal
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Agregamos ofertas publicadas en múltiples bolsas laborales del país en un solo
                  lugar. Filtra fácilmente por ciclos, carreras e inclusive modalidad remota.
                </p>
              </div>
            </FadeInSection>

            {/* Función 5 */}
            <FadeInSection delay={200}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Brain className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Simulador de Entrevistas</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Practica tus respuestas a preguntas reales y personalizadas según el puesto al que
                  postulas. La Inteligencia Artificial analizará tus respuestas para darte consejos
                  de mejora.
                </p>
              </div>
            </FadeInSection>

            {/* Función 6 */}
            <FadeInSection delay={300}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm h-full hover:shadow-md hover:border-blue-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Gestor Kanban de Postulaciones
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Di adiós a los excels confusos. Gestiona el estado de cada postulación (Enviado,
                  CV leido, Entrevista, Contratado) en un tablero Kanban interactivo.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 7. Match Inteligente con Empleos (Scroll-Triggered) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Contenido izquierdo */}
            <div className="lg:col-span-5 space-y-6">
              <FadeInSection>
                <span className="text-xs font-bold uppercase tracking-widest text-[#005BFF] bg-blue-50 px-3 py-1.5 rounded-full inline-block">
                  Tecnología de Coincidencia
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  ¿Qué es el Match Score y cómo te beneficia?
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Nuestros algoritmos comparan los requisitos técnicos, académicos y blandos de cada
                  vacante con la información de tu currículum.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  El resultado es un **porcentaje de compatibilidad** en tiempo real. Esto te ayuda
                  a enfocar tus energías en las ofertas donde tienes mayores probabilidades de ser
                  contactado y te muestra exactamente cuáles son las áreas a mejorar para calificar
                  a puestos de mayor nivel.
                </p>

                {/* Controles para interactuar */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Haz clic para ver un ejemplo:
                  </span>
                  <div className="flex flex-col gap-2">
                    {jobMatches.map((job, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedJobIndex(idx)}
                        className={`text-left p-3 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          selectedJobIndex === idx
                            ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <span>
                          {job.company} - {job.category}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${selectedJobIndex === idx ? "translate-x-1" : ""}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Mockup Interactivo derecho */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <FadeInSection delay={150}>
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl w-full max-w-[500px] space-y-6">
                  {/* Cabecera del Empleo */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {currentJob.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                        {currentJob.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-500">
                        {currentJob.company} • Alicorp S.A. • Lima, Perú
                      </p>
                    </div>

                    {/* Score de Match Radial */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-blue-600 transition-all duration-500"
                          strokeWidth="3.2"
                          strokeDasharray={`${currentJob.matchScore}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-sm font-black text-blue-700">
                          {currentJob.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Habilidades */}
                  <div className="space-y-4">
                    {/* Habilidades Disponibles */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Habilidades en tu perfil:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentJob.skillsHave.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Habilidades Faltantes (Brechas) */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-orange-700 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Brechas sugeridas a cerrar:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentJob.skillsMissing.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tip de la IA */}
                  <div className="p-3 bg-blue-50 border border-blue-200/50 rounded-xl text-xs text-blue-700 font-medium">
                    💡 <strong>Tip de la IA:</strong> Postular a este puesto te da{" "}
                    <strong>x3 más probabilidades</strong> de entrevista que el promedio.
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ruta de Empleabilidad (Roadmap Visual) (Scroll-Triggered) */}
      <section id="ruta" className="py-20 sm:py-28 bg-[#FAFCFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <div className="max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Gamificación
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Tu Ruta de Empleabilidad Visual
              </h2>
              <p className="text-lg text-slate-500 font-light">
                La Inteligencia Artificial traza hitos de aprendizaje y postulaciones dinámicas para
                cada ciclo de tu vida universitaria.
              </p>
            </div>
          </FadeInSection>

          {/* Roadmap Grid estilo Notion / Duolingo */}
          <div className="max-w-xl mx-auto space-y-8 relative before:absolute before:inset-y-0 before:left-[27px] before:w-[2px] before:bg-slate-200">
            {/* Hito 1 */}
            <FadeInSection delay={50}>
              <div className="flex gap-6 items-start relative text-left">
                <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md z-10 shrink-0">
                  ✓
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex-1 hover:border-blue-400 transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold text-green-600 tracking-wider">
                    Paso 1 • Completado
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">
                    Optimizar Formato de CV
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Sugerencia de la IA aplicada: redacción ATS estructurada.
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Hito 2 */}
            <FadeInSection delay={150}>
              <div className="flex gap-6 items-start relative text-left">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md z-10 shrink-0">
                  2
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex-1 hover:border-blue-400 transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                    Paso 2 • En Progreso
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">
                    Aprender SQL Intermedio
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Recomendación de curso realizada. Incrementa tu Score de Match en un 18%.
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Hito 3 */}
            <FadeInSection delay={250}>
              <div className="flex gap-6 items-start relative text-left opacity-75">
                <div className="w-14 h-14 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md z-10 shrink-0">
                  3
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex-1 hover:border-blue-400 transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Paso 3 • Pendiente
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">
                    Simulación de Entrevista Técnica
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Se desbloquea tras completar el curso de SQL.
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Hito 4 */}
            <FadeInSection delay={350}>
              <div className="flex gap-6 items-start relative text-left opacity-75">
                <div className="w-14 h-14 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md z-10 shrink-0">
                  4
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex-1 hover:border-blue-400 transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Paso 4 • Objetivo
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">
                    Postular a Prácticas Pre-Profesionales
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    La IA te postulará automáticamente a las ofertas sugeridas.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 9. Dashboard Profesional (Scroll-Triggered) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Dashboard Visual Mockup */}
            <div className="lg:col-span-6 flex justify-center order-last lg:order-first">
              <FadeInSection>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xl w-full max-w-[500px] space-y-4">
                  {/* Stats Header */}
                  <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Índice de Empleabilidad
                      </span>
                      <div className="text-xl font-black text-slate-800">82.4 Puntos</div>
                    </div>
                    <span className="text-[11px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                      ⚡ +12% vs. mes anterior
                    </span>
                  </div>

                  {/* Progreso Habilidades */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5 text-blue-600" /> Cobertura de Habilidades
                      Requeridas
                    </span>

                    <div className="space-y-2">
                      {/* Habilidad 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-slate-600">
                            Herramientas Office (Excel/Word)
                          </span>
                          <span className="font-bold text-slate-800">95%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>

                      {/* Habilidad 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-slate-600">Bases de Datos (SQL)</span>
                          <span className="font-bold text-slate-800">70%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>

                      {/* Habilidad 3 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-slate-600">Idiomas (Inglés)</span>
                          <span className="font-bold text-slate-800">45%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actividad de Postulaciones */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-2.5">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                      <span>Mis Postulaciones</span>
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        Ver todas
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-55 rounded-lg border border-slate-100 text-xs">
                        <span className="font-bold text-slate-800">Analista Junior - Alicorp</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-full text-[10px]">
                          Entrevista
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-55 rounded-lg border border-slate-100 text-xs">
                        <span className="font-bold text-slate-800">Practicante TI - Ferreyros</span>
                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 font-semibold rounded-full text-[10px]">
                          CV Leído
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Contenido derecho */}
            <div className="lg:col-span-6 space-y-6">
              <FadeInSection delay={150}>
                <span className="text-xs font-bold uppercase tracking-widest text-[#005BFF] bg-blue-50 px-3 py-1.5 rounded-full inline-block">
                  Métricas de Crecimiento
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Mide tu crecimiento y mejora tu perfil con dashboards en tiempo real
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Toma el control de tu evolución profesional. Visualiza qué porcentaje de
                  empleabilidad tienes en tu sector, compara tus competencias con las demandas
                  actuales del mercado y mantén un registro claro del estado de tus procesos.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl hover:border-blue-300 transition-colors">
                    <h4 className="text-base font-bold text-slate-800">Dashboard Intuitivo</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Diseñado para entender tus métricas de manera rápida y sin complicaciones.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl hover:border-blue-300 transition-colors">
                    <h4 className="text-base font-bold text-slate-800">Monitoreo 24/7</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Recibe actualizaciones de tus postulaciones en tiempo real sin demoras.
                    </p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Beneficios para el Usuario (Scroll-Triggered) */}
      <section className="py-20 sm:py-28 bg-[#FAFCFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Por qué elegirnos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Los beneficios de contar con un mentor profesional digital
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Desbloquea ventajas competitivas que cambiarán por completo tu experiencia en la
                búsqueda de empleo.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Beneficio 1 */}
            <FadeInSection delay={50}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-4 h-full hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Ahorro del 80% del tiempo</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Olvídate de buscar ofertas en diez plataformas distintas. Tu feed inteligente
                  condensa lo mejor de forma directa.
                </p>
              </div>
            </FadeInSection>

            {/* Beneficio 2 */}
            <FadeInSection delay={150}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-4 h-full hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Entrevistas x3 más probables</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Al postular en ofertas con un alto índice de Match Score, optimizas tus
                  posibilidades de ser contactado.
                </p>
              </div>
            </FadeInSection>

            {/* Beneficio 3 */}
            <FadeInSection delay={250}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-4 h-full hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Preparación profesional real</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Aprende qué habilidades son requeridas de verdad por las empresas peruanas y cómo
                  aplicarlas en entrevistas.
                </p>
              </div>
            </FadeInSection>

            {/* Beneficio 4 */}
            <FadeInSection delay={350}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-4 h-full hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Desarrollo de habilidades</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Obtén recomendaciones precisas de cursos y certificaciones que cerrarán tus
                  brechas en tiempo récord.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 11. Testimonios (Scroll-Triggered) */}
      <section id="testimonios" className="py-20 sm:py-28 bg-[#ffffff] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#005BFF] bg-blue-50 px-3 py-1.5 rounded-full">
                Testimonios
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Testimonios de Estudiantes Exitosos
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Descubre cómo estudiantes universitarios reales usaron nuestra plataforma para
                conseguir sus primeras prácticas y empleos.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <FadeInSection delay={50}>
              <div className="bg-[#FAFCFF] p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-300">
                <p className="text-sm text-slate-600 font-light italic leading-relaxed">
                  "Me sentía perdida buscando prácticas de sistemas en portales genéricos. Al subir
                  mi CV a la plataforma, la IA me aconsejó certificarme en SQL Server y me mostró
                  ofertas con Match del 90%. A las dos semanas, conseguí mi puesto en Interbank."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    SR
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Sofía Ramos</h4>
                    <p className="text-[11px] text-slate-500">
                      Ingeniería de Sistemas - 9no ciclo (UTP)
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Testimonio 2 */}
            <FadeInSection delay={150}>
              <div className="bg-[#FAFCFF] p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-300">
                <p className="text-sm text-slate-600 font-light italic leading-relaxed">
                  "Mi mayor problema era el currículum: enviaba y nadie respondía. El analizador de
                  CV me ayudó a reescribir mis proyectos destacando palabras clave del sector.
                  Además, el simulador de entrevistas me dio la confianza que necesitaba para cerrar
                  el contrato."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    DC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Diego Castro</h4>
                    <p className="text-[11px] text-slate-500">
                      Administración de Empresas - Egresado
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Testimonio 3 */}
            <FadeInSection delay={250}>
              <div className="bg-[#FAFCFF] p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-300">
                <p className="text-sm text-slate-600 font-light italic leading-relaxed">
                  "La ruta de empleabilidad es adictiva. Ver cómo subía mi Score de Match a medida
                  que hacía cursos fue muy motivador. Conecté con ofertas exclusivas que no estaban
                  en otros sitios y conseguí mis prácticas pre-profesionales antes de acabar el
                  ciclo."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    CT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Camila Torres</h4>
                    <p className="text-[11px] text-slate-500">Marketing Digital - 8vo ciclo</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 12. Estadísticas de Impacto (Scroll-Triggered) */}
      <section className="py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <div className="max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Números Reales
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                El impacto del acompañamiento inteligente
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Medimos el crecimiento y empleabilidad de nuestros estudiantes.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInSection delay={50}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:border-blue-300 transition-colors">
                <div className="text-4xl font-black text-[#005BFF]">+5,000</div>
                <h4 className="text-sm font-bold text-slate-800 mt-2">Estudiantes Contratados</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Prácticas y primeros empleos asegurados.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:border-blue-300 transition-colors">
                <div className="text-4xl font-black text-[#005BFF]">95%</div>
                <h4 className="text-sm font-bold text-slate-800 mt-2">
                  Precisión de Recomendación
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Compatibilidad óptima con los requisitos.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={250}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:border-blue-300 transition-colors">
                <div className="text-4xl font-black text-[#005BFF]">12 Días</div>
                <h4 className="text-sm font-bold text-slate-800 mt-2">Tiempo Promedio</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Para ser convocado a tu primera entrevista.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={355}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:border-blue-300 transition-colors">
                <div className="text-4xl font-black text-[#005BFF]">+200</div>
                <h4 className="text-sm font-bold text-slate-800 mt-2">Empresas Aliadas</h4>
                <p className="text-xs text-slate-500 mt-1">Buscando activamente talento joven.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 13. Preguntas Frecuentes (FAQ) (Scroll-Triggered) */}
      <section id="faq" className="py-20 sm:py-28 bg-[#ffffff] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#005BFF] bg-blue-50 px-3 py-1.5 rounded-full">
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-slate-500 font-light">
                ¿Tienes dudas? Aquí respondemos las inquietudes más comunes.
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <FadeInSection delay={50}>
              <details className="group border border-slate-200 rounded-2xl bg-[#FAFCFF] p-4 transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-base sm:text-lg">
                  <span>¿La plataforma tiene algún costo para los estudiantes?</span>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
                  No, **UTP+emplea** es completamente gratuito para los estudiantes universitarios y
                  egresados de la UTP. Nuestro objetivo es ayudarte a conseguir tus prácticas
                  pre-profesionales, profesionales y tu primer empleo formal.
                </p>
              </details>
            </FadeInSection>

            {/* FAQ 2 */}
            <FadeInSection delay={150}>
              <details className="group border border-slate-200 rounded-2xl bg-[#FAFCFF] p-4 transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-base sm:text-lg">
                  <span>¿Cómo funciona la Inteligencia Artificial de la plataforma?</span>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
                  Nuestros modelos de Procesamiento de Lenguaje Natural (NLP) analizan el contenido
                  de tu currículum (habilidades, educación, proyectos) y lo comparan con miles de
                  requisitos reales de ofertas de trabajo en Perú. Con eso calcula tu **Match
                  Score** y te sugiere qué habilidades te faltan y qué cursos tomar.
                </p>
              </details>
            </FadeInSection>

            {/* FAQ 3 */}
            <FadeInSection delay={250}>
              <details className="group border border-slate-200 rounded-2xl bg-[#FAFCFF] p-4 transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-base sm:text-lg">
                  <span>¿Qué empresas publican ofertas en la plataforma?</span>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
                  Consolidamos ofertas de múltiples fuentes laborales y de empresas líderes aliadas
                  que buscan talento joven y en desarrollo, como bancos nacionales, corporativos
                  alimenticios, retail y empresas tecnológicas de rápido crecimiento.
                </p>
              </details>
            </FadeInSection>

            {/* FAQ 4 */}
            <FadeInSection delay={350}>
              <details className="group border border-slate-200 rounded-2xl bg-[#FAFCFF] p-4 transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-base sm:text-lg">
                  <span>¿La plataforma me ayuda a prepararme para entrevistas?</span>
                  <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
                  Sí. Contamos con un **Simulador de Entrevistas** impulsado por IA. Te dará
                  preguntas reales comunes de tu sector, evaluará la estructura de tus respuestas y
                  te aconsejará cómo responder con mayor impacto técnico e interpersonal.
                </p>
              </details>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#FAFCFF] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-blue-400/20 blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6 relative z-10">
                <div className="flex gap-1.5 select-none shrink-0">
                  <div className="flex gap-0.5">
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                      U
                    </span>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                      T
                    </span>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-[18px] rounded-[3px] leading-none">
                      P
                    </span>
                  </div>
                  <span className="text-red-600 font-extrabold text-[22px] px-0.5 leading-none flex items-center">
                    +
                  </span>
                  <span className="text-black font-black text-[22px] tracking-tight font-sans leading-none flex items-center">
                    emplea
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Tu asistente inteligente de empleabilidad UTP
                </h2>
                <p className="text-base sm:text-lg text-blue-200 font-light leading-relaxed">
                  Mejora tu perfil, adapta tu CV, practica entrevistas y sigue un plan personalizado
                  para postular a tus primeras prácticas con más seguridad.
                </p>

                <div className="pt-4 flex justify-center">
                  <Link
                    href="/login"
                    className="w-full sm:w-auto bg-[#ffffff] text-blue-700 hover:bg-slate-50 px-10 py-4.5 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Ingresar con mi cuenta UTP
                  </Link>
                </div>

                <div className="text-[11px] text-blue-200 font-medium pt-2">
                  Acceso seguro con tu correo institucional.
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <footer className="bg-[#000F37] text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Branding */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-1.5 select-none">
                <div className="flex gap-0.5">
                  <span className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-[16px] rounded-[3px] leading-none">
                    U
                  </span>
                  <span className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-[16px] rounded-[3px] leading-none">
                    T
                  </span>
                  <span className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-[16px] rounded-[3px] leading-none">
                    P
                  </span>
                </div>
                <span className="text-red-500 font-extrabold text-[20px] px-0.5 leading-none">
                  +
                </span>
                <span className="text-white font-black text-[20px] tracking-tight font-sans leading-none">
                  emplea
                </span>
              </Link>
              <p className="text-xs leading-relaxed text-slate-500">
                Plataforma interactiva impulsada por Inteligencia Artificial para potenciar la
                empleabilidad y conectar el talento joven con el mercado laboral.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Plataforma</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#como-funciona" className="hover:text-white transition-colors">
                    ¿Cómo Funciona?
                  </a>
                </li>
                <li>
                  <a href="#funcionalidades" className="hover:text-white transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#ruta" className="hover:text-white transition-colors">
                    Ruta de Empleabilidad
                  </a>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Match Score
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links 2 */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Compañía</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#testimonios" className="hover:text-white transition-colors">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Soporte Técnico
                  </Link>
                </li>
              </ul>
            </div>

            {/* Alianzas */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Acreditaciones
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                En alianza con empresas líderes nacionales y bolsas de talento universitario a nivel
                nacional.
              </p>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-bold">
                  UTP PRO
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-bold">
                  IA APPROVED
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-800 my-8" />

          {/* Copyrights */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <span>
              © {new Date().getFullYear()} Desarrollado con ❤️ por el equipo{" "}
              <strong>Innovative Minds</strong> para la Hackathon UTP+ by Xpedition.
            </span>

            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
