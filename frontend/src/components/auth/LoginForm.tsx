"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Conectando al backend con:", { email, password });
      
      // TODO: Reemplazar con el fetch real al backend
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
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
    <div className="w-full max-w-md p-8 sm:p-10 bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-base-200/50">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-base-content mb-2">Bienvenido de nuevo</h2>
        <p className="text-base-content/60">Ingresa tus credenciales para continuar a tu cuenta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-error bg-error/10 rounded-xl border border-error/20 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-5">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content">Correo Electrónico</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full pl-12 h-12 bg-base-100 focus:outline-primary focus:border-primary transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label py-1 flex justify-between">
              <span className="label-text font-medium text-base-content">Contraseña</span>
              <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pl-12 h-12 bg-base-100 focus:outline-primary focus:border-primary transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full h-12 rounded-xl text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <span className="flex items-center gap-2">
              Iniciar Sesión
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </button>
        
      </form>

      <div className="mt-8 text-center text-sm text-base-content/70">
        ¿No tienes una cuenta?{" "}
        <Link href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
