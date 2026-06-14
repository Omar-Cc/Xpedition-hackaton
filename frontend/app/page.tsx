import LandingPage from "@/src/features/landing/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impulsa tu Carrera Profesional con IA",
  description: "Conecta tu récord académico con ofertas laborales reales, genera tu CV optimizado, simula entrevistas y acelera tu inserción laboral en la UTP.",
};

export default function Page() {
  return <LandingPage />;
}
