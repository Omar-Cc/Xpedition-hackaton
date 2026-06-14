import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "UTP+ Empléa | Plataforma de Empleabilidad",
    template: "UTP+ Empléa | %s",
  },
  description: "Conecta tu récord académico con ofertas laborales reales, genera CVs optimizados con IA, simula entrevistas y acelera tu inserción laboral en la UTP.",
  keywords: [
    "EmpléaUTP",
    "UTP",
    "Universidad Tecnológica del Perú",
    "Empleabilidad",
    "Prácticas Preprofesionales",
    "CV Builder",
    "Simulador de Entrevistas IA",
    "Bolsa de Trabajo UTP",
    "Job Match",
    "Inteligencia Artificial",
  ],
  authors: [{ name: "Innovative Minds" }],
  creator: "Innovative Minds",
  publisher: "Universidad Tecnológica del Perú",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "UTP+ Empléa - Impulsa tu Carrera Profesional con IA",
    description:
      "Conecta tu récord académico con ofertas laborales reales, genera tu CV optimizado, simula entrevistas y acelera tu inserción laboral.",
    url: "https://emplea-utp.edu.pe",
    siteName: "UTP+ Empléa",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTP+ Empléa - Impulsa tu Carrera Profesional con IA",
    description:
      "Genera tu CV con formato Harvard, simula entrevistas y obtén un plan personalizado de 30 días para conseguir prácticas.",
  },
  other: {
    copyright: "© 2026 Innovative Minds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
