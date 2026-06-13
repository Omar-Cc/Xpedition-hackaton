import LoginForm from "../../src/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Iniciar Sesión | Xpedition",
  description: "Ingresa a tu cuenta para continuar",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg-soft)] to-base-200 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo abstractos y modernos */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md mb-8 relative z-10 flex justify-start">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-base-content/60 hover:text-primary transition-colors bg-base-100/50 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border border-base-200/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
      
      <div className="w-full flex justify-center relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
