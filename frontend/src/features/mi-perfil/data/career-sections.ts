export type CareerCategory = 'technology' | 'health' | 'business' | 'law' | 'general';
export type FormType = 'projects' | 'tags' | 'experience' | 'certificates' | 'text';

export interface Career {
  id: string;
  name: string;
  category: CareerCategory;
}

export interface Faculty {
  facultyName: string;
  careers: Career[];
}

export interface SectionConfig {
  id: string;
  title: string;
  description: string;
  isDefaultEnabled: boolean;
  formType: FormType;
}

// 1. Agrupamos las carreras por Facultad
export const facultiesList: Faculty[] = [
  {
    facultyName: 'Facultad de Ingeniería',
    careers: [
      { id: 'software', name: 'Ingeniería de Software', category: 'technology' },
      { id: 'sistemas', name: 'Ingeniería de Sistemas', category: 'technology' },
      { id: 'civil', name: 'Ingeniería Civil', category: 'general' }
    ]
  },
  {
    facultyName: 'Facultad de Derecho y Ciencias Humanas',
    careers: [
      { id: 'derecho', name: 'Derecho', category: 'law' },
      { id: 'psicologia', name: 'Psicología', category: 'health' }
    ]
  },
  {
    facultyName: 'Facultad de Negocios',
    careers: [
      { id: 'administracion', name: 'Administración de Empresas', category: 'business' },
      { id: 'contabilidad', name: 'Contabilidad', category: 'business' }
    ]
  },
  {
    facultyName: 'Facultad de Arquitectura',
    careers: [
      { id: 'arquitectura', name: 'Arquitectura', category: 'general' }
    ]
  }
];

// 2. Exportamos una lista plana para facilitar la búsqueda en la lógica de React
export const careersList: Career[] = facultiesList.flatMap(faculty => faculty.careers);

// 3. Diccionario de secciones intacto
export const careerSectionMapping: Record<CareerCategory, SectionConfig[]> = {
  technology: [
    { id: 'projects', title: 'Proyectos Destacados', description: 'Repositorios o demos funcionales de tus aplicaciones.', isDefaultEnabled: true, formType: 'projects' },
    { id: 'techStack', title: 'Stack Tecnológico', description: 'Lenguajes, frameworks y bases de datos que dominas.', isDefaultEnabled: true, formType: 'tags' },
    { id: 'certifications', title: 'Certificaciones Técnicas', description: 'Credenciales como AWS, Cisco, Scrum, etc.', isDefaultEnabled: false, formType: 'certificates' },
    { id: 'hackathons', title: 'Hackathons', description: 'Participación en competencias o retos de código bajo presión.', isDefaultEnabled: false, formType: 'experience' },
  ],
  law: [
    { id: 'specialty', title: 'Rama de Especialidad', description: 'Enfoques de tu interés (Penal, Civil, Corporativo, Laboral).', isDefaultEnabled: true, formType: 'text' },
    { id: 'internships', title: 'Secigra / Prácticas Jurídicas', description: 'Experiencia en estudios jurídicos, notarías o fiscalías.', isDefaultEnabled: true, formType: 'experience' },
    { id: 'publications', title: 'Artículos y Publicaciones', description: 'Ensayos o investigaciones en revistas indexadas o portales jurídicos.', isDefaultEnabled: false, formType: 'certificates' },
    { id: 'languages', title: 'Idiomas para Negociación', description: 'Idiomas y niveles certificados enfocados al sector legal.', isDefaultEnabled: true, formType: 'certificates' },
  ],
  health: [
    { id: 'internships', title: 'Internado Clínico', description: 'Horas de práctica y rotaciones en hospitales o centros médicos.', isDefaultEnabled: true, formType: 'experience' },
    { id: 'volunteering', title: 'Voluntariados de Apoyo', description: 'Campañas de salud comunitaria o asistencia social.', isDefaultEnabled: true, formType: 'experience' },
    { id: 'licenses', title: 'Colegiatura Profesional', description: 'Información de tu registro o habilitación para ejercer.', isDefaultEnabled: false, formType: 'certificates' },
  ],
  business: [
    { id: 'kpis', title: 'Logros y KPIs de Impacto', description: 'Resultados medibles (ej. Reducción de costos en 12%, optimizaciones).', isDefaultEnabled: true, formType: 'projects' },
    { id: 'tools', title: 'Herramientas de Negocio y BI', description: 'Sistemas corporativos (Excel avanzado, SAP, Power BI, CRMs).', isDefaultEnabled: true, formType: 'tags' },
    { id: 'languages', title: 'Idiomas', description: 'Lenguas y niveles de fluidez para negocios.', isDefaultEnabled: true, formType: 'certificates' },
  ],
  general: [
    { id: 'experience', title: 'Experiencia Laboral', description: 'Historial de tus puestos de trabajo previos.', isDefaultEnabled: true, formType: 'experience' },
    { id: 'portfolio', title: 'Portafolio Profesional', description: 'Enlace a tus diseños, planos o carpetas de muestras visuales.', isDefaultEnabled: true, formType: 'certificates' },
  ]
};