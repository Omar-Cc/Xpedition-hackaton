import React from 'react';

interface ModeSelectorProps {
  activeMode: 'technical' | 'soft-skills';
  setActiveMode: (mode: 'technical' | 'soft-skills') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ activeMode, setActiveMode }) => {
  return (
    <div className="flex border-b border-slate-700 mb-6 bg-slate-900 p-1 rounded-lg max-w-md">
      <button
        onClick={() => setActiveMode('technical')}
        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
          activeMode === 'technical'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {/* Icono de Examen/Código */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Evaluación Técnica
        </span>
      </button>
      <button
        onClick={() => setActiveMode('soft-skills')}
        className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
          activeMode === 'soft-skills'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {/* Icono de Cámara/Video */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Habilidades Blandas
        </span>
      </button>
    </div>
  );
};

export default ModeSelector;