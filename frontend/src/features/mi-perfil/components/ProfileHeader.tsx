import { Camera, Upload, User } from "lucide-react";

export const ProfileHeader = () => {
  // Variable temporal para tu MVP. 
  // Cámbiala a 'true' y pon una URL de imagen válida para probar cómo se ve con foto.
  const hasPhoto = false; 

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        {/* Contenedor de la Foto de Perfil */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-slate-50 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
            {hasPhoto ? (
              <img 
                src="/api/placeholder/128/128" 
                alt="Foto de perfil" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User size={64} className="text-slate-300" strokeWidth={1.5} />
            )}
          </div>
          
          {/* Botón flotante de la cámara */}
          <button 
            className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full text-white hover:bg-blue-700 transition-transform hover:scale-105 shadow-sm"
            aria-label="Subir foto de perfil"
          >
            <Camera size={18} />
          </button>
        </div>
        
        {/* Información Básica y Acción de Importar */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800">Tu Nombre Profesional</h2>
          <p className="text-slate-500 mb-4">Define tu titular (ej. Fullstack Developer | UX Researcher)</p>
          
          <button className="flex items-center justify-center md:justify-start gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all text-sm font-medium w-full md:w-auto">
            <Upload size={16} />
            Importar datos desde CV (PDF)
          </button>
        </div>

      </div>
    </div>
  );
};