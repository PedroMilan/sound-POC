import { useRef, useEffect } from "react";

export const useWithSound = (audioSource: string, panValue: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const panNodeRef = useRef<StereoPannerNode | null>(null);

  useEffect(() => {
    console.log("Criando contexto de áudio...");
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    audioRef.current = new Audio(audioSource);
    panNodeRef.current = audioContext.createStereoPanner();

    if (audioRef.current && panNodeRef.current) {
      console.log("Conectando nós do áudio...");
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(panNodeRef.current);
      panNodeRef.current.connect(audioContext.destination);
      panNodeRef.current.pan.value = panValue; // Define a posição do som (-1 para esquerda, 1 para direita)
    } else {
      console.error("Erro ao criar os nós de áudio.");
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Limpa a fonte
      }
    };
  }, [audioSource, panValue]);

  const playSound = () => {
    console.log("Tentando reproduzir som:", audioSource);
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia o som
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir som:", error);
      });
    } else {
      console.error("Audio ref não está definido.");
    }
  };

  return { playSound };
};
