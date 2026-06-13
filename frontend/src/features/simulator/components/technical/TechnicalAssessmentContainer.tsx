"use client"

import React, { useState } from 'react';



interface TechnicalAssessmentContainerProps {
  companyName: string;
}



const TechnicalAssessmentContainer: React.FC<TechnicalAssessmentContainerProps> = ({ companyName }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <div>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Examen Técnico — {companyName}</span>
          <h3 className="text-xl font-bold text-white mt-1">Pregunta 1 de 5</h3>
        </div>
        <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-mono text-red-400">
          Tiempo: 14:59
        </div>
      </div>

      <div className="mb-6">
      <p className="text-slate-200 font-medium text-base">
         ¿Cuál de las siguientes opciones describe mejor el concepto de &quot;Closure&quot; en JavaScript?
      </p>
      </div>

      {/* Opciones de examen */}
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
            className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
              selectedAnswer === index
                ? 'bg-blue-600/20 border-blue-500 text-white'
                : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-900 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold ${
                selectedAnswer === index ? 'border-blue-400 bg-blue-600 text-white' : 'border-slate-500 text-slate-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-md transition-all">
          Siguiente Pregunta
        </button>
      </div>
    </div>
  );
};

export default TechnicalAssessmentContainer;