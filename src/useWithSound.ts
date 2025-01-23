import React from "react";

export const useWithSound = (audioSource: string, panValue: number) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const panNodeRef = React.useRef<StereoPannerNode | null>(null);

  React.useEffect(() => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    audioRef.current = new Audio(audioSource);
    panNodeRef.current = audioContext.createStereoPanner();

    if (audioRef.current && panNodeRef.current) {
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(panNodeRef.current);
      panNodeRef.current.connect(audioContext.destination);
      panNodeRef.current.pan.value = panValue;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [audioSource, panValue]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir som:", error);
      });
    }
  };

  return { playSound };
};
