"use client"

import React, { useState } from 'react';
import SoftSkillsTips from './SoftSkillsTips';
import VideoInterviewRecorder from './VideoInterviewRecorder';
import InterviewFeedback from './InterviewFeedback';

// Este es el "molde" que le dice a TypeScript qué forma tiene tu feedback
interface FeedbackData {
  metrics: {
    tone: number;
    eyeContact: number;
    clarity: number;
    confidence: number;
  };
  constructiveFeedback: string;
}



interface SoftSkillsPracticeContainerProps {
  companyName: string;
  currentQuestion: string;
}

const SoftSkillsPracticeContainer: React.FC<SoftSkillsPracticeContainerProps> = ({ companyName, currentQuestion }) => {
const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartRecording = () => {
    setFeedback(null);
  };

  const handleStopRecording = () => {
    setIsAnalyzing(true);
    // Simulación del procesamiento de la Inteligencia Artificial
    setTimeout(() => {
      setFeedback({
        metrics: { tone: 84, eyeContact: 89, clarity: 76, confidence: 92 },
        constructiveFeedback: `Excelente uso del método STAR para responder a la requisitoria de ${companyName}. Mantuviste un gran nivel de confianza. Como mejora, introduce pausas breves entre ideas complejas para ganar aún más claridad.`
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      {/* Columna Izquierda: Tips */}
      <div className="xl:col-span-1 order-2 xl:order-1">
        <SoftSkillsTips />
      </div>

      {/* Columna Central: Video y Pregunta */}
      <div className="xl:col-span-2 order-1 xl:order-2 space-y-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">Pregunta de {companyName}</span>
          <h2 className="text-lg font-medium text-white">{currentQuestion}</h2>
        </div>

        <VideoInterviewRecorder
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />

        {isAnalyzing && (
          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center gap-3 text-sm text-slate-300">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            La IA está procesando tu video y respuestas...
          </div>
        )}

        {feedback && <InterviewFeedback feedback={feedback} />}
      </div>

      {/* Columna Derecha: Tarjeta informativa adicional o historial simplificado */}
      <div className="xl:col-span-1 order-3 space-y-4">
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-400">
          <h4 className="text-white font-medium mb-2">Acerca de esta sesión</h4>
          <p className="mb-2">Estás postulando a: <strong className="text-slate-200">{companyName}</strong></p>
          <p>Tipo: Entrevista Simulada Conductual ilimitada con feedback en tiempo real.</p>
        </div>
      </div>
    </div>
  );
};

export default SoftSkillsPracticeContainer;