'use client'

import React, { useState } from 'react';

interface TechnicalAssessmentContainerProps {
  companyName: string;
}

const TechnicalAssessmentContainer: React.FC<TechnicalAssessmentContainerProps> = ({ companyName }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <div className="bg-white border border-base-200 rounded-2xl p-6 shadow-md max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Examen Técnico — {companyName}</span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">Pregunta 1 de 5</h3>
        </div>
        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-bold font-mono text-red-500">
          Tiempo: 14:59
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-slate-800 font-bold text-base leading-relaxed">
          ¿Cuál de las siguientes opciones describe mejor el concepto de &quot;Closure&quot; en JavaScript?
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {[
          "Una función que se ejecuta de forma asíncrona inmediatamente.",
          "La combinación de una función agrupada junto con referencias a su estado circundante (el entorno léxico).",
          "Un método nativo para cerrar conexiones de bases de datos de forma segura.",
          "Una propiedad que impide que una variable sea modificada externamente utilizando TypeScript."
        ].map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border text-sm transition-all cursor-pointer ${
              selectedAnswer === index
                ? 'bg-blue-50/60 border-blue-500 text-blue-900 font-semibold shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-350'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold ${
                selectedAnswer === index 
                  ? 'border-blue-500 bg-blue-600 text-white' 
                  : 'border-slate-300 text-slate-500 bg-white'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer">
          Siguiente Pregunta
        </button>
      </div>
    </div>
  );
};

export default TechnicalAssessmentContainer;