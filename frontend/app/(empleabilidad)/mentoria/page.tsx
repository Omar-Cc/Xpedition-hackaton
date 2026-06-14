import MentoriaClient from "@/src/features/mentoria/components/MentoriaClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorías",
  description: "Conéctate con mentores y compañeros estudiantes de la UTP que ya están realizando prácticas profesionales.",
};

export default function MentoriaPage() {
  return <MentoriaClient />;
}
