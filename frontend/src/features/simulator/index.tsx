import React, { useState } from 'react';
import ModeSelector from './components/ModeSelector';
import SoftSkillsPracticeContainer from './components/soft-skills/SoftSkillsPracticeContainer';
import TechnicalAssessmentContainer from './components/technical/TechnicalAssessmentContainer';

export const SimulatorMain: React.FC = () => {
  // Estado para controlar qué modo visualiza el estudiante
  const [activeMode, setActiveMode] = useState<'technical' | 'soft-skills'>('soft-skills');
  
  // Datos temporales (luego tu compañero de backend los conectará)
  const companyName = "Scotiabank Perú"; 
  const currentQuestion = "¿Cómo manejas prioridades que compiten entre sí?";

  return (
    <div className="w-full text-white">

      {/* Selector de modo (Pestañas arriba) */}
      <ModeSelector activeMode={activeMode} setActiveMode={setActiveMode} />

      {/* Renderizado Condicional: Muestra la pantalla correcta según la pestaña seleccionada */}
      <div className="mt-6">
        {activeMode === 'soft-skills' ? (
          <SoftSkillsPracticeContainer 
            companyName={companyName} 
            currentQuestion={currentQuestion} 
          />
        ) : (
          <TechnicalAssessmentContainer 
            companyName={companyName} 
          />
        )}
      </div>
      
    </div>
  );
};

export default SimulatorMain;