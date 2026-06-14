"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Conectando al backend con:", { codigo, password });
      
      // TODO: Reemplazar con el fetch real al backend
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: codigo, password }), // Mantener compatibilidad de payload si se usaba email
      // });
      // if (!response.ok) throw new Error('Credenciales inválidas');
      
      // Simulando delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("¡Login exitoso!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] px-4 py-6 sm:px-6">
      {/* Logo y Encabezado */}
      <div className="flex flex-col items-center mb-8">
        {/* Logo UTP + emplea */}
        <div 
          className="flex items-center justify-center select-none mb-6"
          style={{ width: "310px", height: "50px" }}
        >
          {/* UTP squares: each is 50px * 50px, gap 4px between them */}
          <div className="flex gap-[4px] h-full items-center">
            <span className="w-[50px] h-[50px] bg-black text-white flex items-center justify-center font-bold text-[26px] rounded-[3px] leading-none">U</span>
            <span className="w-[50px] h-[50px] bg-black text-white flex items-center justify-center font-bold text-[26px] rounded-[3px] leading-none">T</span>
            <span className="w-[50px] h-[50px] bg-black text-white flex items-center justify-center font-bold text-[26px] rounded-[3px] leading-none">P</span>
          </div>
          {/* Plus sign: red, bold, no space on left or right */}
          <span className="text-[#E30613] font-bold text-[40px] pl-[5px] pr-[0px] h-full flex items-center justify-center leading-none">
            +
          </span>
          {/* Text emplea: lowercase, extremely bold, centered vertically */}
          <span className="text-black font-black text-[38px] font-sans tracking-tight h-full flex items-center leading-none">
            emplea
          </span>
        </div>

        {/* Título Principal */}
        <div className="text-center space-y-1">
          <h2 className="text-[22px] sm:text-[24px] font-bold text-slate-800 tracking-tight leading-snug">
            La nueva experiencia digital de empleabilidad
          </h2>
          <p className="text-[16px] sm:text-[17px] text-slate-500 font-light">
            Cercana, dinámica y <span className="text-red-500 font-normal">flexible</span>
          </p>
        </div>
      </div>

      <p className="text-[15px] text-slate-600 mb-6">
        Ingresa tus datos para <span className="font-bold text-slate-800">iniciar sesión</span>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-xs text-error bg-error/10 rounded-lg border border-error/20 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Código UTP */}
          <div className="form-control w-full">
            <label className="mb-1.5">
              <span className="text-[13px] font-semibold text-slate-700">
                Código UTP
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full h-12 px-4 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-[15px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                placeholder="Ingresa tu usuario"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-blue-500 pointer-events-none">
                <User className="h-5 w-5" />
              </div>
            </div>
            {/* Mensaje de ejemplo */}
            <div className="flex items-start gap-1.5 mt-1.5 text-[12px] text-slate-400 leading-normal">
              <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span>Ejemplo de usuario: U1533148 (no digitar el @utp.edu.pe)</span>
            </div>
          </div>

          {/* Contraseña */}
          <div className="form-control w-full">
            <label className="mb-1.5">
              <span className="text-[13px] font-semibold text-slate-700">
                Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-[15px] text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Restablecer Contraseña Link */}
            <div className="text-right mt-2">
              <Link href="#" className="text-[13.5px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                Restablecer contraseña
              </Link>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#005BFF] hover:bg-[#004BD6] text-white py-3.5 px-4 mt-2 rounded-lg font-bold text-[15.5px] transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-blue-500/10 flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>
    </div>
  );
}

