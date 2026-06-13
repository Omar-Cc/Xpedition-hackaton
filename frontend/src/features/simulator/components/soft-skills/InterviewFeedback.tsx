import React from 'react';

interface FeedbackData {
  metrics: {
    tone: number;
    eyeContact: number;
    clarity: number;
    confidence: number;
  };
  constructiveFeedback: string;
}

interface InterviewFeedbackProps {
  feedback: FeedbackData;
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({ feedback }) => {
  const metricLabels = [
    { key: 'tone', label: 'Tono de Voz / Modulación', color: 'bg-indigo-500' },
    { key: 'eyeContact', label: 'Contacto Visual (Cámara)', color: 'bg-emerald-500' },
    { key: 'clarity', label: 'Clasificación de Idea / Claridad', color: 'bg-amber-500' },
    { key: 'confidence', label: 'Nivel de Confianza percibido', color: 'bg-cyan-500' },
  ];

  return (
    <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-2xl animate-fadeIn">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
        Reporte de Análisis IA
      </h3>

      {/* Grid de Métricas Blandas */}
      <div className="space-y-4 mb-6">
        {metricLabels.map((metric) => {
          const value = feedback.metrics[metric.key as keyof typeof feedback.metrics];
          return (
            <div key={metric.key}>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>{metric.label}</span>
                <span className="font-mono font-bold text-white">{value}/100</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Retroalimentación en texto */}
      <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Feedback Detallado</h4>
        <p className="text-sm text-slate-200 leading-relaxed">{feedback.constructiveFeedback}</p>
      </div>
    </div>
  );
};

export default InterviewFeedback;