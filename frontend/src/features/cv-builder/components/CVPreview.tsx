import { TemplateType } from '../types'

interface Props {
  activeTemplate: TemplateType
}

export default function CVPreview({ activeTemplate }: Props) {
  return (
    <div className="bg-slate-100 dark:bg-base-200 rounded-xl p-3 md:p-6 overflow-y-auto flex justify-center border border-slate-200 dark:border-base-300 h-full w-full">
      <div 
        className={`cv-sheet w-full max-w-[794px] bg-white shadow-2xl origin-top transition-all h-fit ${activeTemplate === 'classic' ? 'font-serif' : 'font-sans'}`} 
        style={{ minHeight: '1123px' }}
      >
        <div className="p-4 sm:p-8 md:p-14">
          <header className={`mb-6 ${activeTemplate === 'classic' ? 'text-center border-b-[1px] border-black pb-6' : 'border-b-2 border-slate-800 pb-4'}`}>
            <h1 className={`font-bold text-slate-900 tracking-tight ${activeTemplate === 'classic' ? 'text-4xl mb-2' : 'text-3xl mb-1'}`}>Anibal Alejandro Jahuar Chirinos</h1>
            <p className={`text-slate-600 font-medium ${activeTemplate === 'classic' ? 'text-base mb-4' : 'text-sm mb-3'}`}>Pre-Analyst / Data Engineering & Business Intelligence</p>
            <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 ${activeTemplate === 'classic' ? 'justify-center' : ''}`}>
              <span>Lima, Perú</span>
              <span>•</span>
              <span>github.com/anibal</span>
              <span>•</span>
              <span>linkedin.com/in/anibal</span>
            </div>
          </header>

          <section className="mb-6">
            <h2 className={`font-bold text-slate-800 uppercase tracking-wider mb-2 ${activeTemplate === 'classic' ? 'text-center text-sm border-b-[1px] border-slate-300 pb-1 mb-3' : 'text-sm'}`}>Perfil Profesional</h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Estudiante de 9no ciclo de Ingeniería de Software en la Universidad Tecnológica del Perú (UTP). Apasionado por la automatización de procesos y el análisis de datos. Experiencia en la creación de pipelines ETL y dashboards interactivos para la toma de decisiones estratégicas.
            </p>
          </section>

          <section className="mb-6">
            <h2 className={`font-bold text-slate-800 uppercase tracking-wider mb-3 ${activeTemplate === 'classic' ? 'text-center text-sm border-b-[1px] border-slate-300 pb-1' : 'text-sm'}`}>Experiencia Laboral</h2>
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-semibold text-slate-900">Claro Perú</h3>
                <span className="text-xs font-medium text-slate-500">Ene 2026 – Presente</span>
              </div>
              <p className={`text-xs font-medium mb-2 ${activeTemplate === 'classic' ? 'text-slate-800 italic' : 'text-blue-700'}`}>Pre-Analyst Intern (Customer Base Development)</p>
              <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                <li>Desarrollo de "RPA Claro Campaign Manager" utilizando Python para la automatización y validación de reportes.</li>
                <li>Optimización de consultas SQL complejas para la extracción y perfilamiento de bases de clientes.</li>
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h2 className={`font-bold text-slate-800 uppercase tracking-wider mb-3 ${activeTemplate === 'classic' ? 'text-center text-sm border-b-[1px] border-slate-300 pb-1' : 'text-sm'}`}>Proyectos Destacados</h2>
            <div className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-semibold text-slate-900">Análisis E-commerce (Proyecto Olist)</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-1">
                Implementación de flujos de trabajo ETL utilizando Python para procesar datasets masivos. Modelado multidimensional y creación de visualizaciones avanzadas utilizando expresiones DAX en Power BI.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h2 className={`font-bold text-slate-800 uppercase tracking-wider mb-3 ${activeTemplate === 'classic' ? 'text-center text-sm border-b-[1px] border-slate-300 pb-1' : 'text-sm'}`}>Educación</h2>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Ingeniería de Software</h3>
                <p className="text-xs text-slate-700">Universidad Tecnológica del Perú (UTP)</p>
                <p className="text-xs text-slate-500 italic">Cursando 9no ciclo</p>
              </div>
            </section>

            <section>
              <h2 className={`font-bold text-slate-800 uppercase tracking-wider mb-3 ${activeTemplate === 'classic' ? 'text-center text-sm border-b-[1px] border-slate-300 pb-1' : 'text-sm'}`}>Habilidades Técnicas</h2>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'SQL', 'Power BI', 'DAX', 'Figma', 'Next.js', 'ETL'].map(skill => (
                  <span key={skill} className={`px-2 py-0.5 text-[10px] font-medium ${activeTemplate === 'classic' ? 'bg-white text-slate-800 border border-slate-400' : 'bg-slate-100 text-slate-700 rounded border border-slate-200'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}