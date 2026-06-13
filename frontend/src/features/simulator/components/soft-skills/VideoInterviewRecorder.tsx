"use client"

import React, { useState, useRef, useEffect } from 'react';

interface VideoInterviewRecorderProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const VideoInterviewRecorder: React.FC<VideoInterviewRecorderProps> = ({ onStartRecording, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Activar la cámara automáticamente al montar el componente
  useEffect(() => {
    async function enableCamera() {
      if (typeof window === 'undefined') return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Tu navegador o entorno no soporta el acceso a la cámara/micrófono (o requiere HTTPS).");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err: any) {
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setCameraError("No se detectó ninguna cámara o micrófono en tu dispositivo.");
        } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError("Permiso denegado para acceder a la cámara o micrófono.");
        } else {
          setCameraError(`No se pudo acceder al dispositivo de grabación: ${err.message || err.name}`);
        }
      }
    }
    enableCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const handleStart = () => {
    setIsRecording(true);
    onStartRecording();
    timerInterval.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    setIsRecording(false);
    onStopRecording();
    if (timerInterval.current) clearInterval(timerInterval.current);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner group aspect-video">
      {/* Video Stream en Vivo o Error de Cámara */}
      {cameraError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-slate-400">
          <svg className="w-12 h-12 text-rose-500 mb-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-semibold text-slate-200 mb-1">Cámara/Micrófono no disponibles</p>
          <p className="text-xs max-w-xs">{cameraError}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]" // Efecto espejo natural
        />
      )}

      {/* Overlay de Estado de Grabación */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-slate-700/50">
        <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
        <span className="text-white text-xs font-mono">{formatTime(timer)}</span>
      </div>

      {/* Controles Inferiores Flotantes */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex justify-center items-center gap-4 transition-opacity duration-300">
        {!isRecording ? (
          <button
            onClick={handleStart}
            disabled={!!cameraError}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-xl transition-all ${
              cameraError
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-rose-600 hover:bg-rose-500 text-white hover:scale-105'
            }`}
          >
            {!cameraError && <span className="w-3 h-3 bg-white rounded-full animate-ping" />}
            Iniciar Grabación Ilimitada
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 px-6 py-3 rounded-full font-medium shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
            Detener y Analizar con IA
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInterviewRecorder;