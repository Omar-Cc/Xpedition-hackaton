import LoginForm from "../../src/components/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Iniciar Sesión | UTP+ Empléa",
  description: "Ingresa a tu cuenta para continuar",
};

export default function LoginPage() {
  return (
    <div data-theme="light" className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative bg-[#ffffff] overflow-hidden font-sans">
      
      {/* Botón Volver al inicio flotante */}
      <div className="absolute top-6 left-6 z-30">
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-white/70 backdrop-blur-md py-2 px-4 rounded-full border border-slate-200/50 shadow-sm"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          Volver al inicio
        </Link>
      </div>

      {/* Columna Izquierda: Ilustración y Branding Visual (Oculto en móvil) */}
      <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-[#E6EFFF] via-[#F2F6FF] to-[#FAF8FF] relative overflow-hidden select-none border-r border-slate-100">
        {/* Elementos abstractos de fondo */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-400/10 blur-[120px] pointer-events-none"></div>

        {/* Tarjeta de la Ilustración con micro-animación de flotación */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-6 transition-all duration-700 hover:scale-[1.02]">
          <div className="relative w-full h-full animate-float">
            <Image
              src="/login-illustration.png"
              alt="UTP Emplea Ilustración de Login"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="flex items-center justify-center p-6 relative bg-[#ffffff]">
        {/* Luces de fondo sutiles para "esencia visual" */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none"></div>

        <div className="w-full flex justify-center z-10 animate-fadeIn">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

