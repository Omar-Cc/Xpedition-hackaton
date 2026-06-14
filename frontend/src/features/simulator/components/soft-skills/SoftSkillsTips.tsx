import React from 'react';

const SoftSkillsTips: React.FC = () => {
  const tips = [
    { title: "Contacto Visual", desc: "Mira directamente a la cámara, no a la pantalla, para simular mirar a los ojos del entrevistador." },
    { title: "Método STAR", desc: "Estructura tus respuestas: Situación, Tarea, Acción y Resultado. Sé muy concreto." },
    { title: "Lenguaje Corporal", desc: "Mantén una postura erguida, sonríe de forma natural y evita gesticular en exceso." },
    { title: "Entorno Limpio", desc: "Asegúrate de tener buena iluminación frontal y un fondo sin distracciones visuales." }
  ];

  return (
    <div className="bg-white border border-base-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-emerald-600 font-bold text-base mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Recomendaciones Clave
      </h3>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="border-l-2 border-emerald-500 pl-3 py-0.5">
            <h4 className="text-slate-800 text-sm font-bold mb-1">{tip.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftSkillsTips;