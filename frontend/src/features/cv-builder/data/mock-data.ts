// Eliminamos la constante cvSteps que alimentaba al Stepper
// Puedes agregar aquí otros datos simulados que necesite el CV Builder en el futuro

export const dummyAtsData = {
  score: 82,
  found: ['Python', 'SQL', 'Power BI', 'ETL'],
  missing: ['AWS', 'Airflow', 'Spark'],
  suggestion: 'Menciona explícitamente "AWS" en la descripción de tu proyecto Olist si utilizaste servicios en la nube para alojar tu pipeline.'
};

export const availableTemplates = [
  { id: 'tech', name: 'Tech Modern' },
  { id: 'classic', name: 'Harvard Classic' }
];